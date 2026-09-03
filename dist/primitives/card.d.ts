import type { CSSProperties, ReactNode } from "react";
export declare function Card({ children, className, variant, hover, as, style, }: {
    children: ReactNode;
    className?: string;
    variant?: "flat" | "glass";
    hover?: boolean;
    as?: "div" | "section" | "article";
    style?: CSSProperties;
}): import("react").JSX.Element;
