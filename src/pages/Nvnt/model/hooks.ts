import { useNvnt } from "@shared/hooks";
import { filterAndSortAssets } from "@shared/lib";
import { NvntFilters, NvntBaseAssetInterface, AllowedNvntModelNames } from "@shared/types";

import { useEffect, useState, useMemo } from "react";

const NVNT_UI_TYPES: Record<AllowedNvntModelNames, string> = {
    "caseasset": "Drops",
}

export type NvntFilterToggle = "all" | "yes" | "no";

const initialFilters: NvntFilters = {
    search: '',

    viewMode: "grid",

    tradeLocked: "all",
    saleable: "all",
    stackable: "all",

    sortBy: "date_desc",
}

export const useHelperNvnt = () => {
    const [filters, setFilters] = useState<NvntFilters>(initialFilters);
    const [tab, setTab] = useState<AllowedNvntModelNames>("caseasset");

    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [openSelected, setOpenSelected] = useState<boolean>(false);

    const { data: nvnt } = useNvnt();

    const changeTab = (val: AllowedNvntModelNames) => { setTab(val); };

    const updateFilters = <K extends keyof NvntFilters>(key: K, value: NvntFilters[K]) => setFilters(prev => ({ ...prev, [key]: value }));

    const resetFilters = (): void => { setFilters(initialFilters); };

    const resetDrawerFilters = (): void => {
        setFilters((prev) => ({
            ...prev,
            tradeLocked: "all",
            saleable: "all",
            stackable: "all",
            sortBy: "date_desc",
        }));
    };

    const runFilters = (assets: NvntBaseAssetInterface[]): NvntBaseAssetInterface[] => { return filterAndSortAssets(assets, filters); };

    const filteredAssets = useMemo(() => {
        return filterAndSortAssets(nvnt?.[tab] ?? [], filters);
    }, [nvnt, tab, filters]);

    useEffect(() => {
        document.body.style.overflow = openFilters ? 'hidden' : '';
    }, [openFilters]);

    return { NVNT_UI_TYPES, filters, openFilters, openSelected, tab, changeTab, setOpenFilters, setOpenSelected, resetFilters, resetDrawerFilters, runFilters, updateFilters, filteredAssets, };
};

export type UseHelperNvntReturn = ReturnType<typeof useHelperNvnt>;