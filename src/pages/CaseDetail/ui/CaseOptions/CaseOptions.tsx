import { CaseDetailInterface, CaseItemInterface } from "@shared/types";
import { formatCurrency } from "@shared/lib";
import s from "./caseOptions.module.scss";

interface CaseOptionsInterface {
    rolling: boolean;
    isOpen: boolean,
    c: CaseDetailInterface;
    win: number | null;
    received: CaseItemInterface | null;
    actions: {
        openCase: () => Promise<void>;
        openAgain: () => Promise<void>;
        sellReceived: () => void;
        receive: () => void;
    }
}

export const CaseOptions = ({ rolling, isOpen, received, c, win, actions: { openCase, openAgain, sellReceived, receive } }: CaseOptionsInterface) => {
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
                        Instant sell {formatCurrency(win!)}
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
                Pay nd Roll {formatCurrency(c.price)}
            </button>
        );
    }

    return (
        <div className={s.options}>
            {renderContent()}
        </div >
    );

};