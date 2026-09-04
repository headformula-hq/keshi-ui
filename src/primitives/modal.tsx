"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

// Primo elemento del footer che può ricevere il focus (i disabilitati non lo accettano).
const FOCUSABLE = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])";

/**
 * Finestra modale in-place (nessun portal), markup di keshi-live.
 * v0.2.0: al passaggio a `open` salva l'elemento attivo, porta il focus sul primo
 * focalizzabile del footer (fallback: la card, tabIndex=-1) e blocca lo scroll del
 * body; alla chiusura o allo smontaggio ripristina entrambi.
 */
export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Dipende SOLO da `open`: un `onClose` ricreato a ogni render del padre non deve
  // rimbalzare il focus né toccare l'overflow.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const target = footerRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? cardRef.current;
    target?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div data-testid="modal-veil" aria-hidden onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="card pop-in relative w-full max-w-[520px] p-6 outline-none"
      >
        <h2 id={titleId} className="font-serif text-[22px] font-semibold text-ink">{title}</h2>
        <div className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{children}</div>
        {footer && <div ref={footerRef} className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
