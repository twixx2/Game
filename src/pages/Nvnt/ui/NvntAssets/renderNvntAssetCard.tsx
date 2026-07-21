import type { ReactNode } from "react";
import { isNvntAsset } from "@shared/lib";
import type { AllowedNvntModelNames, NvntBaseAssetInterface } from "@shared/types";

import { NvntGridDropAsset } from "../NvntGridAssets/Assets";
import { NvntRowsDropAsset } from "../NvntRowsAssets/Assets";

export type NvntAssetViewMode = "grid" | "rows";

export interface RenderNvntAssetCardOpts {
    view: NvntAssetViewMode;
    asset: NvntBaseAssetInterface;
    tab: AllowedNvntModelNames;
    getSellCount: (hash: string) => unsigned;
    setSellCount: (hash: string, max: unsigned, raw: string | number) => void;
    setSellCountMax: (hash: string, max: unsigned) => void;
    sellOneAsset: (sell: { hash: string; count: unsigned }) => void;
    selling: boolean;
}

/** Single type → card map for grid & rows. Add new content types only here. */
export function renderNvntAssetCard({
    view,
    asset,
    tab,
    getSellCount,
    setSellCount,
    setSellCountMax,
    sellOneAsset,
    selling,
}: RenderNvntAssetCardOpts): ReactNode {
    if (tab === "caseasset" && isNvntAsset(asset, "caseasset")) {
        const props = {
            asset,
            sellCount: getSellCount(asset.hash),
            onSellCountChange: (value: unsigned) => setSellCount(asset.hash, asset.count, value),
            onMax: () => setSellCountMax(asset.hash, asset.count),
            onSell: (count: unsigned) => sellOneAsset({ hash: asset.hash, count }),
            disabled: selling,
        };

        return view === "grid"
            ? <NvntGridDropAsset {...props} />
            : <NvntRowsDropAsset {...props} />;
    }

    // later: lottie, collectible, …
    return null;
}
