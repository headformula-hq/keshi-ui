import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx.js";
const FILL = { brand: "bg-brand", up: "bg-up", gold: "bg-gold", down: "bg-down" };
/** Arrotonda e stringe a 0-100; NaN diventa 0 (mai `aria-valuenow="NaN"`). */
function clampPct(value) {
    const n = Math.round(Number.isNaN(value) ? 0 : value);
    return Math.min(100, Math.max(0, n));
}
/**
 * Barra di avanzamento, ricetta §2.14 di keshi-live (AvanzamentoCatalogo):
 * traccia `h-1.5 bg-surface2`, riempimento `bg-brand` con larghezza animata,
 * ARIA completa. `label` è il nome accessibile (aria-label). `tone` cambia solo
 * il colore del riempimento: up = pronto, gold = attenzione, down = errore.
 */
export function ProgressBar({ value, tone = "brand", label, className, }) {
    const v = clampPct(value);
    return (_jsx("div", { role: "progressbar", "aria-label": label, "aria-valuenow": v, "aria-valuemin": 0, "aria-valuemax": 100, className: cx("h-1.5 w-full overflow-hidden rounded-full bg-surface2", className), children: _jsx("div", { className: cx("h-full rounded-full transition-[width] duration-500", FILL[tone]), style: { width: `${v}%` } }) }));
}
