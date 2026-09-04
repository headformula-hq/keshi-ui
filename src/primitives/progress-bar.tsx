import { cx } from "./cx.js";

export type ProgressBarTone = "brand" | "up" | "gold" | "down";
const FILL: Record<ProgressBarTone, string> = { brand: "bg-brand", up: "bg-up", gold: "bg-gold", down: "bg-down" };

/** Arrotonda e stringe a 0-100; NaN diventa 0 (mai `aria-valuenow="NaN"`). */
function clampPct(value: number): number {
  const n = Math.round(Number.isNaN(value) ? 0 : value);
  return Math.min(100, Math.max(0, n));
}

/**
 * Barra di avanzamento, ricetta §2.14 di keshi-live (AvanzamentoCatalogo):
 * traccia `h-1.5 bg-surface2`, riempimento `bg-brand` con larghezza animata,
 * ARIA completa. `label` è il nome accessibile (aria-label). `tone` cambia solo
 * il colore del riempimento: up = pronto, gold = attenzione, down = errore.
 */
export function ProgressBar({
  value, tone = "brand", label, className,
}: {
  value: number; tone?: ProgressBarTone; label: string; className?: string;
}) {
  const v = clampPct(value);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("h-1.5 w-full overflow-hidden rounded-full bg-surface2", className)}
    >
      <div className={cx("h-full rounded-full transition-[width] duration-500", FILL[tone])} style={{ width: `${v}%` }} />
    </div>
  );
}
