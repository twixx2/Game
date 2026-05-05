import { InvItemInterface } from "@shared/types";
import { formatCurrency } from "@shared/lib";
import { Icon } from "@shared/ui";
import { useInv } from "@context";

import s from "./nvntItem.module.scss";
import clsx from "clsx";

export const NvntItem = ({ isSelected, item }: { isSelected: boolean; item: InvItemInterface }) => {

    const { handleSelectItem, minSelectItem, incSelectedItem, decSelectedItem, maxSelectItem, selected } = useInv();


    return (
        <div className={clsx(s.item, isSelected && s.selected)}>
            <div className={clsx(s.bg, s[item.rarity])}></div>

            <div className={s.content}>
                <span className={s.count}>
                    {item.count}
                </span>

                <div className={s.header} onClick={() => handleSelectItem(item.id)}>
                    <div className={s.image}>
                        <img src={item.image} alt={item.name} />
                    </div>

                    <span>
                        {formatCurrency(item.value)}
                    </span>

                </div>

                <div className={s.main} onClick={() => handleSelectItem(item.id)}>
                    <span>{item.name}</span>
                </div>

                <div className={s.range}>

                    <div className={s.options}>

                        <button className={s.optButton} onClick={() => minSelectItem(item.id)}>
                            <Icon name="minSelect" />
                        </button>

                        <button className={s.optButton} onClick={() => decSelectedItem(item.id)}>
                            <Icon name="decSelect" />
                        </button>

                    </div>

                    <span>
                        {selected[item.id] ?? 0}
                    </span>

                    <div className={s.options}>
                        <button className={s.optButton} onClick={() => incSelectedItem(item.id)}>
                            <Icon name="incSelect" />
                        </button>

                        <button className={s.optButton} onClick={() => maxSelectItem(item.id)}>
                            <Icon name="maxSelect" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}