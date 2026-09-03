"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId } from "react";
export function Modal({ open, onClose, title, children, footer }) {
    const titleId = useId();
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => { if (e.key === "Escape")
            onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 grid place-items-center p-4", children: [_jsx("div", { "data-testid": "modal-veil", "aria-hidden": true, onClick: onClose, className: "absolute inset-0 bg-black/30 backdrop-blur-sm" }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, className: "card pop-in relative w-full max-w-[520px] p-6", children: [_jsx("h2", { id: titleId, className: "font-serif text-[22px] font-semibold text-ink", children: title }), _jsx("div", { className: "mt-3 text-[13.5px] leading-relaxed text-ink-soft", children: children }), footer && _jsx("div", { className: "mt-6 flex justify-end gap-2", children: footer })] })] }));
}
