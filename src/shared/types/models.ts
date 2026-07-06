import Big from "big.js";

export interface InvItemInterface {
    id: number;
    caseId: number;
    name: string;
    rarity: string;
    value: number;
    image: string;
    weight: number;
    count: number;
}

export interface Player {
    hash: string;
    username: string;
    wallet: { balance: Big; credits: Big; }
}

export type PhaseStatus = "idle" | "creating" | "taking" | "pulling";