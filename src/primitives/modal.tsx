"use client";

import { useEffect, useId, type ReactNode } from "react";

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div data-testid="modal-veil" aria-hidden onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="card pop-in relative w-full max-w-[520px] p-6">
        <h2 id={titleId} className="font-serif text-[22px] font-semibold text-ink">{title}</h2>
        <div className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
