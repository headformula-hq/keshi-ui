import { type ReactNode } from "react";
export type ToastTone = "neutral" | "up" | "down";
/** Link opzionale sotto la descrizione (es. "Vedi su Shopify"): si apre in una nuova scheda. */
export type ToastAction = {
    label: string;
    href: string;
};
export type ToastInput = {
    title: string;
    description?: string;
    tone?: ToastTone;
    action?: ToastAction;
};
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): {
    push: (t: ToastInput) => void;
};
