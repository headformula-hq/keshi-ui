import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx.js";
/**
 * Classe del controllo di form, ricetta §2.10 di keshi-live
 * (`rounded-xl border border-line/60 bg-transparent p-2.5 text-ink`) più il corpo
 * §2.21 `text-[13.5px]`, il focus della casa (`focus:border-brand/50`, quindi
 * `outline-none` al posto dell'anello globale) e lo stato disabilitato.
 * Esportata perché i compositi del catalogo (campo editabile, mapping colonne)
 * possono doverla applicare a un controllo nativo proprio.
 */
export const FIELD_CLASS = "rounded-xl border border-line/60 bg-transparent p-2.5 text-[13.5px] text-ink outline-none focus:border-brand/50 disabled:opacity-50";
export function Input({ className, ...rest }) {
    return _jsx("input", { className: cx(FIELD_CLASS, className), ...rest });
}
export function Select({ className, ...rest }) {
    return _jsx("select", { className: cx(FIELD_CLASS, className), ...rest });
}
export function Textarea({ className, ...rest }) {
    return _jsx("textarea", { className: cx(FIELD_CLASS, "min-h-[120px] leading-relaxed resize-y", className), ...rest });
}
