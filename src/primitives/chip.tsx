"use client";

import type { ReactNode } from "react";
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
export function Chip({
  active = false, onClick, disabled, className, children, as = "button",
}: {
  active?: boolean; onClick?: () => void; disabled?: boolean; className?: string; children: ReactNode; as?: "button" | "span";
}) {
  const cls = cx("chip", active && "chip-active", className);
  if (as === "span") {
    return <span className={cls}>{children}</span>;
  }
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={cx(cls, "disabled:cursor-not-allowed disabled:opacity-50")}
    >
      {children}
    </button>
  );
}
