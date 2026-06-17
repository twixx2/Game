export interface ToastAction {
    text: string;
    onClick: () => void;
}

export interface ToastDetail {
    text: string;
    action?: ToastAction | undefined;
}

export const TOAST_EVENT = "custom-toast";

export const toast = (text: string, action?: ToastAction): void => {
    const detail: ToastDetail = action ? { text, action } : { text };
    window.dispatchEvent(new CustomEvent<ToastDetail>(TOAST_EVENT, { detail }));
};