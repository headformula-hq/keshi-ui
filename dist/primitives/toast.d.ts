import { type ReactNode } from "react";
type Tone = "neutral" | "up" | "down";
type ToastInput = {
    title: string;
    description?: string;
    tone?: Tone;
};
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): {
    push: (t: ToastInput) => void;
};
export {};
