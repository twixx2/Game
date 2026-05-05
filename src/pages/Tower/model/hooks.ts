import { useEffect, useState } from 'react';

import { MAX_BET, coeffsTower, totalTowerSteps } from '@shared/constants';
import { useAuth } from '@context';

import toast from 'react-hot-toast';

export const useHelperTower = () => {
    const [bet, setBet] = useState<number>(0);
    const [win, setWin] = useState<number>(0);
    const [step, setStep] = useState<number>(-1);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [tower, setTower] = useState<string[]>([]);
    const [correctPicks, setCorrectPicks] = useState<number[]>([]);
    const [loseStep, setLoseStep] = useState<number | null>(null);
    const [betError, setBetError] = useState<string>("");
    const { balance, editBalance, isAuth } = useAuth();
    const STORAGE_KEY: string = "tower-game-state";

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const s = JSON.parse(saved);
                setIsPlay(s.isPlay);
                setBet(s.bet);
                setTower(s.tower);
                setCorrectPicks(s.correctPicks);
                setStep(s.step);
                setWin(s.win);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const typeBet = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.replace(/\D/g, "");
        const numericBet = Number(value);
        if (isNaN(numericBet)) return;
        if (numericBet > MAX_BET) return setBet(MAX_BET);
        setBet(numericBet);
    };

    const clearAll = (): void => {
        setWin(0);
        setStep(-1);
        setCorrectPicks([]);
        setLoseStep(null);
    };

    const finishGame = async (payout: number): Promise<void> => {
        const newBalance = Math.round((balance + payout) * 100) / 100;
        await editBalance(newBalance);
        setIsPlay(false);
        localStorage.removeItem(STORAGE_KEY);
        clearAll();
    };

    const startGame = async (): Promise<void> => {
        if (!isPlay) {
            if (!bet) return setBetError("Please enter a stake");
            const numericBet = Number(bet);
            if (isNaN(numericBet)) return setBetError("Incorrect bet");
            if (numericBet < 1) return setBetError(`Minimum value is 1`);
            if (numericBet > MAX_BET) return setBetError("Maximum value is 5M");
            if (numericBet > balance) return void toast.error("Out of balance");
            await editBalance(Math.round((balance - numericBet) * 100) / 100);
            const newTower = Array.from({ length: totalTowerSteps }, () =>
                Math.random() < 0.5 ? "left" : "right"
            );
            setTower(newTower);
            setWin(0);
            setStep(0);
            setIsPlay(true);
            setBetError("");
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                isPlay: true,
                bet,
                tower: newTower,
                correctPicks,
                step: 0,
                win: 0
            }));
        } else {
            if (step === -1) return void toast.error("Wait");
            if (step === 0) return void toast.error("Make sure you did at least one move"); 
            // Предварительно забрать выигрыш 
            await editBalance(Math.round((balance + win) * 100) / 100);
            setIsPlay(false);
            clearAll();
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handlePick = async (idx: number, choise: string): Promise<void> => {
        if (!isPlay || idx !== step) return;
        const safeSide = tower[idx];
        await delay(65);

        if (choise === safeSide) {
            setCorrectPicks(prev => {
                const next = [...prev, idx];
                const nextStep = step + 1;
                const currentCoeff = coeffsTower[nextStep - 1];

                if (currentCoeff === undefined) {
                    console.error("coeff for the actual step has not been found", nextStep)
                    return prev;
                }

                const newWin = Number(bet) * currentCoeff;
                setStep(nextStep);
                setWin(newWin);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    isPlay: true,
                    bet,
                    tower,
                    correctPicks: next,
                    step: nextStep,
                    win: newWin
                })); // Обновление состояния

                if (nextStep === totalTowerSteps) {
                    finishGame(newWin); // Полный проход игры
                }
                return next;
            });

        } else {
            // Если выбрана неправильная сторона
            setLoseStep(idx);
            setWin(0);
            setStep(-1);
            setTimeout(() => {
                setCorrectPicks([]);
                setLoseStep(null);
                setIsPlay(false);
            }, 850);
            localStorage.removeItem(STORAGE_KEY);
        }

    };

    const autoPick = (): void => {
        const r = Math.random();
        const side = r > 0.5 ? "left" : "right";
        handlePick(step, side);
    };

    return { bet, win, step, isPlay, tower, correctPicks, loseStep, betError, balance, isAuth, startGame, handlePick, autoPick, typeBet, coeffsTower, totalTowerSteps };

};