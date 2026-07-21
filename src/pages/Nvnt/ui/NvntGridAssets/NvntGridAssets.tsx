import { useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { NvntAssetsViewProps } from "../NvntAssets/types";
import { renderNvntAssetCard } from "../NvntAssets/renderNvntAssetCard";

import s from "./nvntGridAssets.module.scss";

const COLS = 2;
/** Prefer overestimate (square + info + actions + gap) */
const ESTIMATE_ROW_SIZE = 360;
const OVERSCAN = 3;
const PADDING_END = 24;

export const NvntGridAssets = ({
    assets,
    tab,
    listKey,
    getSellCount,
    setSellCount,
    setSellCountMax,
    sellOneAsset,
    selling,
}: NvntAssetsViewProps) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const rowCount = useMemo(
        () => Math.ceil(assets.length / COLS),
        [assets.length],
    );

    const virtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ESTIMATE_ROW_SIZE,
        overscan: OVERSCAN,
        paddingEnd: PADDING_END,
        getItemKey: (index) => {
            const start = index * COLS;
            const a = assets[start];
            const b = assets[start + 1];
            return [a?.hash, b?.hash].filter(Boolean).join("-") || index;
        },
    });

    useEffect(() => {
        parentRef.current?.scrollTo({ top: 0 });
    }, [listKey]);

    const sellOpts = {
        getSellCount,
        setSellCount,
        setSellCountMax,
        sellOneAsset,
        selling,
    };

    return (
        <div ref={parentRef} className={s.scroll}>
            <div
                className={s.inner}
                style={{ height: virtualizer.getTotalSize() }}
            >
                {virtualizer.getVirtualItems().map((vi) => {
                    const start = vi.index * COLS;
                    const rowAssets = assets.slice(start, start + COLS);
                    if (rowAssets.length === 0) return null;

                    const rowKey = rowAssets.map((a) => a.hash).join("-");

                    return (
                        <div
                            key={rowKey}
                            data-index={vi.index}
                            ref={virtualizer.measureElement}
                            className={s.gridRow}
                            style={{
                                transform: `translateY(${vi.start}px)`,
                            }}
                        >
                            {rowAssets.map((asset) => (
                                <div key={asset.hash} className={s.cell}>
                                    {renderNvntAssetCard({
                                        view: "grid",
                                        asset,
                                        tab,
                                        ...sellOpts,
                                    })}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
