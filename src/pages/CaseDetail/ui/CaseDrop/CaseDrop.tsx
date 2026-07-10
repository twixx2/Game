import Big from "big.js";

import { CaseDetailInterface } from "@shared/types";
import { formatCurrency } from "@shared/lib";
import clsx from "clsx";

import { formatChance, getAssetChance } from "../../model/lottery";
import s from "./caseDrop.module.scss";

export const CaseDrop = ({ c }: { c: CaseDetailInterface }) => {
    const items = [...c.assets].sort((a, b) => getAssetChance(c, a) - getAssetChance(c, b));

    return (
        <div className={s.drop}>
            <h2 className={s.title}>
                {c.name} contains &darr;
            </h2>

            <div className={s.items}>
                {items.map((it, i) => (
                    <div className={clsx(s.item, s[it.rarity])} key={i}>
                        <div className={s.content}>
                            <div className={s.info}>
                                <div className={s.image}>
                                    <img src={it.image} alt={it.name} />
                                </div>
                                <h3 className={s.name}>
                                    {it.name}
                                </h3>
                            </div>

                            <div className={s.overlay}>
                                <p className={s.rarity}>
                                    {it.rarity.toLowerCase()}
                                </p>
                                <div className={s.overlayExtra}>
                                    <p className={s.price}>
                                        {formatCurrency(new Big(it.price))}
                                    </p>
                                    <p className={s.chance}>
                                        {formatChance(getAssetChance(c, it))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};