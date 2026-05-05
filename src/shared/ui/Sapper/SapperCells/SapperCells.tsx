import { cellInterface } from "@shared/types";
import s from "./sappercells.module.scss";
import clsx from "clsx";

interface SapperCellsProps {
    handleClick: (id: number) => Promise<void>;
    cells: cellInterface[];
    explodedMines: number[];
    explodedCoins: number[];
}

export const SapperCells = ({ cells, explodedMines, explodedCoins, handleClick }: SapperCellsProps) => (
    <div className={s.cells}>
        {cells.map((cell) => (
            <div key={cell.id} className={clsx(s.cell, explodedCoins.includes(cell.id) && s.coin, explodedMines.includes(cell.id) && s.mine)} onClick={() => handleClick(cell.id)}> </div>
        ))}
    </div>
);