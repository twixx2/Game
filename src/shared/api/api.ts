import { cellInterface, Player, MeResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";
import Big from "big.js";

export const publicApi = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

export const privateApi = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
});


export const fetcherCells = () => privateApi.get<cellInterface[]>("/cells/").then(r => r.data);


export const fetcherMe = (): Promise<Player> => privateApi.get<MeResponse>("/me/").then(r => r.data).then(data => ({ ...data, wallet: { balance: new Big(data.wallet.balance), credits: new Big(data.wallet.credits) } }));