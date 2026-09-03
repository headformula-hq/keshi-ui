"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
export function AppShell({ sidebar, topbar, children, }) {
    const current = usePathname();
    const pathname = sidebar.pathname ?? current ?? "/";
    return (_jsxs("div", { className: "flex h-screen overflow-hidden", children: [_jsx(Sidebar, { ...sidebar, pathname: pathname }), _jsxs("main", { className: "flex min-w-0 flex-1 flex-col px-3 pb-3 lg:pl-0", children: [_jsx("div", { className: "shrink-0 pt-3 pb-3", children: _jsx(Topbar, { ...topbar }) }), _jsx("div", { className: "no-scrollbar min-h-0 flex-1 overflow-y-auto rounded-[26px] border border-line/60 bg-[#fbfcfd] p-6 dark:bg-bg", children: _jsx("div", { className: "mx-auto max-w-[1180px]", children: children }) })] })] }));
}
