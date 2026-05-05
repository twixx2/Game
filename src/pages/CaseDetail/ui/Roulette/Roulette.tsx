import { CaseItemInterface } from "@shared/types";
import { RefObject } from "react"
import s from "./roulette.module.scss";
import clsx from "clsx";
interface RouletteInterface {
    frameRef: RefObject<HTMLDivElement | null>;
    trackRef: RefObject<HTMLDivElement | null>;
    queue: CaseItemInterface[];
}

export const Roulette = ({ frameRef, trackRef, queue }: RouletteInterface) => (
    <div className={s.roulette_frame} ref={frameRef}>
        <div className={s.roulette_track} ref={trackRef}>
            {queue.map((it, i) => {
                return (
                    <div key={i}
                        className={clsx("slot", s[it.rarity])}
                    >
                        <div className={s.image}>
                            <img src={it.image} alt={it.name} />
                        </div>
                        <div className={s.info}>
                            <span>{it.name}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);