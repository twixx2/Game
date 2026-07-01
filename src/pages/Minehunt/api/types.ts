import Big from "big.js";

export interface MinehuntCreateDto { bet: string; coins_count: number; client_seed: string; }

export interface MinehuntMoveDto { cellId: number; }

export interface MinehuntDetailResponse {
    hash: string;

    player: string;

    finished: boolean;
    is_win: boolean;

    bet: string;
    step: number;
    profit: string;

    salt: string;
    client_seed: string;

    explored_mines: number[];
    coins_count: number;

    created_at: string;
}

export interface MinehuntCreatedResponse extends MinehuntDetailResponse { updated_balance: string; }

export interface MinehuntMoveInterface {
    finished: false;
    is_win: false;
    step: number;
    profit: string;
    explored_mines: number[];
}

export interface MinehuntLoseResponse {
    finished: true;
    is_win: false;
    step: number;
    profit: string;
    explored_mines: number[];

    coins: number[];
    salt: string;
    client_seed: string;
}

export interface MinehuntTakeResponse {
    finished: true;
    is_win: true;
    updated_balance: string;
    coins: number[];
    salt: string;
    client_seed: string;
}

export interface MinehuntGameState {
    hash: string;
    bet: Big;
    step: number;
    profit: Big;
    exploredCoins: number[];
    exploredMines: number[];
    coinsCount: number;
    coins?: number[];
    salt: string;
    clientSeed: string;
    finished: boolean;
}

export type MinehuntMoveResponse = MinehuntMoveInterface | MinehuntLoseResponse | MinehuntTakeResponse;