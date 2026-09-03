import type { CSSProperties, ReactNode } from "react";
import { cx } from "./cx";

export function Card({
  children, className, variant = "flat", hover = false, as = "div", style,
}: {
  children: ReactNode; className?: string; variant?: "flat" | "glass"; hover?: boolean;
  as?: "div" | "section" | "article"; style?: CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag
      style={style}
      className={cx(
        variant === "glass" ? "glass rounded-[var(--radius-card)]" : "card",
        hover ? "card-hover" : variant === "flat" ? "card-static" : null,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
