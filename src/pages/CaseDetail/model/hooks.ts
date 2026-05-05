import { CaseItemInterface, CaseDetailInterface } from "@shared/types"

import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

import { useAuth, useInv } from '@context';

import { fetcherCase } from "../api";

import toast from 'react-hot-toast';


export const useHelperCase = () => {
    const { caseId } = useParams<{ caseId: string }>();
    const { balance, headers, isAuth, editBalance } = useAuth();
    const { addItem } = useInv();
    const frameRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [c, setCase] = useState<CaseDetailInterface | null>(null);
    const [items, setItems] = useState<CaseItemInterface[]>([]);
    const [rolling, setRolling] = useState<boolean>(false);
    const [queue, setQueue] = useState<CaseItemInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [win, setWin] = useState<number | null>(null);
    const [received, setReceived] = useState<CaseItemInterface | null>(null);


    function weightedRandom(items: CaseItemInterface[]): CaseItemInterface | undefined {
        const total = items.reduce((sum, i) => sum + (i.weight || 0), 0);
        let r = Math.random() * total;
        for (let it of items) {
            if (r < (it.weight || 0)) return it;
            r -= (it.weight || 0);
        }
        return items[0];
    }

    useEffect(() => {
        if (!caseId || isNaN(parseInt(caseId))) return;
        setLoading(true);
        let timer: ReturnType<typeof setTimeout>;
        fetcherCase(caseId, headers)
            .then(res => {
                setCase(res.caseData);
                setItems(res.itemsData)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response?.status !== 401) {
                        setError(err.response.status + " " + err.response.data.error);
                    }
                } else {
                    setError(err.message);
                }
            })
            .finally(() => {
                timer = setTimeout(() => setLoading(false), 500);
            });
        return () => clearTimeout(timer);
    }, [caseId]);

    const clearAnim = (): void => {
        setQueue([]);
        if (trackRef.current) {
            trackRef.current.style.transition = 'none';
            trackRef.current.style.transform = 'translateX(0px)';
        }
    }

    const openAgain = async (): Promise<void> => {
        if (received) {
            addItem(received);
            setWin(null);
            setIsOpen(false);
            openCase();
            return;
        }
        toast.error("failed to receive the prize");
        return;
    }

    const openCase = async (): Promise<void> => {
        if (rolling || !c || !items.length) return;
        if (c.price > balance) return void toast.error("out of balance");
        editBalance(balance - c.price);
        setIsOpen(false);
        setRolling(true);
        clearAnim();
        // выбираем выигрыш
        const winItem = weightedRandom(items);
        // собираем очередь: baseRounds случайных + winItem + buffer
        const baseRounds = 20;
        const bufferAfter = 5;

        const rnds = Array.from({ length: baseRounds }, () =>
            items[Math.floor(Math.random() * items.length)]
        );

        const buf = Array.from({ length: bufferAfter }, () =>
            items[Math.floor(Math.random() * items.length)]
        );

        const arr = [...rnds, winItem, ...buf];
        if (arr && arr.length > 0) {
            const cleanArr = arr.filter((item): item is CaseItemInterface => !!item);
            setQueue(cleanArr)
        } else {
            toast.error("failed to set up the queue");
            return;
        }

        // ждём, пока React вмонтирует все .slot
        await new Promise(r => requestAnimationFrame(r));

        // измеряем, где именно окажется нужный слот

        const frameEl = frameRef.current;
        const trackEl = trackRef.current;
        const slotEls = trackEl?.querySelectorAll('.slot');
        const winIndex = baseRounds;
        const target = slotEls ? slotEls[winIndex] : undefined;

        if (!target) {
            console.error('Не нашли слот', winIndex);
            setRolling(false);
            return;
        }

        const frameRect = frameEl?.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const slotW = targetRect.width;
        // смещение: чтобы центр target совпал с центром frame
        const offset = frameRect ? (targetRect.left - frameRect.left) - (frameRect.width - slotW) / 2 : undefined;

        // сбрасываем и анимируем
        if (trackEl) {
            trackEl.style.transition = 'none';
            trackEl.style.transform = 'translateX(0px)';
        }
        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                if (trackEl && offset) {
                    trackEl.style.transition = 'transform 3s ease-out';
                    trackEl.style.transform = `translateX(-${offset}px)`;
                }
            })
        );

        // когда закончится — выдаём результат
        setTimeout(() => {
            if (winItem) {
                setRolling(false);
                setIsOpen(true);
                setWin(winItem.value);
                setReceived(winItem);
            } else {
                toast.error("failed to find the prize");
            }
        }, 3200);
    };

    const sellReceived = (): void => {
        win ? editBalance(balance + win) : toast.error("failed to update a balance");
        clearAnim();
        setRolling(false);
        setIsOpen(false);
        setWin(null);
    }

    const receive = (): void => {
        received ? addItem(received) : toast.error("failed to receive the prize");
        clearAnim();
        setRolling(false);
        setIsOpen(false);
        setWin(null);
    }

    return { balance, frameRef, trackRef, c, items, rolling, queue, loading, error, isOpen, isAuth, win, received, openAgain, openCase, sellReceived, receive }

};