import { CaseAsset } from "@shared/types";
import { formatCurrency } from "@shared/lib";
import { RefObject } from "react";
import clsx from "clsx";

import { WIN_INDEX } from "../../model/lottery";
import s from "./roulette.module.scss";
import Big from "big.js";

interface RouletteInterface {
    frameRef: RefObject<HTMLDivElement | null>;
    trackRef: RefObject<HTMLDivElement | null>;
    queue: CaseAsset[];
}

export const Roulette = ({ frameRef, trackRef, queue }: RouletteInterface) => (
    <div className={s.roulette_frame} ref={frameRef}>
        <div className={s.center_line} />
        <div className={s.roulette_track} ref={trackRef}>
            {queue.map((it, i) => (
                <div
                    key={i}
                    data-slot-index={i}
                    data-win={i === WIN_INDEX}
                    className={clsx("slot", s[it.rarity])}
                >
                    <span className={s.name}>{it.name}</span>
                    <div className={s.image}>
                        <img src={it.image} alt={it.name} />
                    </div>
                    <span className={s.price}>{formatCurrency(new Big(it.price))}</span>
                </div>
            ))}
        </div>
    </div >
);