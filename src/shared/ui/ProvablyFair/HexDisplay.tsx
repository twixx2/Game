import { useState } from "react";

import type { SaltStatus } from "@shared/types";

import { Icon } from "../Icon/Icon";
import s from "./provablyfair.module.scss";

interface HexDisplayProps {
    label: string;
    value: string;
    saltStatus?: SaltStatus;
    placeholder?: string;
}

const SALT_STATUS_LABEL: Record<Exclude<SaltStatus, 'unavailable'>, string> = {
    hashed: 'hashed',
    revealed: 'revealed',
};

export const HexDisplay = ({ label, value, saltStatus, placeholder = '—' }: HexDisplayProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const displayValue = value || placeholder;
    const canCopy = !!value;

    const handleCopy = async () => {
        if (!canCopy) return;
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch { /* clipboard unavailable */ }
    };

    const showBadge = saltStatus && saltStatus !== 'unavailable';

    return (
        <div className={s.field}>
            <div className={s.fieldHeader}>
                <span className={s.fieldLabel}>{label}</span>
                {showBadge && (
                    <span className={`${s.badge} ${s[`badge_${saltStatus}`]}`}>
                        {SALT_STATUS_LABEL[saltStatus]}
                    </span>
                )}
            </div>

            <div className={s.hexRow}>
                <span className={`${s.hexValue} ${!value ? s.hexValue_empty : ''}`}>
                    {displayValue}
                </span>

                <button
                    type="button"
                    className={s.copyButton}
                    onClick={handleCopy}
                    disabled={!canCopy}
                    aria-label={`copy ${label}`}
                >
                    <Icon name={isCopied ? "copied" : "copy"} size={18} />
                </button>
            </div>
        </div>
    );
};