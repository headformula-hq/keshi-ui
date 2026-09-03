"use client";

import type { ButtonHTMLAttributes } from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-ink text-surface hover:opacity-90 dark:bg-white dark:text-ink",
  secondary: "border border-line bg-surface text-ink hover:border-line-strong",
  ghost: "text-muted hover:text-ink hover:bg-surface2",
  danger: "bg-down-soft text-down hover:opacity-90",
};
const SIZE = { sm: "px-3 py-1.5 text-[12px]", md: "px-4 py-2 text-[13px]" } as const;

export function Button({ variant = "primary", size = "md", className, type = "button", ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md" }) {
  return (
    <button
      type={type}
      className={cx("inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-50", VARIANT[variant], SIZE[size], className)}
      {...rest}
    />
  );
}
