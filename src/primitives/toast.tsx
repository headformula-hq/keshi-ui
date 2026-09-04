"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { ExternalLink } from "../icons/index.js";

export type ToastTone = "neutral" | "up" | "down";
/** Link opzionale sotto la descrizione (es. "Vedi su Shopify"): si apre in una nuova scheda. */
export type ToastAction = { label: string; href: string };
export type ToastInput = { title: string; description?: string; tone?: ToastTone; action?: ToastAction };
type ToastItem = ToastInput & { id: number };

const Ctx = createContext<{ push: (t: ToastInput) => void } | null>(null);
const TONE: Record<ToastTone, string> = { neutral: "border-line", up: "border-up/40", down: "border-down/40" };
const TTL_MS = 4000;
const TTL_WITH_ACTION_MS = 6000; // con un link serve il tempo di leggerlo e cliccarlo

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);
  const push = useCallback((t: ToastInput) => {
    const id = ++seq.current;
    setItems((xs) => [...xs, { ...t, id }]);
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), t.action ? TTL_WITH_ACTION_MS : TTL_MS);
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
            {t.action && (
              <a
                href={t.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:underline"
              >
                {t.action.label} <ExternalLink width={11} height={11} aria-hidden />
              </a>
            )}
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
