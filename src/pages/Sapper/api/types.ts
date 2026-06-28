import Big from "big.js";

export interface SapperCreateDto { bet: string; mines_count: number; client_seed: string; }

export interface SapperMoveDto { cellId: number; }

export interface SapperDetailResponse {
    hash: string;

    player: string;

    finished: boolean;
    is_win: boolean;

    bet: string;
    step: number;
    profit: string;

    salt: string;
    client_seed: string;

    explored_coins: number[];
    mines_count: number;

    created_at: string;
}

export interface SapperCreatedResponse extends SapperDetailResponse { updated_balance: string; }

export interface SapperMoveInterface {
    finished: false;
    is_win: false;
    step: number;
    profit: string;
    explored_coins: number[];
}

export interface SapperLoseResponse {
    finished: true;
    is_win: false;
    step: number;
    profit: string;
    explored_coins: number[];

    mines: number[];
    salt: string;
    client_seed: string;
}

export interface SapperTakeResponse {
    finished: true;
    is_win: true;
    updated_balance: string;
    mines: number[];
    salt: string;
    client_seed: string;
}

export interface SapperGameState {
    hash: string;
    bet: Big;
    step: number;
    profit: Big;
    exploredCoins: number[];
    exploredMines: number[];
    minesCount: number;
    mines?: number[];
    salt: string;
    clientSeed: string;
}

export type SapperMoveResponse = SapperMoveInterface | SapperLoseResponse | SapperTakeResponse;