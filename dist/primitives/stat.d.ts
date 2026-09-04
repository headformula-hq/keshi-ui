import type { CSSProperties, ReactNode } from "react";
export type StatTone = "neutral" | "up" | "down";
/**
 * Tile KPI, ricetta §2.5 di keshi-live (Mercato.tsx): label, valore, una riga di
 * spiegazione. `tone` colora solo il valore (segno o buono/cattivo). `style` serve
 * per `animationDelay` con `className="rise"` (§2.22). `testId` finisce sul valore,
 * che è l'unico output in sola lettura che i test del catalogo leggono.
 */
export declare function Stat({ label, value, caption, tone, className, style, testId, }: {
    label: string;
    value: ReactNode;
    caption?: ReactNode;
    tone?: StatTone;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}): import("react").JSX.Element;
