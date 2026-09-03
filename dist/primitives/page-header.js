import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function PageHeader({ eyebrow, title, italic, right }) {
    return (_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 pb-7", children: [_jsxs("div", { children: [eyebrow && _jsx("div", { className: "eyebrow mb-3", children: eyebrow }), _jsxs("h1", { className: "font-serif text-[32px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[38px]", children: [title, italic && (_jsxs(_Fragment, { children: [" ", _jsx("em", { className: "font-normal italic text-ink-soft", children: italic })] }))] })] }), right && _jsx("div", { className: "text-right", children: right })] }));
}
