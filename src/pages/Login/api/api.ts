import { LoginResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";

interface LoginDataInterface {
    password: string;
    email: string;
}

export const fetcherLogin = (user: LoginDataInterface) => {
    return axios
        .post<LoginResponse>(`${API_CONFIG.BASE_URL}/auth`, { ...user })
};