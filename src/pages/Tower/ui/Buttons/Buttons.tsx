import { formatCurrency } from "@shared/lib";
import { PhaseStatus } from "@shared/types";
import s from "./buttons.module.scss";
import Big from "big.js";

interface ButtonProps {
    isPlay: boolean;
    step: number;
    bet: Big;
    profit: Big;
    phase: PhaseStatus;

    actions: {
        createGame: () => void;
        blindShot: () => void;
    };
};

const labels: Record<ButtonProps["phase"], string> = { pulling: "Pulling..", creating: "Creating..", taking: "Taking cash..", idle: "Pay nd Play" }

export const TowerButtons = ({ isPlay, bet, step, profit, phase, actions: { blindShot, createGame } }: ButtonProps) => {
    const render = {
        main: () => {
            if (isPlay && phase === "idle") return `Take ${formatCurrency(step > 0 ? profit : bet)}`;
            return labels[phase];
        }
    }

    return (
        <div className={s.buttons}>
            <button className={s.autoButton} disabled={!isPlay || phase !== "idle"} onClick={blindShot} >
                Random
            </button>

            <button className={s.startButton} disabled={phase !== "idle"} onClick={createGame}>
                {render.main()}
            </button>
        </div>
    );
};