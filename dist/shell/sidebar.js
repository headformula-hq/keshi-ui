"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
import { Overview, Materials, Tag, Swap, Bell, Gear, Upload, Cards, Send, Trash, Shield, Logout } from "../icons/index.js";
// Le voci arrivano spesso da un server component: l'icona è un NOME serializzabile, risolto qui.
const ICONS = { overview: Overview, materials: Materials, tag: Tag, swap: Swap, bell: Bell, gear: Gear, upload: Upload, cards: Cards, send: Send, trash: Trash, shield: Shield, logout: Logout };
export function isActivePath(pathname, href, exact = false) {
    if (exact)
        return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
}
function SidebarNav({ section, pathname, className }) {
    return (_jsxs("nav", { "aria-label": section.label, className: className, children: [section.label && _jsx("div", { className: "eyebrow mb-1 px-3", children: section.label }), section.items.map(({ label, href, icon, badge, exact }) => {
                const Icon = ICONS[icon];
                const active = isActivePath(pathname, href, exact);
                return (_jsxs(Link, { href: href, "aria-current": active ? "page" : undefined, className: `sidebar-link group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[13.5px] font-medium transition-[background-color,border-color,color] duration-300 ease-out ${active ? "glass text-ink dark:text-white" : "glass-hover text-muted hover:text-ink dark:text-white"}`, children: [_jsx(Icon, { className: `transition-colors duration-300 ease-out ${active ? "text-brand" : "text-muted2 group-hover:text-ink"}` }), _jsx("span", { className: "flex-1", children: label }), badge != null && badge > 0 && (_jsx("span", { className: "grid h-[18px] min-w-[18px] place-items-center rounded-full bg-down-soft px-1 text-[10.5px] font-semibold text-down", children: badge }))] }, href));
            })] }));
}
export function Sidebar({ logo, logoHref = "/", sections, footer, pathname }) {
    // Una sola sezione senza titolo: il <nav> È la colonna, senza contenitore intermedio.
    // Il wrapper con gap-5 serve solo a distanziare le sezioni, quindi solo quando sono più d'una.
    const single = sections.length === 1 && !sections[0].label;
    return (_jsx("aside", { className: "hidden w-[230px] shrink-0 lg:block", children: _jsxs("div", { className: "sticky top-0 flex h-screen flex-col px-4 py-5", children: [_jsx(Link, { href: logoHref, className: "relative flex items-center px-1.5", children: logo }), single ? (_jsx(SidebarNav, { section: sections[0], pathname: pathname, className: "relative mt-9 flex flex-1 flex-col gap-1" })) : (_jsx("div", { className: "relative mt-9 flex flex-1 flex-col gap-5", children: sections.map((s, i) => (_jsx(SidebarNav, { section: s, pathname: pathname, className: "flex flex-col gap-1" }, s.label ?? i))) })), footer && _jsx("div", { className: "mt-4 flex flex-col gap-3", children: footer })] }) }));
}
