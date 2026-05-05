import { CaseResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";


export const fetcherCases = (headers: any) => {
    return axios
        .get<CaseResponse[]>(`${API_CONFIG.BASE_URL}/cases?_select=-items`, { headers })
        .then(r => r.data)
};