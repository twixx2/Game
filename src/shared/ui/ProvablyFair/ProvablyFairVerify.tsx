import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "@shared/motion";
import { useProvablyFairVerify } from "@shared/hooks";
import { sortPositions } from "@shared/lib";
import type { ProvablyFairData } from "@shared/types";

import { Icon } from "../Icon/Icon";
import s from "./provablyfair.module.scss";

interface ProvablyFairVerifyProps {
    data: ProvablyFairData | null;
}

const VERIFY_LABELS: Record<string, string> = {
    idle: 'run check to compare',
    pending: 'checking...',
    verified: 'verified',
    mismatch: 'mismatch',
    error: 'error',
};

export const ProvablyFairVerify = ({ data }: ProvablyFairVerifyProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { computedPositions, verifyStatus, canVerify, hasRun, runVerify } = useProvablyFairVerify(data);

    useEffect(() => {
        if (isExpanded && canVerify && !hasRun) {
            runVerify();
        }
    }, [isExpanded, canVerify, hasRun, runVerify]);

    const formatPositions = (positions: number[]) =>
        sortPositions(positions).join(', ');

    return (
        <div className={s.verify}>
            <button
                type="button"
                className={`${s.verifyTrigger} ${!canVerify ? s.verifyTrigger_disabled : ''}`}
                onClick={() => canVerify && setIsExpanded(prev => !prev)}
                disabled={!canVerify}
            >
                <span>verify mines</span>
                <Icon
                    name="arrow"
                    size={14}
                    className={`${s.arrow} ${isExpanded ? s.arrow_open : ''}`}
                />
            </button>

            {!canVerify && (
                <p className={s.verifyHint}>available after game ends</p>
            )}

            <AnimatePresence initial={false}>
                {isExpanded && canVerify && (
                    <motion.div
                        className={s.verifyContent}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <div className={s.verifyRow}>
                            <span className={s.verifyRowLabel}>computed</span>
                            <span className={s.verifyRowValue}>
                                {hasRun && computedPositions.length
                                    ? formatPositions(computedPositions)
                                    : '—'}
                            </span>
                        </div>

                        <div className={s.verifyRow}>
                            <span className={s.verifyRowLabel}>server</span>
                            <span className={s.verifyRowValue}>
                                {data?.revealedPositions?.length
                                    ? formatPositions(data.revealedPositions)
                                    : '—'}
                            </span>
                        </div>

                        {hasRun && (
                            <span className={`${s.verifyBadge} ${s[`verifyBadge_${verifyStatus}`]}`}>
                                {VERIFY_LABELS[verifyStatus] ?? verifyStatus}
                            </span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};