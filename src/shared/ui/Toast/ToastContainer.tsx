import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "@shared/motion";
import { Toast } from "./Toast";
import { TOAST_EVENT, type ToastAction, type ToastDetail } from "./toast-service";
import s from "./toast.module.scss";

const MAX_TOASTS = 4;

interface ToastItem {
    id: string;
    text: string;
    action?: ToastAction;
}

export const ToastContainer = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    useEffect(() => {
        const handleToast = (event: Event) => {
            const { text, action } = (event as CustomEvent<ToastDetail>).detail;
            const newToast: ToastItem = action
                ? { id: crypto.randomUUID(), text, action }
                : { id: crypto.randomUUID(), text };

            setToasts((prev) => [...prev, newToast].slice(-MAX_TOASTS));
        };

        window.addEventListener(TOAST_EVENT, handleToast);
        return () => window.removeEventListener(TOAST_EVENT, handleToast);
    }, []);

    return (
        <div className={s.container}>
            <AnimatePresence>
                {toasts.map(({ id, text, action }) => (
                    <Toast key={id} id={id} text={text} action={action} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
};