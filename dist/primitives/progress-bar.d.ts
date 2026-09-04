export type ProgressBarTone = "brand" | "up" | "gold" | "down";
/**
 * Barra di avanzamento, ricetta §2.14 di keshi-live (AvanzamentoCatalogo):
 * traccia `h-1.5 bg-surface2`, riempimento `bg-brand` con larghezza animata,
 * ARIA completa. `label` è il nome accessibile (aria-label). `tone` cambia solo
 * il colore del riempimento: up = pronto, gold = attenzione, down = errore.
 */
export declare function ProgressBar({ value, tone, label, className, }: {
    value: number;
    tone?: ProgressBarTone;
    label: string;
    className?: string;
}): import("react").JSX.Element;
