import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "./card.js";
import { cx } from "./cx.js";
const VALUE = { neutral: "text-ink", up: "text-up", down: "text-down" };
/**
 * Tile KPI, ricetta §2.5 di keshi-live (Mercato.tsx): label, valore, una riga di
 * spiegazione. `tone` colora solo il valore (segno o buono/cattivo). `style` serve
 * per `animationDelay` con `className="rise"` (§2.22). `testId` finisce sul valore,
 * che è l'unico output in sola lettura che i test del catalogo leggono.
 */
export function Stat({ label, value, caption, tone = "neutral", className, style, testId, }) {
    return (_jsxs(Card, { className: cx("p-4", className), style: style, children: [_jsx("div", { className: "eyebrow !text-[9px]", children: label }), _jsx("div", { "data-testid": testId, className: cx("tnum mt-2 font-serif text-[22px] font-semibold", VALUE[tone]), children: value }), caption ? _jsx("div", { className: "mt-1 text-[11px] text-muted2", children: caption }) : null] }));
}
