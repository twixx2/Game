import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import Big from "big.js";

import { MAX_BET, MIN_BET } from '@shared/constants';
import { toast } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { PhaseStatus } from "@shared/types";
import { generateRawSeed } from "@shared/lib";

import { TowerDetailResponse, TowerGameState, fetcherCreateTower, fetcherCurrentTower, fetcherMoveTower, fetcherTakeTower } from "../api";

export const useHelperTower = () => {
    const [game, setGame] = useState<TowerGameState | null>(null);
    const [loseStep, setLoseStep] = useState<number | null>(null);
    const [loseChoice, setLoseChoice] = useState<number | null>(null);

    const [bet, setBet] = useState<Big>(new Big("0"));
    const [seed, setSeed] = useState<string>(generateRawSeed);

    const [phase, setPhase] = useState<PhaseStatus>("idle");

    const isRevealing = loseStep !== null;
    const isPlay: boolean = !!game && !isRevealing;
    const navigate = useNavigate();
    const { syncWallet } = usePlayer();

    const applyGame = (data: TowerDetailResponse): void => {
        setLoseStep(null);
        setLoseChoice(null);
        setGame({
            bet: new Big(data.bet),
            hash: data.hash,
            clientSeed: data.client_seed,
            picks: data.picks,
            profit: new Big(data.profit),
            salt: data.salt,
            step: data.step
        });
        setBet(new Big(data.bet));
        setSeed(data.client_seed);
    };

    useEffect(() => {
        setPhase("pulling");
        fetcherCurrentTower()
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
            fetcherCreateTower({ bet: bet.toString(), client_seed: seed })
                .then(r => {
                    setLoseStep(null);
                    setLoseChoice(null);
                    applyGame(r);
                    setBet(new Big(r.bet));
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
            fetcherTakeTower(game.hash)
                .then(r => {
                    syncWallet("balance", r.updated_balance);
                    setLoseStep(null);
                    setLoseChoice(null);
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

    const openCell = (idx: number, choice: number): void => {
        if (!game || isRevealing) return;
        if (game.step + 1 !== idx) return;
        fetcherMoveTower({ idx, choice }, game.hash)
            .then(r => {
                if (r.finished && r.is_win) {
                    // r === TowerTakeResponse (ended win game)

                    syncWallet("balance", r.updated_balance);
                    setLoseStep(null);
                    setLoseChoice(null);
                    setGame(null);
                    rollNewSeed();
                } else if (r.finished && !r.is_win) {
                    // r === TowerLoseResponse (ended lose game)

                    setLoseStep(game.step);
                    setLoseChoice(choice);
                    setGame(prev => {
                        if (!prev) return prev;
                        return { ...prev, picks: r.picks, salt: r.salt, tower: r.tower };
                    });
                    rollNewSeed();
                    const finishedHash = game.hash;
                    setTimeout(() => {
                        setGame(prev => (prev?.hash === finishedHash ? null : prev));
                        setLoseStep(prev => (prev !== null ? null : prev));
                        setLoseChoice(prev => (prev !== null ? null : prev));
                    }, 500);
                } else {
                    // r === TowerMoveInterface (not ended game)

                    setGame(prev => {
                        if (!prev) return prev;
                        return { ...prev, picks: r.picks, step: r.step, profit: new Big(r.profit) };
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
                    case statusCode === 422:
                        return toast("Make sure you press the right floor");
                    default:
                        return toast("Critical server error occurred");
                };
            });
    };

    const blindShot = (): void => {
        if (!game) return;
        const idx = game.step + 1;
        const target = Math.random() > 0.5 ? 0 : 1;
        openCell(idx, target);
    };

    return { bet, phase, game, isPlay, seed, loseStep, loseChoice, createGame, openCell, blindShot, typeBet, rollNewSeed, setSeed }
};

export type UseHelperTowerReturn = ReturnType<typeof useHelperTower>;