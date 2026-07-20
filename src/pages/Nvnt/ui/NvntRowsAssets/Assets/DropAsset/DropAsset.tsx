import { useState } from "react";
import { formatCurrency } from "@shared/lib";
import type { NvntInstantSellDropProps } from "../../../NvntAssets/types";
import { clampSellCount, sanitizeSellCountInput } from "../../../../model";

import s from "./dropAsset.module.scss";
import clsx from "clsx";
import Big from "big.js";

export const NvntRowsDropAsset = ({
    asset,
    sellCount,
    onSellCountChange,
    onSell,
    onMax,
    disabled = false,
}: NvntInstantSellDropProps) => {
    const [draft, setDraft] = useState<string | null>(null);

    const priceRaw = asset.price;
    const priceLabel = priceRaw ? formatCurrency(new Big(priceRaw)) : "—";
    const displayCount = draft ?? String(sellCount);

    const resolveCount = (): unsigned =>
        clampSellCount(draft ?? sellCount, asset.count);

    const commitDraft = () => {
        if (draft === null) return;
        const next = clampSellCount(draft || "1", asset.count);
        onSellCountChange(next);
        setDraft(null);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(sanitizeSellCountInput(e.target.value));
    };

    const handleMax = () => {
        setDraft(String(asset.count));
        onMax();
    };

    const handleSell = () => {
        const count = resolveCount();
        onSellCountChange(count);
        setDraft(null);
        onSell(count);
    };

    const renderBadge = () => {
        if (!asset.stackable) {
            return <span className={s.stackBadge}>unique</span>;
        }
        if (asset.count > 1) {
            return <span className={s.stackBadge}>×{asset.count}</span>;
        }
        return null;
    };

    const renderFooter = () => {
        if (asset.trade_locked) {
            return (
                <p className={s.statusMsg}>
                    Locked in trade — sell unavailable
                </p>
            );
        }

        if (!asset.saleable) {
            return (
                <p className={s.statusMsg}>
                    This asset cannot be sold. Trades soon
                </p>
            );
        }

        return (
            <div className={s.actions}>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={s.countInput}
                    value={displayCount}
                    onChange={handleCountChange}
                    onBlur={commitDraft}
                    disabled={disabled}
                    autoComplete="off"
                    aria-label="Sell quantity"
                />
                <div className={s.btnGroup}>
                    <button type="button" className={s.actionBtn} onClick={handleSell} disabled={disabled}>
                        Sell
                    </button>
                    <button type="button" className={s.actionBtn} onClick={handleMax} disabled={disabled}>
                        Max
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={s.drop}>
            <div className={clsx(s.displayContent, s[asset.item.rarity])}>
                <img src={asset.item.image} alt="" loading="lazy" className={s.displayImage} />
                {renderBadge()}
            </div>

            <div className={s.infoCont}>
                <div className={s.objectContent}>
                    <h2 className={s.name}>{asset.item.name}</h2>
                    <h3 className={s.price}>{priceLabel}</h3>
                </div>

                {renderFooter()}
            </div>
        </div>
    );
};
