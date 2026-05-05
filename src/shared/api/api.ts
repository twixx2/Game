import { cellInterface } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";

export const fetcherCells = (headers: any) => {
    return axios
        .get<cellInterface[]>(`${API_CONFIG.BASE_URL}/cells`, { headers })
        .then(r => r.data);
};