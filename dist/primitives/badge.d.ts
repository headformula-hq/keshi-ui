import type { ReactNode } from "react";
export type BadgeTone = "neutral" | "up" | "down" | "brand" | "gold";
export declare function Badge({ children, tone, className }: {
    children: ReactNode;
    tone?: BadgeTone;
    className?: string;
}): import("react").JSX.Element;
