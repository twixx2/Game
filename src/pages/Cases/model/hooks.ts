import { useEffect, useState } from 'react';

import { fetcherCases } from "../api";
import { CasesListResponse } from "@shared/types";
import { toast } from "@shared/ui";

import { isAxiosError } from 'axios';

export const useHelperCases = () => {
    const [casesData, setCasesData] = useState<CasesListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetcherCases()
            .then(r => {
                setCasesData(r);
            })
            .catch(err => {
                if (!isAxiosError(err)) return toast("Failed loading cases");
                toast(err.response?.data?.detail ?? "Failed loading cases");
            })
            .finally(() => setLoading(false));
    }, []);

    return { casesData, loading }
};

export type UseHelperCasesReturn = ReturnType<typeof useHelperCases>;