import { RegisterResponse, InvItemInterface } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";


interface dataInterface {
    fullName: string;
    password: string;
    email: string;
    balance: number;
    registeredAt: string;
    items: InvItemInterface[];
}

export const fetcherRegister = (user: dataInterface) => {
    return axios
        .post<RegisterResponse>(`${API_CONFIG.BASE_URL}/register`, { ...user });
};