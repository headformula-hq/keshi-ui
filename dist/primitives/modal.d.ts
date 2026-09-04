import { type ReactNode } from "react";
/**
 * Finestra modale in-place (nessun portal), markup di keshi-live.
 * v0.2.0: al passaggio a `open` salva l'elemento attivo, porta il focus sul primo
 * focalizzabile del footer (fallback: la card, tabIndex=-1) e blocca lo scroll del
 * body; alla chiusura o allo smontaggio ripristina entrambi.
 */
export declare function Modal({ open, onClose, title, children, footer }: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}): import("react").JSX.Element | null;
