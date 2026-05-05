import clsx from "clsx";
import s from "./sapperbuttons.module.scss";
import { formatCurrency } from "@shared/lib";
interface ButtonsProps {
    options: number[];
    count: number;
    step: number;
    bet: number;
    win: number;
    isPlay: boolean;

    actions: {
        setOpt: React.Dispatch<React.SetStateAction<number>>;
        startGame: () => Promise<void>;
        autoClick: () => void;
    }
};


export const SapperButtons = ({ options, count, bet, isPlay, win, step, actions: { autoClick, setOpt, startGame } }: ButtonsProps) => (
    <div className={s.buttons}>
        <div className={s.options}>
            {options.map(opt => (
                <button key={opt} className={clsx(s.opt, opt === count && s.active)} onClick={() => { if (!isPlay) setOpt(opt) }} >
                    {opt}
                </button>
            ))}

        </div>

        <button className={s.autoButton} disabled={!isPlay} onClick={autoClick} >
            Random
        </button>

        <button className={s.startButton} onClick={startGame}>
            {isPlay
                ? `Take ${formatCurrency(step > 0 ? win : bet)}`
                : "Pay nd Play"}
        </button>
    </div>
);