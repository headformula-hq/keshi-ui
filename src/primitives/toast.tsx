"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type Tone = "neutral" | "up" | "down";
type ToastInput = { title: string; description?: string; tone?: Tone };
type ToastItem = ToastInput & { id: number };

const Ctx = createContext<{ push: (t: ToastInput) => void } | null>(null);
const TONE: Record<Tone, string> = { neutral: "border-line", up: "border-up/40", down: "border-down/40" };
const TTL_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);
  const push = useCallback((t: ToastInput) => {
    const id = ++seq.current;
    setItems((xs) => [...xs, { ...t, id }]);
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), TTL_MS);
  }, []);
  const value = useMemo(() => ({ push }), [push]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[320px] flex-col gap-2">
        {items.map((t) => (
          <div key={t.id} role="status" className={`glass pop-in pointer-events-auto rounded-2xl border px-4 py-3 ${TONE[t.tone ?? "neutral"]}`}>
            <div className="text-[13px] font-semibold text-ink">{t.title}</div>
            {t.description && <div className="mt-0.5 text-[12px] text-muted">{t.description}</div>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast va usato dentro <ToastProvider>");
  return ctx;
}
