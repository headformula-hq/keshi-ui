import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx";
export function Card({ children, className, variant = "flat", hover = false, as = "div", style, }) {
    const Tag = as;
    return (_jsx(Tag, { style: style, className: cx(variant === "glass" ? "glass rounded-[var(--radius-card)]" : "card", hover ? "card-hover" : variant === "flat" ? "card-static" : null, className), children: children }));
}
