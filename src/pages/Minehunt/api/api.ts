import { privateApi, publicApi } from "@shared/api";
import { MinehuntCreateDto, MinehuntCreatedResponse, MinehuntMoveDto, MinehuntMoveResponse, MinehuntDetailResponse, MinehuntTakeResponse } from "./types";

export const fetcherDetailMinehunt = (hash: string) => publicApi.get<MinehuntDetailResponse>(`/minehunt/${hash}/`).then(r => r.data);

export const fetcherCurrentMinehunt = () => privateApi.get<MinehuntDetailResponse>(`/minehunt/live/`);

export const fetcherCreateMinehunt = (data: MinehuntCreateDto) => privateApi.post<MinehuntCreatedResponse>("/minehunt/", data).then(r => r.data);

export const fetcherMoveMinehunt = (data: MinehuntMoveDto, hash: string) => privateApi.post<MinehuntMoveResponse>(`/minehunt/${hash}/move/`, data).then(r => r.data);

export const fetcherTakeMinehunt = (hash: string) => privateApi.post<MinehuntTakeResponse>(`/minehunt/${hash}/take/`).then(r => r.data);