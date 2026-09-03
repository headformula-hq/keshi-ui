import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState({ eyebrow, title, description, action }) {
    return (_jsxs("div", { className: "card flex flex-col items-center px-6 py-12 text-center", children: [eyebrow && _jsx("div", { className: "eyebrow mb-3", children: eyebrow }), _jsx("h2", { className: "font-serif text-[24px] font-semibold leading-tight text-ink", children: title }), description && _jsx("p", { className: "mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-muted", children: description }), action && _jsx("div", { className: "mt-6", children: action })] }));
}
