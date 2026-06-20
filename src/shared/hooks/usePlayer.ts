import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@context";

import { fetcherMe } from "@shared/api";
import { Player } from "@shared/types";
import { CurrencyType } from "@/core/conf";
import Big from "big.js";

export const usePlayer = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    const syncWallet = (type: CurrencyType, amount: string | number | Big) => {
        queryClient.setQueryData<Player>(["player"], (oldData) => {
            if (!oldData) return oldData;
            return { ...oldData, wallet: { ...oldData.wallet, [type]: new Big(amount) } }
        });
    };

    const query = useQuery({
        queryKey: ["player"],
        queryFn: fetcherMe,
        retry: false,
        enabled: !!token
    });

    return { ...query, syncWallet }
}