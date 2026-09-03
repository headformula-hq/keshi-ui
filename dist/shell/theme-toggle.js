"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Sun, Moon } from "../icons/index.js";
/** Da inserire in <head> con dangerouslySetInnerHTML per evitare il flash del tema. */
export const THEME_INIT_SCRIPT = "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}";
export function ThemeToggle({ className = "" }) {
    const [dark, setDark] = useState(false);
    useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        }
        catch { /* ignore */ }
    };
    return (_jsxs("button", { type: "button", onClick: toggle, "aria-label": dark ? "Attiva tema chiaro" : "Attiva tema scuro", className: `glass glass-hover flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[12.5px] font-medium text-muted transition-[background-color,border-color,color] duration-300 ease-out hover:text-ink dark:text-white ${className}`, children: [dark ? _jsx(Sun, { width: 16, height: 16 }) : _jsx(Moon, { width: 16, height: 16 }), _jsx("span", { children: dark ? "Giorno" : "Notte" })] }));
}
