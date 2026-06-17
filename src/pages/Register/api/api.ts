import { RegisterResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";

interface dataInterface {
    username: string;
    password: string;
}

export const fetcherRegister = (user: dataInterface) => {
    return axios
        .post<RegisterResponse>(`${API_CONFIG.BASE_URL}/register`, { ...user });
};