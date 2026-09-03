"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "../icons/index.js";

/** Da inserire in <head> con dangerouslySetInnerHTML per evitare il flash del tema. */
export const THEME_INIT_SCRIPT =
  "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* ignore */ }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      className={`glass glass-hover flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[12.5px] font-medium text-muted transition-[background-color,border-color,color] duration-300 ease-out hover:text-ink dark:text-white ${className}`}
    >
      {dark ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
      <span>{dark ? "Giorno" : "Notte"}</span>
    </button>
  );
}
