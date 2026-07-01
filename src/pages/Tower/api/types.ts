import Big from "big.js";

export interface TowerCreateDto { bet: string; client_seed: string; }

export interface TowerMoveDto { idx: number; choice: number; }

export interface TowerDetailResponse {
    hash: string;

    player: string;

    finished: boolean;
    is_win: boolean;

    bet: string;
    step: number;
    profit: string;

    salt: string;
    client_seed: string;

    picks: number[];

    created_at: string;
}

export interface TowerCreatedResponse extends TowerDetailResponse { updated_balance: string; }

export interface TowerMoveInterface {
    finished: false;
    is_win: false;

    step: number;
    profit: string;

    picks: number[];
}

export interface TowerLoseResponse {
    finished: true;
    is_win: false;

    step: number;
    profit: string;

    picks: number[];

    tower: number[];
    salt: string;
    client_seed: string;
}

export interface TowerTakeResponse {
    finished: true;
    is_win: true;
    updated_balance: string;
    tower: number[];
    salt: string;
    client_seed: string;
}

export interface TowerGameState {
    hash: string;
    bet: Big;
    step: number;
    profit: Big;
    picks: number[];
    tower?: number[];
    salt: string;
    clientSeed: string;
    finished: boolean;
}

export type TowerMoveResponse = TowerMoveInterface | TowerLoseResponse | TowerTakeResponse;