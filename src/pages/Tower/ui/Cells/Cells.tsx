import { formatCurrency } from "@shared/lib";
import s from "./cells.module.scss";
import clsx from "clsx";


interface CellsProps {
    totalSteps: number;
    tower: string[];
    correctPicks: number[];
    loseStep: number | null;
    step: number;
    isPlay: boolean;
    coeffs: number[];
    bet: number;
    handlePick: (idx: number, choice: string) => Promise<void>;
}

export const TowerCells = ({ totalSteps, tower, correctPicks, loseStep, step, isPlay, coeffs, bet, handlePick }: CellsProps) => (
    <div className={s.cells}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
            const safeSide = tower[idx];
            const isPassed = correctPicks.includes(idx);
            const isLostHere = idx === loseStep;
            const isActive = idx === step && isPlay;

            return (
                <div key={idx} className={s.row}>
                    {["left", "right"].map(side => {
                        const isSafeHere = isPassed && side === safeSide;
                        return (
                            <button
                                key={side}
                                className={clsx(s.cell, isPassed && s.passed, isSafeHere && s.safe, isLostHere && side !== safeSide && s.error, !isActive && s.disabled)}
                                disabled={!isActive}
                                onClick={() => handlePick(idx, side)}
                            >
                                {coeffs[idx] !== undefined ? formatCurrency(bet * coeffs[idx]) : "error"}
                            </button>
                        );
                    })}
                </div>
            );
        })}
    </div>
);