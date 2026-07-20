import Big from "big.js";

export interface Player {
    hash: string;
    username: string;
    wallet: { balance: Big; credits: Big; }
}

export type PhaseStatus = "idle" | "creating" | "taking" | "pulling";