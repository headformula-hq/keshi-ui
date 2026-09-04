"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef } from "react";
// Primo elemento del footer che può ricevere il focus (i disabilitati non lo accettano).
const FOCUSABLE = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])";
/**
 * Finestra modale in-place (nessun portal), markup di keshi-live.
 * v0.2.0: al passaggio a `open` salva l'elemento attivo, porta il focus sul primo
 * focalizzabile del footer (fallback: la card, tabIndex=-1) e blocca lo scroll del
 * body; alla chiusura o allo smontaggio ripristina entrambi.
 */
export function Modal({ open, onClose, title, children, footer }) {
    const titleId = useId();
    const cardRef = useRef(null);
    const footerRef = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => { if (e.key === "Escape")
            onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    // Dipende SOLO da `open`: un `onClose` ricreato a ogni render del padre non deve
    // rimbalzare il focus né toccare l'overflow.
    useEffect(() => {
        if (!open)
            return;
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const target = footerRef.current?.querySelector(FOCUSABLE) ?? cardRef.current;
        target?.focus();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
            previous?.focus();
        };
    }, [open]);
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 grid place-items-center p-4", children: [_jsx("div", { "data-testid": "modal-veil", "aria-hidden": true, onClick: onClose, className: "absolute inset-0 bg-black/30 backdrop-blur-sm" }), _jsxs("div", { ref: cardRef, tabIndex: -1, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, className: "card pop-in relative w-full max-w-[520px] p-6 outline-none", children: [_jsx("h2", { id: titleId, className: "font-serif text-[22px] font-semibold text-ink", children: title }), _jsx("div", { className: "mt-3 text-[13.5px] leading-relaxed text-ink-soft", children: children }), footer && _jsx("div", { ref: footerRef, className: "mt-6 flex justify-end gap-2", children: footer })] })] }));
}
