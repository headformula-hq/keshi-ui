import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx.js";
export function Skeleton({ className, lines = 1 }) {
    return (_jsx("div", { "aria-hidden": "true", className: cx("flex flex-col gap-2", className), children: Array.from({ length: lines }, (_, i) => (_jsx("div", { className: "h-3 animate-pulse rounded-full bg-surface2", style: { width: `${100 - i * 12}%` } }, i))) }));
}
