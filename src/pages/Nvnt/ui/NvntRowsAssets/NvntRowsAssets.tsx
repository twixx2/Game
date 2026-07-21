import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { NvntAssetsViewProps } from "../NvntAssets/types";
import { renderNvntAssetCard } from "../NvntAssets/renderNvntAssetCard";

import s from "./nvntRowsAssets.module.scss";

/** Prefer overestimate so totalSize never short-changes before measure */
const ESTIMATE_ROW_SIZE = 140;
const OVERSCAN = 4;
/** Extra scroll room so last card fully clears the viewport edge */
const PADDING_END = 24;

export const NvntRowsAssets = ({
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

    const virtualizer = useVirtualizer({
        count: assets.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ESTIMATE_ROW_SIZE,
        overscan: OVERSCAN,
        paddingEnd: PADDING_END,
        getItemKey: (index) => assets[index]?.hash ?? index,
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
                    const asset = assets[vi.index];
                    if (!asset) return null;

                    return (
                        <div
                            key={asset.hash}
                            data-index={vi.index}
                            ref={virtualizer.measureElement}
                            className={s.row}
                            style={{
                                transform: `translateY(${vi.start}px)`,
                            }}
                        >
                            {renderNvntAssetCard({
                                view: "rows",
                                asset,
                                tab,
                                ...sellOpts,
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
