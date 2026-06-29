import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import Big from "big.js";

import { SAPPER_COEEFS, MAX_BET, MIN_BET } from '@shared/constants';
import { toast } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { PhaseStatus } from "@shared/types";
import { generateRawSeed } from "@shared/lib";

import { SapperDetailResponse, SapperGameState, fetcherCreateSapper, fetcherCurrentSapper, fetcherMoveSapper, fetcherTakeSapper } from "../api";

const mineOptions: number[] = [3, 5, 7, 13, 19, 24]

export const useHelperSapper = () => {
    const [game, setGame] = useState<SapperGameState | null>(null);

    const [bet, setBet] = useState<Big>(new Big("0"));
    const [seed, setSeed] = useState<string>(generateRawSeed);
    const [minesCount, setMinesCount] = useState<number>(3);

    const [phase, setPhase] = useState<PhaseStatus>("idle");

    const isRevealing = game?.mines !== undefined;
    const isPlay: boolean = !!game && !isRevealing;
    const navigate = useNavigate();
    const { syncWallet } = usePlayer();

    const coeffs = useMemo(() => {
        return SAPPER_COEEFS[minesCount] || [];
    }, [minesCount]);

    const applyGame = (data: SapperDetailResponse): void => {
        setGame({
            bet: new Big(data.bet),
            hash: data.hash,
            clientSeed: data.client_seed,
            exploredMines: [],
            exploredCoins: data.explored_coins,
            profit: new Big(data.profit),
            salt: data.salt,
            step: data.step,
            minesCount: data.mines_count
        });
        setBet(new Big(data.bet));
        setSeed(data.client_seed);
    };

    useEffect(() => {
        setPhase("pulling");
        fetcherCurrentSapper()
            .then(r => {
                if (!r || r.status === 204) return;
                return toast("You already have an active game", { text: "load game?", onClick: () => applyGame(r.data) })
            })
            .catch(err => {
                if (!isAxiosError(err)) return toast("Failed to sync session");
            })
            .finally(() => setPhase("idle"));
    }, []);

    const rollNewSeed = () => { const newSeed = generateRawSeed(); setSeed(newSeed); };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const canStartGame = (): boolean => {
        if (!bet) return toast("Please enter a stake"), false;
        if (bet.lt(MIN_BET)) return toast(`Bet cannot be less than ${MIN_BET}`), false;
        if (bet.gt(MAX_BET)) return toast(`Bet cannot be greater than ${MAX_BET}`), false;
        if (!seed) return toast("Seed is required to ensure fairness", { text: "roll", onClick: rollNewSeed }), false;
        return true
    };

    const typeBet = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.replace(/\D/g, "");
        const bigBet = new Big(value)
        setBet(bigBet);
    };

    const createGame = (): void => {
        if (!game || isRevealing) {
            if (!canStartGame()) return;
            setPhase("creating");
            fetcherCreateSapper({ bet: bet.toString(), mines_count: minesCount, client_seed: seed })
                .then(r => {
                    applyGame(r);
                    setBet(new Big(r.bet));
                    setMinesCount(r.mines_count);
                    syncWallet("balance", r.updated_balance);
                })
                .catch(err => {
                    if (!isAxiosError(err)) return toast("Critical unexpected error");
                    const statusCode = err.response?.status;
                    const code = err.response?.data?.code
                    switch (true) {
                        case statusCode === 409 && code === "active_game_exists":
                            return toast("You already have an active game", { text: "load game?", onClick: () => { applyGame(err.response?.data?.game) } })
                        case statusCode === 402 && code === "not_enough_funds":
                            return toast("Insufficient balance", { text: "see our bonuses", onClick: () => { navigate("/#bonuses") } })
                        default:
                            return toast("Critical server error occurred");
                    };
                })
                .finally(() => setPhase("idle"));
        } else {
            setPhase("taking");
            fetcherTakeSapper(game.hash)
                .then(r => {
                    syncWallet("balance", r.updated_balance);
                    setGame(null);
                    rollNewSeed();
                })
                .catch(err => {
                    if (!isAxiosError(err)) return toast("Critical unexpected error");
                    const statusCode = err.response?.status;
                    const code = err.response?.data?.code
                    switch (true) {
                        case statusCode === 409 && code === "no_steps_made":
                            return toast("No steps made");
                        case statusCode === 403 && code === "game_already_finished":
                            return toast("This game already has been finished");
                        default:
                            return toast("Critical server error occurred, try reloading this page");
                    };
                })
                .finally(() => setPhase("idle"));
        }
    };

    const openCell = async (cellId: number): Promise<void> => {
        if (!game || isRevealing) return;
        if (game.exploredCoins.includes(cellId)) return;
        fetcherMoveSapper({ cellId }, game.hash)
            .then(r => {
                if (r.finished && r.is_win) {
                    // r === SapperTakeResponse (ended win game)

                    syncWallet("balance", r.updated_balance);
                    setGame(null);
                    rollNewSeed();
                } else if (r.finished && !r.is_win) {
                    // r === SapperLoseResponse (ended lose game)

                    setGame(prev => {
                        if (!prev) return prev;
                        return { ...prev, exploredMines: r.mines, salt: r.salt, mines: r.mines };
                    });
                    rollNewSeed();
                    const finishedHash = game.hash;
                    setTimeout(() => {
                        setGame(prev => (prev?.hash === finishedHash ? null : prev));
                    }, 500);
                } else {
                    // r === SapperMoveInterface (not ended game)

                    setGame(prev => {
                        if (!prev) return prev;
                        return { ...prev, exploredCoins: r.explored_coins, step: r.step, profit: new Big(r.profit) };
                    })
                }
            })
            .catch(err => {
                if (!isAxiosError(err)) return toast("Critical unexpected error");
                const statusCode = err.response?.status;
                const code = err.response?.data?.code
                switch (true) {
                    case statusCode === 403 && code === "game_already_finished":
                        return toast("This game already has been finished");

                    case statusCode === 423:
                        return toast("This game is currently being updated");

                    default:
                        return toast("Critical server error occurred");
                };
            });
    };

    const blindShot = (): void => {
        if (!game) return;

        const allCellIds = Array.from({ length: 25 }, (_, i) => i + 1);

        const availableCells = allCellIds.filter(id => !game.exploredCoins.includes(id) && !game.exploredMines.includes(id));
        if (availableCells.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const targetCellId = availableCells[randomIndex];
        if (!targetCellId) return;

        openCell(targetCellId);
    };

    return { bet, phase, game, isPlay, mineOptions, minesCount, coeffs, seed, createGame, openCell, blindShot, setMinesCount, typeBet, rollNewSeed, setSeed }
};

export type UseHelperSapperReturn = ReturnType<typeof useHelperSapper>;