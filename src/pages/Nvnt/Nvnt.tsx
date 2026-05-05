import { FiltersModal, Page } from '@shared/ui';
import { AnimatePresence } from '@shared/motion';

import { NvntOptions } from './ui/Options/Options';
import { NvntSelected } from './ui/Selected/Selected';
import { NvntItems } from './ui/Items/Items';
import { useHelperInv } from './model/hooks';

import s from "./nvnt.module.scss";


export const NvntPage = () => {

    const { openModal, isSelecting, setOpenModal, filteredItems } = useHelperInv();


    return (
        <Page title="nvnt" subtitle={`${filteredItems.length} collected`}>
            {openModal && <AnimatePresence><FiltersModal onClose={() => setOpenModal(false)} /></AnimatePresence>}

            <div className={s.inventory}>

                <div className={s.invCont}>

                    <div className={s.header}>
                        <NvntOptions onOpen={() => setOpenModal(true)} />

                        {isSelecting && <NvntSelected />}
                    </div>

                    <NvntItems />

                </div>
            </div>

        </Page>
    );
};