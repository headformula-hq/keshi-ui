import type { CSSProperties, ReactNode } from "react";
import { Card } from "./card.js";
import { cx } from "./cx.js";

export type StatTone = "neutral" | "up" | "down";
const VALUE: Record<StatTone, string> = { neutral: "text-ink", up: "text-up", down: "text-down" };

/**
 * Tile KPI, ricetta §2.5 di keshi-live (Mercato.tsx): label, valore, una riga di
 * spiegazione. `tone` colora solo il valore (segno o buono/cattivo). `style` serve
 * per `animationDelay` con `className="rise"` (§2.22). `testId` finisce sul valore,
 * che è l'unico output in sola lettura che i test del catalogo leggono.
 */
export function Stat({
  label, value, caption, tone = "neutral", className, style, testId,
}: {
  label: string; value: ReactNode; caption?: ReactNode; tone?: StatTone;
  className?: string; style?: CSSProperties; testId?: string;
}) {
  return (
    <Card className={cx("p-4", className)} style={style}>
      <div className="eyebrow !text-[9px]">{label}</div>
      <div data-testid={testId} className={cx("tnum mt-2 font-serif text-[22px] font-semibold", VALUE[tone])}>{value}</div>
      {caption && <div className="mt-1 text-[11px] text-muted2">{caption}</div>}
    </Card>
  );
}
