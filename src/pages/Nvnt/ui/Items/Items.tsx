import { useHelperInv } from "../../model/hooks";

import { NvntItem } from "../Item/Item";
import s from "./nvntItems.module.scss";

export const NvntItems = () => {
    const { selected, filteredItems } = useHelperInv();
    if (filteredItems.length === 0) {
        return <p className={s.title}>Nothin' here yet!</p>
    }

    return (
        <div className={s.items}>
            {
                filteredItems.map((item, index) => {
                    const isSelected = !!selected[item.id];
                    return <NvntItem key={index} item={item} isSelected={isSelected} />
                })
            }
        </div>
    )
};