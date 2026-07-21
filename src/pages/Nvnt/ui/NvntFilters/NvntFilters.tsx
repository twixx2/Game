import type { NvntFilters } from "@shared/types"
import { Icon } from "@shared/ui"
import clsx from "clsx"

import s from "./nvntFilters.module.scss";

interface NvntFiltersProps {
    filters: NvntFilters;
    updateFilters: <K extends keyof NvntFilters>(key: K, value: NvntFilters[K]) => void;
    resetFilters: () => void;
    openFilters: () => void;
}

export const NvntFiltersView = ({ filters, updateFilters, openFilters }: NvntFiltersProps) => {
    const renderGridRows = (): React.ReactNode => {
        if (filters.viewMode === "grid") return <Icon name="grid" size={24} />
        return <Icon name="rows" size={30} />
    }

    // Badge only for drawer fields (search already visible in the bar)
    const drawerActive =
        filters.tradeLocked !== "all"
        || filters.saleable !== "all"
        || filters.stackable !== "all"
        || filters.sortBy !== "date_desc";

    return (
        <div className={s.filters}>
            <div className={s.search}>
                <Icon name="search" size={26} />
                <input type="search" value={filters.search} onChange={(e) => updateFilters("search", e.target.value)} placeholder="Quick find..." autoCorrect="off" autoCapitalize="off" autoComplete="off" spellCheck={false} />
                {filters.search && (
                    <button type="button" className={s.cBtn} onClick={() => updateFilters("search", "")}><Icon name="x" size={22} /></button>
                )}
            </div>
            <div className={s.options}>
                <button type="button" onClick={() => updateFilters("viewMode", filters.viewMode === "grid" ? "rows" : "grid")}>{renderGridRows()}</button>
                <button type="button" className={clsx(s.filterBtn, drawerActive && s.active)} onClick={openFilters}>
                    <Icon name="filter" size={32} />
                    {drawerActive && <span className={s.dot} aria-hidden />}
                </button>
            </div>
        </div>
    );
};