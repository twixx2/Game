import { CaseDetailInterface, CaseOpenedInterface } from "@shared/types";
import { privateApi, publicApi } from "@shared/api";

export const fetcherCase = (hash: string) => publicApi.get<CaseDetailInterface>(`/cases/${hash}/`).then(r => r.data);

export const fetcherOpenCase = (hash: string) => privateApi.post<CaseOpenedInterface>(`/cases/${hash}/open/`).then(r => r.data);