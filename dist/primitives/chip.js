"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx.js";
/**
 * Chip di filtro / scelta, ricetta §2.12 di keshi-live:
 * `<button type="button" aria-pressed class="chip chip-active">`.
 * `.chip` e `.chip-active` vivono in styles.css.
 *
 * as="span": chip non interattiva che ospita un bottone "Rimuovi" interno (§3.5);
 * niente aria-pressed perché non è un controllo.
 * Stato disabilitato: le stesse due utility di Button (`disabled:cursor-not-allowed
 * disabled:opacity-50`), perché `.chip` impone `cursor: pointer`.
 */
export function Chip({ active = false, onClick, disabled, className, children, as = "button", }) {
    const cls = cx("chip", active && "chip-active", className);
    if (as === "span") {
        return _jsx("span", { className: cls, children: children });
    }
    return (_jsx("button", { type: "button", "aria-pressed": active, onClick: onClick, disabled: disabled, className: cx(cls, "disabled:cursor-not-allowed disabled:opacity-50"), children: children }));
}
