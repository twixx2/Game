import Big from "big.js";

import { CaseAsset, CaseDetailInterface } from "@shared/types";
import { formatCurrency } from "@shared/lib";
import s from "./caseOptions.module.scss";

interface CaseOptionsInterface {
    rolling: boolean;
    isOpen: boolean,
    c: CaseDetailInterface;
    received: CaseAsset | null;
    actions: {
        openCase: () => void;
        openAgain: () => void;
        sellReceived: () => void;
        receive: () => void;
    }
}

export const CaseOptions = ({ rolling, isOpen, received, c, actions: { openCase, openAgain, sellReceived, receive } }: CaseOptionsInterface) => {
    const renderContent = () => {
        if (rolling) {
            return (
                <p className={s.loading}>
                    Rollin'...
                </p>
            );
        }

        if (isOpen) {
            return (
                <div className={s.result}>
                    <button className={s.sell} onClick={sellReceived}>
                        Instant sell {formatCurrency(new Big(received!.price))}
                    </button>

                    <button className={s.open} onClick={openAgain} disabled={rolling || !received}>
                        Re-roll
                    </button>

                    <button className={s.take} onClick={receive} disabled={rolling || !received}>
                        Stash
                    </button>
                </div>
            );
        }

        return (
            <button
                className={s.open}
                onClick={openCase}
                disabled={rolling}
            >
                Pay nd Roll {formatCurrency(new Big(c.price))}
            </button>
        );
    }

    return (
        <div className={s.options}>
            {renderContent()}
        </div >
    );

};