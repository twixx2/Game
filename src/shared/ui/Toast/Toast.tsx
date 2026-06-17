import { useEffect } from "react";
import { motion } from "@shared/motion";
import type { ToastAction } from "./toast-service";
import s from "./toast.module.scss";

interface ToastProps {
    id: string;
    text: string;
    action?: ToastAction | undefined;
    onClose: (id: string) => void;
}

export const Toast = ({ id, text, action, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), 3000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    const handleActionClick = () => {
        action?.onClick();
        onClose(id);
    };

    return (
        <motion.div
            className={s.toast}
            layout
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <span className={s.text}>{text}</span>
            {action && (
                <button type="button" className={s.action} onClick={handleActionClick}>
                    {action.text}
                </button>
            )}
        </motion.div>
    );
};