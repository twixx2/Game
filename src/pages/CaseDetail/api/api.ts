import { CaseItemInterface, CaseDetailResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import axios from "axios";

export const fetcherCase = (caseId: string, headers: any): Promise<{ caseData: CaseDetailResponse; itemsData: CaseItemInterface[] }> => {
    return Promise.all([
        axios.get<CaseDetailResponse>(`${API_CONFIG.BASE_URL}/cases/${caseId}`, { headers }),
        axios.get<CaseItemInterface[]>(`${API_CONFIG.BASE_URL}/caseItems?caseId=${caseId}`, { headers })
    ]).then(([caseRes, itemsRes]) => {
        return {
            caseData: caseRes.data,
            itemsData: itemsRes.data || []
        }
    })
}