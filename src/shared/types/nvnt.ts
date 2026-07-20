import type { CaseAsset } from "./api";

// Nvnt types

export interface NvntSellOneDTO { hash: string; count: unsigned };

export type NvntSellBatchDTO = Record<"batch", Record<string, unsigned>>;

export interface NvntModelsMapInterface {
    caseasset: CaseAsset;
}

export type AllowedNvntModelNames = keyof NvntModelsMapInterface

export type AllowedNvntModels = NvntModelsMapInterface[AllowedNvntModelNames]

export interface NvntBaseAssetInterface {
    hash: string;
    count: unsigned;
    price: string | null;
    saleable: boolean;
    stackable: boolean;
    trade_locked: boolean;
    obtained_at: string;
    content_type: AllowedNvntModelNames;
    item: AllowedNvntModels;
}

export type NvntAssetOf<K extends AllowedNvntModelNames> = NvntBaseAssetInterface & { content_type: K; item: NvntModelsMapInterface[K] };

export interface NvntSellResultResponse { credited: string; updated_balance: string; }

export type NvntSelectedInterface = Record<string, unsigned>;

export type NvntResponse = { [K in AllowedNvntModelNames]?: (NvntBaseAssetInterface & { item: NvntModelsMapInterface[K] })[]; };

export type NvntFilterToggle = "all" | "yes" | "no";

export interface NvntFilters {
    search: string;
    viewMode: "grid" | "rows";

    tradeLocked: NvntFilterToggle;
    saleable: NvntFilterToggle;
    stackable: NvntFilterToggle;

    sortBy: "date_desc" | "date_asc" | "price_desc" | "price_asc";
}