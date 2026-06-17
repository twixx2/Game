import { LoginResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";

interface LoginDataInterface {
    username: string;
    password: string;
}

export const fetcherLogin = (user: LoginDataInterface) => {
    return axios
        .post<LoginResponse>(`${API_CONFIG.BASE_URL}/login/`, { ...user })
};