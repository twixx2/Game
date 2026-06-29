import { formatCurrency } from "@shared/lib";
import { TOWER_STEPS } from "@shared/constants";

import s from "./cells.module.scss";
import clsx from "clsx";
import Big from "big.js";


interface CellsProps {
    picks: number[];
    step: number;
    loseStep: number | null;
    loseChoice: number | null;

    isPlay: boolean;
    coeffs: number[];
    bet: Big;
    openCell: (idx: number, choice: number) => void;
}

export const TowerCells = ({ picks, step, loseStep, loseChoice, isPlay, coeffs, bet, openCell }: CellsProps) => (
    <div className={s.cells}>
        {Array.from({ length: TOWER_STEPS }).map((_, idx) => {
            const isPassed = loseStep !== null ? idx < loseStep : idx < step;
            const isLostHere = idx === loseStep;
            const isActive = idx === step && isPlay && loseStep === null;

            return (
                <div key={idx} className={s.row}>
                    {[0, 1].map(side => {
                        const isSafeHere = isPassed && side === picks[idx];
                        const isMineHere = isLostHere && side === loseChoice;
                        return (
                            <button
                                key={side}
                                className={clsx(s.cell, isPassed && s.passed, isSafeHere && s.safe, isMineHere && s.error, !isActive && s.disabled)}
                                disabled={!isActive}
                                onClick={() => openCell(idx + 1, side)}
                            >
                                {coeffs[idx] !== undefined ? formatCurrency(new Big(bet.times(coeffs[idx]))) : "error"}
                            </button>
                        );
                    })}
                </div>
            );
        })}
    </div>
);