import { type ReactNode } from "react";
export declare function Modal({ open, onClose, title, children, footer }: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}): import("react").JSX.Element | null;
