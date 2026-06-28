import s from "./sappercells.module.scss";
import clsx from "clsx";

interface SapperCellsProps {
    openCell: (id: number) => Promise<void>;
    exploredMines: number[];
    exploredCoins: number[];
}

export const SapperCells = ({ exploredMines, exploredCoins, openCell }: SapperCellsProps) => (
    <div className={s.cells}>
        {Array.from({ length: 25 }).map((_, i) => (
            <div key={i+1}  className={clsx(s.cell, exploredCoins.includes(i+1) && s.coin, exploredMines.includes(i+1) && s.mine)} onClick={() => openCell(i+1)}> </div>
        ))}
    </div>
);