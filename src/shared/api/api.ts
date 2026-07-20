import { Player, MeResponse, NvntResponse, NvntSelectedInterface, NvntSellResultResponse, NvntSellOneDTO, NvntSellBatchDTO } from "@shared/types";
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

export const fetcherMe = (): Promise<Player> => privateApi.get<MeResponse>("/me/").then(r => r.data).then(data => ({ ...data, wallet: { balance: new Big(data.wallet.balance), credits: new Big(data.wallet.credits) } }));

export const fetcherNvnt = () => privateApi.get<NvntResponse>("/nvnt/").then(r => r.data);

export const fetcherSellOneAsset = (sell: NvntSellOneDTO) => privateApi.post<NvntSellResultResponse>("/nvnt/sell/", sell).then(r => r.data);

export const fetcherSellBatchAssets = (batch: NvntSellBatchDTO) => privateApi.post<NvntSellResultResponse>("/nvnt/sell/batch/", batch).then(r => r.data);

export const fetcherSellAllAssets = () => privateApi.post<NvntSellResultResponse>("/nvnt/sell/all/").then(r => r.data);
