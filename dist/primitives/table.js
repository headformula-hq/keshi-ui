import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "./cx.js";
export function Table({ children, minWidth = 640, className }) {
    return (_jsx("div", { className: cx("overflow-x-auto", className), children: _jsx("table", { className: "w-full text-left", style: { minWidth }, children: children }) }));
}
export function Th({ className, ...rest }) {
    return _jsx("th", { scope: "col", className: cx("eyebrow border-b border-line px-5 pb-2.5 font-semibold", className), ...rest });
}
export function Tr({ hover = false, className, ...rest }) {
    return _jsx("tr", { className: cx("border-b border-line last:border-0 transition-colors", hover && "hover:bg-surface2", className), ...rest });
}
export function Td({ className, ...rest }) {
    return _jsx("td", { className: cx("px-5 py-3.5 text-[13px] text-ink", className), ...rest });
}
