import { useState } from "react";

import { Icon } from "../Icon/Icon";
import s from "./randomhex.module.scss";

interface RandomHexProps {
    value: string;
    onChange: (value: string) => void;
    reRoll: () => void;
    readOnly: boolean;
}

export const RandomHex = ({ value, onChange, reRoll, readOnly }: RandomHexProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value.replace(/[^0-9a-zA-Z]/g, ""));
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <div className={s.randomHex}>
            <input
                type="text"
                className={s.input}
                value={value}
                maxLength={64}
                onChange={handleChange}
                readOnly={readOnly}
            />

            <div className={s.actions}>
                <button
                    type="button"
                    className={s.button}
                    onClick={reRoll}
                    disabled={readOnly}
                >
                    <Icon name="reroll" size={18} />
                </button>

                <button
                    type="button"
                    className={s.button}
                    onClick={handleCopy}
                >
                    <Icon name={isCopied ? "copied" : "copy"} size={18} />
                </button>
            </div>
        </div>
    );
};