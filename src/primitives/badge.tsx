import type { ReactNode } from "react";
import { cx } from "./cx";

export type BadgeTone = "neutral" | "up" | "down" | "brand" | "gold";
const TONE: Record<BadgeTone, string> = {
  neutral: "bg-surface2 text-muted",
  up: "bg-up-soft text-up",
  down: "bg-down-soft text-down",
  brand: "bg-brand-soft text-brand",
  gold: "bg-gold-soft text-gold",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", TONE[tone], className)}>
      {children}
    </span>
  );
}
