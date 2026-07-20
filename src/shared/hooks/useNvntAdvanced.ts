import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Big from "big.js";

import { NvntSelectedInterface, NvntSellOneDTO, NvntSellBatchDTO } from "@shared/types"
import { fetcherSellOneAsset, fetcherSellBatchAssets, fetcherSellAllAssets } from "@shared/api"
import { formatCurrency } from "@shared/lib";
import { usePlayer } from "./usePlayer";
import { toast } from "@shared/ui";
import type { CurrencyType } from "@/core/conf";

const toSellCount = (raw: string | number, max: unsigned): unsigned => {
    const n = typeof raw === "string" ? parseInt(raw.replace(/\D/g, ""), 10) : raw;
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.min(Math.floor(n), Math.max(1, max)) as unsigned;
};

const handleSellError = (err: unknown, fallback: string) => {
    if (!isAxiosError(err)) return toast(fallback);
    return toast(err.response?.data?.detail ?? fallback);
};

export const useNvntAdvanced = () => {
    const { syncWallet } = usePlayer();
    const queryClient = useQueryClient();

    const [selecting, setSelecting] = useState<boolean>(false);
    const [selected, setSelected] = useState<NvntSelectedInterface | undefined>(undefined);
    const [selling, setSelling] = useState<boolean>(false);
    const [sellCounts, setSellCounts] = useState<Record<string, unsigned>>({});

    const getSellCount = (hash: string): unsigned => sellCounts[hash] ?? 1;

    const setSellCount = (hash: string, max: unsigned, raw: string | number) => {
        setSellCounts((prev) => ({
            ...prev,
            [hash]: toSellCount(raw, max),
        }));
    };

    const setSellCountMax = (hash: string, max: unsigned) => {
        setSellCounts((prev) => ({
            ...prev,
            [hash]: Math.max(1, max) as unsigned,
        }));
    };

    const onSellOk = (r: { credited: string; updated_balance: string }, label: string) => {
        syncWallet("balance" as CurrencyType, r.updated_balance);
        queryClient.invalidateQueries({ queryKey: ["nvnt"] });
        toast(`${label} ${formatCurrency(new Big(r.credited))}`);
    };

    const sellOneAsset = (sell: NvntSellOneDTO): void => {
        if (selling || !sell.hash || sell.count < 1) return;

        setSelling(true);
        fetcherSellOneAsset(sell)
            .then((r) => onSellOk(r, "Sold ·"))
            .catch((err) => handleSellError(err, "Failed to sell asset"))
            .finally(() => setSelling(false));
    };

    const sellBatchAssets = (batch: NvntSellBatchDTO): void => {
        if (selling || !batch?.batch || Object.keys(batch.batch).length === 0) return;

        setSelling(true);
        fetcherSellBatchAssets(batch)
            .then((r) => onSellOk(r, "Sold ·"))
            .catch((err) => handleSellError(err, "Failed to sell batch"))
            .finally(() => setSelling(false));
    };

    const sellAllAssets = (): void => {
        if (selling) return;

        setSelling(true);
        fetcherSellAllAssets()
            .then((r) => onSellOk(r, "Sold all ·"))
            .catch((err) => handleSellError(err, "Failed to sell all"))
            .finally(() => setSelling(false));
    };

    const handleSelection = () => { };

    const handleSelectItem = () => { };

    const decSelectedItem = () => { };

    const incSelectedItem = () => { };

    const maxSelectItem = () => { };

    const minSelectItem = () => { };

    const selectAllItems = () => { };

    const clearAllItems = () => { };

    return {
        selecting,
        selected,
        selling,
        sellCounts,
        getSellCount,
        setSellCount,
        setSellCountMax,
        sellOneAsset,
        sellBatchAssets,
        sellAllAssets,
        handleSelection,
        handleSelectItem,
        decSelectedItem,
        incSelectedItem,
        maxSelectItem,
        minSelectItem,
        selectAllItems,
        clearAllItems,
        setSelecting,
        setSelected,
    };
}

export type useNvntAdvancedReturn = ReturnType<typeof useNvntAdvanced>;
