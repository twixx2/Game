import { useAuth } from "@context/AuthContext";
import { hasNvntActiveFilters } from "@shared/lib";
import { LoginRequired } from "@shared/ui";
import { useNvntAdvanced } from "@shared/hooks";

import { NvntGridAssets } from "../NvntGridAssets/NvntGridAssets";
import { NvntRowsAssets } from "../NvntRowsAssets/NvntRowsAssets";
import type { NvntAssetsProps } from "./types";

import { Link } from "react-router-dom";
import { ROUTES } from "@/core/conf";

import s from "./nvntAssets.module.scss";

export const NvntAssets = ({ filters, nvnt, assets, tab, resetFilters }: NvntAssetsProps) => {
    const { isAuth } = useAuth();
    const {
        selling,
        getSellCount,
        setSellCount,
        setSellCountMax,
        sellOneAsset,
    } = useNvntAdvanced();

    if (!isAuth) return <LoginRequired />;
    if (!nvnt) return null;

    if (assets.length === 0) {
        if (hasNvntActiveFilters(filters)) {
            return (
                <div className={s.empty}>
                    <p className={s.emptyTitle}>No assets for those filters</p>
                    <button type="button" className={s.reset} onClick={resetFilters}>Reset Filters</button>
                </div>
            );
        }

        return (
            <div className={s.empty}>
                <p className={s.emptyTitle}>nothing here yet — check out <Link to={ROUTES.MRKT}>mrkt</Link> or go <Link to={ROUTES.CASES}>roll</Link> something</p>
            </div>
        );
    }

    const viewProps = {
        assets,
        tab,
        getSellCount,
        setSellCount,
        setSellCountMax,
        sellOneAsset,
        selling,
    };

    if (filters.viewMode === "grid") {
        return <NvntGridAssets {...viewProps} />;
    }

    return <NvntRowsAssets {...viewProps} />;
};
