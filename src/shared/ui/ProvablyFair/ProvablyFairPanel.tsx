import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "@shared/motion";
import type { ProvablyFairData } from "@shared/types";

import { Icon } from "../Icon/Icon";
import { HexDisplay } from "./HexDisplay";
import { ProvablyFairVerify } from "./ProvablyFairVerify";
import s from "./provablyfair.module.scss";

interface ProvablyFairPanelProps {
    data: ProvablyFairData | null;
    defaultExpanded?: boolean;
}

const getCollapsedHint = (data: ProvablyFairData | null): string => {
    if (!data) return "nothing yet";
    if (data.saltStatus === 'hashed') return 'salt locked';
    if (data.saltStatus === 'revealed') return 'ready to verify';
    return "nothing yet";
};

export const ProvablyFairPanel = ({ data, defaultExpanded = false }: ProvablyFairPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const collapsedHint = useMemo(() => getCollapsedHint(data), [data]);

    const hasData = !!data;
    const showEmptyState = !hasData;

    return (
        <div className={s.panel}>
            <button
                type="button"
                className={s.trigger}
                onClick={() => setIsExpanded(prev => !prev)}
                aria-expanded={isExpanded}
            >
                <span className={s.triggerText}>is the game legit?</span>
                <span className={s.triggerHint}>{collapsedHint}</span>
                <Icon
                    name="arrow"
                    size={14}
                    className={`${s.arrow} ${isExpanded ? s.arrow_open : ''}`}
                />
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        className={s.content}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {showEmptyState ? (
                            <p className={s.empty}>play a round to see fairness data</p>
                        ) : (
                            <>
                                <HexDisplay
                                    label="client seed"
                                    value={data.clientSeed}
                                />

                                <HexDisplay
                                    label="salt"
                                    value={data.salt}
                                    saltStatus={data.saltStatus}
                                />

                                {data.gameType === 'sapper' && (
                                    <ProvablyFairVerify data={data} />
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};