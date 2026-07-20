import { Page } from '@shared/ui';
import { AnimatePresence } from '@shared/motion';
import { useNvnt } from '@shared/hooks';

import { FiltersModal, NvntTypes, NvntTempBanner, NvntFiltersView, NvntAssets } from './ui/';
import { useHelperNvnt } from './model';

import s from "./nvnt.module.scss";


export const NvntPage = () => {

    const { data: nvnt } = useNvnt();
    const { NVNT_UI_TYPES, filters, filteredAssets, openFilters, tab, changeTab, resetFilters, setOpenFilters, updateFilters } = useHelperNvnt();

    return (
        <Page title="nvnt" subtitle="co11ect1on">
            {openFilters && <AnimatePresence><FiltersModal onClose={() => setOpenFilters(false)} /></AnimatePresence>}

            <div className={s.nvnt}>
                <NvntTempBanner />

                <NvntTypes NAMES_MAP={NVNT_UI_TYPES} nvntData={nvnt} tab={tab} onChange={changeTab} />

                <NvntFiltersView filters={filters} openFilters={() => setOpenFilters(true)} resetFilters={resetFilters} updateFilters={updateFilters} />

                <div className={s.nvntCont}>
                    <NvntAssets
                        filters={filters}
                        nvnt={nvnt}
                        assets={filteredAssets}
                        tab={tab}
                        resetFilters={resetFilters}
                    />
                </div>
            </div>

        </Page >
    );
};
