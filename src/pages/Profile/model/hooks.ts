import { useEffect, useRef, useState } from "react";

import { useAuth } from '@context';

import toast from 'react-hot-toast';

interface TabData {
    id: string;
    label: string;
}

export const useHelperProfile = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [animatedBalance, setAnimatedBalance] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { balance, username, avatar, isAuth, setAvatar } = useAuth();

    const MAX_FILE_SIZE: number = 2 * 1024 * 1024;
    const tabs: TabData[] = [
        { id: "profile", label: "Profile" },
        { id: "mrkt", label: "Mrkt" },
        { id: "settings", label: "Settings" }
    ];

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        if (!file.type.startsWith("image/")) return void toast.error("only images are accepted");
        if (file.size > MAX_FILE_SIZE) return void toast.error("the file is too big");
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result
            if (typeof result === 'string') {
                setAvatar(result);
            }
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const step = Math.ceil(balance / (duration / stepTime));

        const interval = setInterval(() => {
            start += step;
            if (start >= balance) {
                start = balance;
                clearInterval(interval);
            }
            setAnimatedBalance(start);
        }, stepTime);

        return () => clearInterval(interval);
    }, [balance]);

    return { inputRef, animatedBalance, activeIndex, username, avatar, isAuth, tabs, handleChangeAvatar, setActiveIndex }
};