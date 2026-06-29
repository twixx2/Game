import { useContext, createContext, useEffect, useState, SetStateAction } from 'react';
import { useAuth } from '@context/AuthContext';

import axios from "axios";
import toast from "react-hot-toast";

import { InvItemInterface, CaseItemInterface } from "@shared/types";
import { API_CONFIG } from '@/core/conf';

interface InvContextInterface {
    items: InvItemInterface[];
    selected: Record<number, number>;
    selectedArr: InvItemInterface[];
    isSelecting: boolean;
    totalPrice: number;

    setSelected: React.Dispatch<SetStateAction<Record<number, number>>>;
    setItems: React.Dispatch<SetStateAction<InvItemInterface[]>>;
    addItem: (item: CaseItemInterface) => void;
    sellItems: () => void;
    handleSelection: () => void;
    handleSelectItem: (id: number) => void;
    decSelectedItem: (id: number) => void;
    incSelectedItem: (id: number) => void;
    maxSelectItem: (id: number) => void;
    minSelectItem: (id: number) => void;
    selectAllItems: () => void;
    clearAllItems: () => void;
}

const InvContext = createContext<InvContextInterface | null>(null);


export const InvProvider = ({ children }: { children: React.ReactNode }) => {
    const { userId, headers, editBalance, balance, userItems } = useAuth();
    const [items, setItems] = useState<InvItemInterface[]>([]);
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [selectedArr, setSelectedArr] = useState<InvItemInterface[]>([]);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setItems([...userItems]);
    }, [userItems]);

    useEffect(() => {
        const backup = [...items];
        
        if (items && userId) {
            axios
                .patch(`${API_CONFIG.BASE_URL}/users/${userId}`, {
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
        };
    }, [items]);

    useEffect(() => {
        setSelectedArr(prev => {
            if (Object.keys(selected).length === 0) return [];
            let next = items
                .filter(item => Object.hasOwn(selected, item.id))
                .map(item => ({ ...item, count: selected[item.id]! }));
            return next;
        });

        setTotalPrice(prev => {
            if (Object.keys(selected).length === 0) return 0;
            let total = items
                .filter(item => Object.hasOwn(selected, item.id))
                .reduce<number>((acc, item) => {
                    return acc + item.value * (selected[item.id] || 0);
                }, 0)
            return total;
        })

    }, [selected]);

    const handleSelection = (): void => {
        setSelected({});
        setIsSelecting(prev => !prev);
    };

    const handleSelectItem = (id: number): void => {
        if (!isSelecting) return;
        setSelected(prev => {
            let next;
            if (!prev[id]) return { ...prev, [id]: 1 };
            next = { ...prev }
            delete next[id]
            return next;
        });
    };

    const selectAllItems = (): void => {
        setSelected(prev => {
            return items.reduce((acc, item) => (
                { ...acc, [item.id]: item.count }
            ), {});
        });
    }

    const clearAllItems = (): void => {
        if (!isSelecting) return;
        setSelected({});
    }

    const decSelectedItem = (id: number): void => {
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

    const incSelectedItem = (id: number): void => {
        const item = items.find(i => i.id === id);
        if (!item) return;

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

    const maxSelectItem = (id: number): void => {
        const item = items.find(i => i.id === id);
        if (!item) return;
        setSelected(prev => {
            return { ...prev, [id]: item.count };
        });

        if (!isSelecting) setIsSelecting(true);
    };

    const minSelectItem = (id: number): void => {
        if (!isSelecting || selected[id] === 1) return;
        setSelected(prev => {
            return { ...prev, [id]: 1 }
        });
    };

    const addItem = (item: CaseItemInterface): void => {
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

    const sellItems = (): void => {
        if (!isSelecting || items.length === 0) return;
        setItems(prev => {
            return items.reduce<InvItemInterface[]>((acc, item) => {
                if (!Object.hasOwn(selected, item.id)) return [...acc, item];
                const val = selected[item.id];
                if (val === undefined) return [...acc, item]
                if (item.count > val) {
                    const newItem = { ...item, count: item.count - val };
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

export const useInv = () => {
    const context = useContext(InvContext);
    if (!context) {
        throw new Error("Ошибка получения контекста");
    }

    return context;
};