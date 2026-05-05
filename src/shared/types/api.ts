import { InvItemInterface } from "./models"

export interface MeResponse {
    fullName: string;
    email: string;
    password?: string;
    balance: number;
    registeredAt: string;
    id: number;
    items: InvItemInterface[];
}

export interface RegisterResponse {
    token: string;
    data: {
        fullName: string;
        email: string;
        password: string;
        balance: number;
        registeredAt: string;
        token: string;
        id: number;
        items: InvItemInterface[];
    }
}

export interface LoginResponse {
    token: string;
    data: {
        fullName: string;
        email: string;
        balance: number;
        registeredAt: string;
        token: string;
        id: number;
        items: InvItemInterface[];
    }
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