import type { ReactNode } from "react";
/**
 * Chip di filtro / scelta, ricetta §2.12 di keshi-live:
 * `<button type="button" aria-pressed class="chip chip-active">`.
 * `.chip` e `.chip-active` vivono in styles.css.
 *
 * as="span": chip non interattiva che ospita un bottone "Rimuovi" interno (§3.5);
 * niente aria-pressed perché non è un controllo.
 * Stato disabilitato: le stesse due utility di Button (`disabled:cursor-not-allowed
 * disabled:opacity-50`). `.chip` impone `cursor: pointer`, ma vive in
 * `@layer components` (v0.2.2), quindi la utility (layer utilities) vince.
 */
export declare function Chip({ active, onClick, disabled, className, children, as, }: {
    active?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
    as?: "button" | "span";
}): import("react").JSX.Element;
