import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "./cx.js";
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
export function Field({ label, help, error, htmlFor, className, children, }) {
    return (_jsxs("div", { className: cx("flex flex-col gap-1 text-[12px] text-muted", className), children: [htmlFor ? (_jsxs(_Fragment, { children: [_jsx("label", { htmlFor: htmlFor, children: label }), children] })) : (_jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { children: label }), children] })), help && _jsx("span", { className: "text-[11px] text-muted2", children: help }), error && _jsx("span", { role: "alert", className: "text-[12px] text-down", children: error })] }));
}
