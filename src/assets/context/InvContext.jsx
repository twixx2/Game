/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, createContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from "axios";
import toast from "react-hot-toast";


const InvContext = createContext();

export const useInv = () => useContext(InvContext);


export const InvProvider = ({ children }) => {
    const { userId, headers, editBalance, balance, userItems } = useAuth();
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({});
    const [selectedArr, setSelectedArr] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const url = import.meta.env.VITE_USER_API_URL;

    useEffect(() => {
        setItems([...userItems]);
    }, [userItems]);

    useEffect(() => {
        const backup = [...items];

        if (items && userId) {
            axios
                .patch(`${url}/users/${userId}`, {
                    items: items
                }, { headers })
                .then(() => {
                    setSelected({});
                    setSelectedArr([]);
                    setTotalPrice(0);
                })
                .catch(err => {
                    setItems([...backup]);
                    toast.error("Возникла ошибка. Инвентарь был возвращен");
                    console.log(err);
                });
        }


    }, [items]);

    useEffect(() => {
        setSelectedArr(prev => {
            if (Object.keys(selected).length === 0) return [...[]];
            let next = items
                .filter(item => Object.hasOwn(selected, item.id))
                .map(item => ({ ...item, count: selected[item.id] }));
            return next;
        });

        setTotalPrice(prev => {
            if (Object.keys(selected).length === 0) return 0;
            let total = items
                .filter(item => Object.hasOwn(selected, item.id))
                .reduce((acc, item) => {
                    return acc + item.value * selected[item.id];
                }, 0)
            return total;
        })

    }, [selected]);

    const handleSelection = () => {
        setSelected({});
        setIsSelecting(prev => !prev);
    };

    const handleSelectItem = (id) => {
        if (!isSelecting) return;
        setSelected(prev => {
            let next;
            if (!prev[id]) return { ...prev, [id]: 1 };
            next = { ...prev }
            delete next[id]
            return next;
        });
    };

    const selectAllItems = () => {
        setSelected(prev => {
            return items.reduce((acc, item) => (
                { ...acc, [item.id]: item.count }
            ), {});
        });
    }

    const clearAllItems = () => {
        if (!isSelecting) return;
        setSelected({});
    }

    const decSelectedItem = (id) => {
        if (!isSelecting) return;
        setSelected(prev => {
            const val = prev[id];
            if (!val || val === 0) return prev;
            if (val > 1) return { ...prev, [id]: val - 1 };
            let next = { ...prev }
            delete next[id];
            return next;
        });
    };

    const incSelectedItem = (id) => {
        const item = items.find(i => i.id === id);
        const max = item.count;

        setSelected(prev => {
            const val = prev[id] ?? 0;

            if (val < max) {
                return { ...prev, [id]: val + 1 };
            }

            return prev;
        });

        if (!isSelecting) setIsSelecting(true);
    };

    const maxSelectItem = (id) => {
        const item = items.find(i => i.id === id);
        setSelected(prev => {
            return { ...prev, [id]: item.count };
        });

        if (!isSelecting) setIsSelecting(true);
    };

    const minSelectItem = (id) => {
        if (!isSelecting || selected[id] === 1) return;
        setSelected(prev => {
            return { ...prev, [id]: 1 }
        });
    };

    const addItem = (item) => {
        setItems(prev => {
            const idx = prev.findIndex(i => i.id === item.id);
            if (idx !== -1) {
                // Уже есть — увеличиваем количество
                return prev.map((i, n) =>
                    n === idx ? { ...i, count: i.count + 1 } : i
                );
            }
            // Нет такого — добавляем новый
            return [...prev, { ...item, count: 1 }];
        });
    };

    const sellItems = () => {
        if (!isSelecting || items.length === 0) return;
        setItems(prev => {
            return items.reduce((acc, item) => {
                if (!Object.hasOwn(selected, item.id)) return [...acc, item];
                const val = selected[item.id];
                if (item.count > val) {
                    const newItem = {...item, count: item.count - val};
                    return [...acc, newItem];
                }
                return [...acc];
            }, []);
        });
        editBalance(balance + totalPrice);
    };



    return (
        <InvContext.Provider value={{
            items, setItems,
            selected, setSelected,
            isSelecting,
            addItem, sellItems,
            handleSelection, handleSelectItem,
            decSelectedItem, incSelectedItem,
            maxSelectItem, minSelectItem,
            selectedArr, totalPrice,
            selectAllItems, clearAllItems,
        }}>
            {children}
        </InvContext.Provider>

    );
};


