import type { ReactNode } from "react";
/**
 * Campo di form: etichetta + controllo, ricetta §2.10 di keshi-live
 * (label `flex flex-col gap-1 text-[12px] text-muted` che avvolge il controllo).
 *
 * `help` ed `error` sono fratelli della <label>, non figli: Testing Library
 * calcola il testo della label da tutti i suoi discendenti, e con l'aiuto dentro
 * `getByLabelText("Nome")` (match esatto) non troverebbe più il controllo.
 *
 * `htmlFor`: il wrapper diventa un <div> con <label for> separata; serve quando il
 * controllo porta un `aria-label` proprio (es. select disabilitata "fissa per
 * FatturaPA") o quando non deve stare dentro una label.
 */
export declare function Field({ label, help, error, htmlFor, className, children, }: {
    label: string;
    help?: string;
    error?: string | null;
    htmlFor?: string;
    className?: string;
    children: ReactNode;
}): import("react").JSX.Element;
