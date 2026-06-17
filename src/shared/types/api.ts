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

export interface CaseResponse {
    id: number;
    title: string;
    image: string;
    price: number;
}

export interface CaseDetailResponse {
    id: number;
    title: string;
    image: string;
    price: number;
    items: number[];
}