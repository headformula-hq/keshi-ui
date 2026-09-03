import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Topbar({ search, actions }) {
    return (_jsxs("header", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "min-w-0 flex-1", children: search }), actions] }));
}
