import type { ButtonHTMLAttributes } from "react";
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export declare function Button({ variant, size, className, type, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: "sm" | "md";
}): import("react").JSX.Element;
