import { privateApi, publicApi } from "@shared/api";
import { TowerCreateDto, TowerCreatedResponse, TowerMoveDto, TowerMoveResponse, TowerDetailResponse, TowerTakeResponse } from "./types";

export const fetcherDetailTower = (hash: string) => publicApi.get<TowerDetailResponse>(`/tower/${hash}/`).then(r => r.data);

export const fetcherCurrentTower = () => privateApi.get<TowerDetailResponse>(`/tower/live/`);

export const fetcherCreateTower = (data: TowerCreateDto) => privateApi.post<TowerCreatedResponse>("/tower/", data).then(r => r.data);

export const fetcherMoveTower = (data: TowerMoveDto, hash: string) => privateApi.post<TowerMoveResponse>(`/tower/${hash}/move/`, data).then(r => r.data);

export const fetcherTakeTower = (hash: string) => privateApi.post<TowerTakeResponse>(`/tower/${hash}/take/`).then(r => r.data);