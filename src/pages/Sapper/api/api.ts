import { privateApi, publicApi } from "@shared/api";
import { SapperCreateDto, SapperCreatedResponse, SapperMoveDto, SapperMoveResponse, SapperDetailResponse, SapperTakeResponse } from "./types";

export const fetcherDetailSapper = (hash: string) => publicApi.get<SapperDetailResponse>(`/sapper/${hash}/`).then(r => r.data);

export const fetcherCurrentSapper = () => privateApi.get<SapperDetailResponse>(`/sapper/live/`);

export const fetcherCreateSapper = (data: SapperCreateDto) => privateApi.post<SapperCreatedResponse>("/sapper/", data).then(r => r.data);

export const fetcherMoveSapper = (data: SapperMoveDto, hash: string) => privateApi.post<SapperMoveResponse>(`/sapper/${hash}/move/`, data).then(r => r.data);

export const fetcherTakeSapper = (hash: string) => privateApi.post<SapperTakeResponse>(`/sapper/${hash}/take/`).then(r => r.data);