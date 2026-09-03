import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LiveBadge({ live, liveLabel = "Dati live", demoLabel = "Demo", title }) {
    return (_jsxs("span", { title: title, className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${live ? "bg-up-soft text-up" : "bg-surface2 text-muted"}`, children: [_jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [live && _jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-70" }), _jsx("span", { className: `relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-up" : "bg-muted2"}` })] }), live ? liveLabel : demoLabel] }));
}
