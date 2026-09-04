"use client";

import Link from "next/link.js";
import { cx } from "./cx.js";

export type TabItem = { label: string; href?: string; active?: boolean; count?: number; onClick?: () => void };

// Ricetta §2.13 di keshi-live (MainChartCard): tab nude, cambiano solo peso e colore.
const TAB = "px-2.5 py-1 text-[12px] transition-colors duration-300 ease-out";
const TAB_ON = "font-semibold text-ink";
const TAB_OFF = "font-medium text-muted2 hover:text-ink";

/**
 * Riga di tab. Con `href` ogni voce è un `Link` di Next (soft-nav + prefetch, come la
 * Sidebar) con `aria-current="page"` sull'attiva (nav admin, filtri di stato di
 * Pubblica); senza `href` è un <button type="button"> con `aria-pressed`
 * (intervalli, selettori locali).
 * `count` si rende come « · N » preceduto da uno spazio reale, così il nome
 * accessibile è "In coda · 3" e non "In coda· 3".
 */
export function Tabs({ items, ariaLabel, className }: { items: TabItem[]; ariaLabel?: string; className?: string }) {
  return (
    <nav aria-label={ariaLabel} className={cx("flex items-center gap-1", className)}>
      {items.map((item) => {
        const cls = cx(TAB, item.active ? TAB_ON : TAB_OFF);
        const inner = (
          <>
            {item.label}
            {item.count != null && (
              <>
                {" "}
                <span className="tnum text-muted2">· {item.count}</span>
              </>
            )}
          </>
        );
        return item.href ? (
          <Link key={item.href} href={item.href} aria-current={item.active ? "page" : undefined} className={cls}>
            {inner}
          </Link>
        ) : (
          <button key={item.label} type="button" aria-pressed={!!item.active} onClick={item.onClick} className={cls}>
            {inner}
          </button>
        );
      })}
    </nav>
  );
}
