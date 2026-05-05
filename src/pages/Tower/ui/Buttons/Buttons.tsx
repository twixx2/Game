import { formatCurrency } from "@shared/lib";
import s from "./buttons.module.scss";

interface ButtonProps {
    isPlay: boolean;
    step: number;
    win: number;
    bet: number;

    startGame: () => Promise<void>;
    autoPick: () => void;
};

export const TowerButtons = ({ isPlay, bet, step, win, autoPick, startGame }: ButtonProps) => (
    <div className={s.buttons}>
        <button className={s.autoButton} disabled={!isPlay} onClick={autoPick} >
            Random
        </button>

        <button className={s.startButton} onClick={startGame}>
            {isPlay ? `Take ${formatCurrency(step > 0 ? win : bet)}` : "Pay nd Play"}
        </button>
    </div>
); 