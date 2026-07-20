import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@context";

import { fetcherNvnt } from "@shared/api";

export const useNvnt = () => {
    const { token } = useAuth();

    const query = useQuery({
        queryKey: ["nvnt"],
        queryFn: fetcherNvnt,
        retry: false,
        enabled: !!token
    });

    return { ...query }
}