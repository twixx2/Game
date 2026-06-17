import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@context";
import { fetcherMe } from "@shared/api";

export const usePlayer = () => {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["player"],
        queryFn: fetcherMe,
        retry: false,
        enabled: !!token
    })
}