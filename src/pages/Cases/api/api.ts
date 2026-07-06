import { CasesListResponse } from "@shared/types";
import { publicApi } from "@shared/api";

export const fetcherCases = () => publicApi.get<CasesListResponse>(`/cases/`).then(r => r.data);