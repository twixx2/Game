import { formatCurrency } from "@shared/lib";
import { Icon } from "@shared/ui";

import { useHelperInv } from "../../model/hooks";

import s from "./nvntSelected.module.scss";
import clsx from "clsx";

export const NvntSelected = () => {
    const { totalPrice, selectedArr, openSelected, clearAllItems, selectAllItems, sellItems, setOpenSelected } = useHelperInv();

    return (
        <div className={s.selected}>
            <div className={s.top}>
                <h3 className={s.selectedTitle}>
                    Selected stuff
                </h3>
                <button className={clsx(s.arrow, openSelected && s.lower)} onClick={() => setOpenSelected(prev => !prev)}>
                    <Icon name="arrow" size={32} />
                </button>

            </div>

            <div className={clsx(s.body, openSelected && s.open)}>

                <div className={s.options}>
                    <div className={s.buttons}>
                        <button onClick={selectAllItems}>
                            Grab 'em all
                        </button>

                        {!!selectedArr.length && <button onClick={clearAllItems}>Drop all</button>}
                    </div>

                    {!!selectedArr.length &&
                        <div className={s.sellOpts}>
                            <h4>Total: {formatCurrency(totalPrice)}</h4>
                            <button className={s.sellBtn} onClick={sellItems}>Cash out</button>
                        </div>}


                    {
                        selectedArr.length > 0 ?
                            (
                                <div className={s.items}>
                                    {
                                        selectedArr.map(item => (
                                            <div className={s.item}>
                                                <div className={s.image}>
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <h5 className={s.name}>
                                                    {item.name}
                                                </h5>

                                                <span className={s.price}>
                                                    {formatCurrency(item.value * item.count)}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            (
                                <h3 className={s.extraTitle}>
                                    Nothin' selected yet!
                                </h3>
                            )
                    }

                </div>
            </div>
        </div>
    );
};