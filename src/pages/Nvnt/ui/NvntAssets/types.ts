import type { AllowedNvntModelNames, NvntAssetOf, NvntBaseAssetInterface, NvntFilters, NvntResponse } from "@shared/types";

export type NvntDropAssetItem = NvntAssetOf<"caseasset">;

/** Instant-sell card (rows + grid). No multi-select. */
export interface NvntInstantSellDropProps {
    asset: NvntDropAssetItem;
    sellCount: unsigned;
    onSellCountChange: (value: unsigned) => void;
    onSell: (count: unsigned) => void;
    onMax: () => void;
    disabled?: boolean;
}

export interface NvntAssetsViewProps {
    assets: NvntBaseAssetInterface[];
    tab: AllowedNvntModelNames;
    /** Reset scroll when tab/filters change (not on sell / list length). */
    listKey: string;
    getSellCount: (hash: string) => unsigned;
    setSellCount: (hash: string, max: unsigned, raw: string | number) => void;
    setSellCountMax: (hash: string, max: unsigned) => void;
    sellOneAsset: (sell: { hash: string; count: unsigned }) => void;
    selling: boolean;
}

export interface NvntAssetsProps {
    filters: NvntFilters;
    nvnt: NvntResponse | undefined;
    assets: NvntBaseAssetInterface[];
    tab: AllowedNvntModelNames;
    resetFilters: () => void;
}
