export type CaseRarityName = string & { readonly __brand?: "Rarity" };
export type CaseTypeName = string & { readonly __brand?: "Type" };

export interface MeResponse {
    hash: string;
    username: string;
    wallet: { balance: string; credits: string; }
}

export interface RegisterResponse {
    token: string;
}

export interface LoginResponse {
    token: string;
}


// Case types
export interface CaseInterface {
    hash: string;
    name: string;
    image: string;
    price: string;
}

export interface CaseAsset {
    name: string;
    image: string;
    price: string;
    rarity: CaseRarityName;
}

export type CasesListResponse = Record<CaseTypeName, CaseInterface[]>

export interface CaseDetailInterface {
    hash: string;
    name: string;
    image: string;
    price: string;

    rarity_weights: Partial<Record<CaseRarityName, unsigned>>
    assets: CaseAsset[];
}

export interface CaseOpenedInterface {
    asset: CaseAsset;
    updated_balance: string;
    /** Asset's hash for instant sell */
    hash: string;
}