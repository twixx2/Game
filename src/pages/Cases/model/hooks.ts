import { useEffect, useState } from 'react';

import { useAuth } from '@context';

import { CaseInterface } from "@shared/types";

import { fetcherCases } from "../api";

export const useHelperCases = () => {
    const [cases, setCases] = useState<CaseInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { balance, headers } = useAuth();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        setLoading(true);
        fetcherCases(headers)
            .then(r => {
                setCases(r);
            })
            .catch(err => {
                if (err.response) {
                    if (err?.response?.status) {
                        setError(err.response.status + " " + err.response.data.error);
                    }
                } else {
                    setError(err.message);
                }
            })
            .finally(() => { timer = setTimeout(() => setLoading(false), 500); });
        return () => clearTimeout(timer);
    }, []);

    return { cases, loading, error, balance }

};