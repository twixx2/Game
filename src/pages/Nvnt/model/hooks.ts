import { useEffect, useRef, useState } from "react";

import { InvItemInterface } from '@shared/types';
import { useInv } from '@context';



export const useHelperInv = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openSelected, setOpenSelected] = useState<boolean>(false);
    const [searchController, setSearchController] = useState<string>('');
    const { items, selected, isSelecting, handleSelection, handleSelectItem, decSelectedItem, incSelectedItem, minSelectItem, maxSelectItem, selectedArr, totalPrice, selectAllItems, clearAllItems, sellItems } = useInv();

    let filteredItems: InvItemInterface[] = searchController.length > 0 ? items.filter(item => item.name.includes(searchController)) : items

    useEffect(() => {
        document.body.style.overflow = openModal ? 'hidden' : '';
    }, [openModal]);

    return {
        openModal, setOpenModal,
        openSelected, setOpenSelected,
        searchController, setSearchController,
        filteredItems, selected, isSelecting, selectedArr, totalPrice,
        handleSelection, handleSelectItem, decSelectedItem, incSelectedItem, minSelectItem, maxSelectItem, selectAllItems, clearAllItems, sellItems
    }
};