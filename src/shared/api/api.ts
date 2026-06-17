import { cellInterface, Player } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import { useAuth } from "@context";
import axios from "axios";

export const fetcherCells = (headers: any) => {
    return axios
        .get<cellInterface[]>(`${API_CONFIG.BASE_URL}/cells`, { headers })
        .then(r => r.data);
};

export const fetcherMe = () => {
    const { token } = useAuth();
    return axios
        .get<Player>(`${API_CONFIG.BASE_URL}/me/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.data)
}