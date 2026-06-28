import clsx from "clsx";
import s from "./sapperbuttons.module.scss";
import { formatCurrency } from "@shared/lib";
import { PhaseStatus } from "@shared/types";

interface ButtonsProps {
    options: number[];
    count: number;
    step: number;
    bet: Big;
    profit: Big;
    isPlay: boolean;
    phase: PhaseStatus;

    actions: {
        setOpt: React.Dispatch<React.SetStateAction<number>>;
        createGame: () => void;
        blindShot: () => void;
    }
};

const labels: Record<ButtonsProps["phase"], string> = { pulling: "Pulling..", creating: "Creating..", taking: "Taking cash..", idle: "Pay nd Play" }

export const SapperButtons = ({ options, count, bet, isPlay, profit, step, phase, actions: { blindShot, setOpt, createGame } }: ButtonsProps) => {
    const render = {
        main: () => {
            if (isPlay && phase === "idle") return `Take ${formatCurrency(step > 0 ? profit : bet)}`;
            return labels[phase];
        }
    }

    return (
        <div className={s.buttons}>
            <div className={s.options}>
                {options.map(opt => (
                    <button key={opt} className={clsx(s.opt, opt === count && s.active)} onClick={() => { if (!isPlay) setOpt(opt) }} >
                        {opt}
                    </button>
                ))}

            </div>

            <button className={s.autoButton} disabled={!isPlay || phase !== "idle"} onClick={blindShot} >
                Random
            </button>

            <button className={s.startButton} disabled={phase !== "idle"} onClick={createGame}>
                {render.main()}
            </button>
        </div>
    )
}