export interface MeResponse {
    hash: string;
    username: string;
    wallet: { balance: Big; credits: Big; }
}

export interface RegisterResponse {
    token: string;
    user: MeResponse
}

export interface LoginResponse {
    token: string;
    user: MeResponse
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