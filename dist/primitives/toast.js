"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
const Ctx = createContext(null);
const TONE = { neutral: "border-line", up: "border-up/40", down: "border-down/40" };
const TTL_MS = 4000;
export function ToastProvider({ children }) {
    const [items, setItems] = useState([]);
    const seq = useRef(0);
    const push = useCallback((t) => {
        const id = ++seq.current;
        setItems((xs) => [...xs, { ...t, id }]);
        setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), TTL_MS);
    }, []);
    const value = useMemo(() => ({ push }), [push]);
    return (_jsxs(Ctx.Provider, { value: value, children: [children, _jsx("div", { className: "pointer-events-none fixed bottom-4 right-4 z-50 flex w-[320px] flex-col gap-2", children: items.map((t) => (_jsxs("div", { role: "status", className: `glass pop-in pointer-events-auto rounded-2xl border px-4 py-3 ${TONE[t.tone ?? "neutral"]}`, children: [_jsx("div", { className: "text-[13px] font-semibold text-ink", children: t.title }), t.description && _jsx("div", { className: "mt-0.5 text-[12px] text-muted", children: t.description })] }, t.id))) })] }));
}
export function useToast() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error("useToast va usato dentro <ToastProvider>");
    return ctx;
}
