import { CaseDetailInterface, CaseItemInterface } from "@shared/types";
import { formatCurrency } from "@shared/lib";

import s from "./caseDrop.module.scss";
import clsx from "clsx";

export const CaseDrop = ({ c, items }: { c: CaseDetailInterface; items: CaseItemInterface[] }) => {
    return (
        <div className={s.drop}>
            <h2 className={s.title}>
                {c.title} does contain
            </h2>

            <div className={s.items}>
                {
                    items.map((it, i) => (
                        <div className={clsx(s.item, s[it.rarity])} key={i} >
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
                                            {formatCurrency(it.value)}
                                        </p>
                                        <p className={s.chance}>
                                            %{it.weight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};