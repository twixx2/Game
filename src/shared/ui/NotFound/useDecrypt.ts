import { useEffect, useState } from "react";

export const TARGET_CODE = "404";
export const DECRYPT_SYMBOLS = "$#X&?><D^@%*!~[]+=_-|\\/:;";
export const DECRYPT_DURATION = 2000;
export const LOCK_AT = [600, 1200, 1800] as const;
export const CYCLE_INTERVAL = 40;

export const getRandomSymbol = () =>
    DECRYPT_SYMBOLS[Math.floor(Math.random() * DECRYPT_SYMBOLS.length)];

const getInitialDigits = () =>
    TARGET_CODE.split("").map(() => getRandomSymbol());

export const useDecrypt404 = () => {
    const [digits, setDigits] = useState(getInitialDigits);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const locked = [false, false, false];
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        const cycleInterval = setInterval(() => {
            setDigits((prev) =>
                prev.map((char, index) => {
                    if (locked[index]) return char;
                    return getRandomSymbol();
                })
            );
        }, CYCLE_INTERVAL);

        LOCK_AT.forEach((lockAt, index) => {
            const lockTimeout = setTimeout(() => {
                locked[index] = true;
                setDigits((prev) => {
                    const next = [...prev];
                    next[index] = TARGET_CODE[index];
                    return next;
                });
            }, lockAt);

            timeouts.push(lockTimeout);
        });

        const completeTimeout = setTimeout(() => {
            clearInterval(cycleInterval);
            setIsComplete(true);
        }, DECRYPT_DURATION);

        timeouts.push(completeTimeout);

        return () => {
            clearInterval(cycleInterval);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return { digits, isComplete };
};