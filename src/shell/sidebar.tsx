"use client";

import Link from "next/link.js";
import type { ReactNode } from "react";
import { Overview, Materials, Tag, Swap, Bell, Gear, Upload, Cards, Send, Trash, Shield, Logout, type IconProps } from "../icons/index.js";

export type IconName = "overview" | "materials" | "tag" | "swap" | "bell" | "gear" | "upload" | "cards" | "send" | "trash" | "shield" | "logout";
// Le voci arrivano spesso da un server component: l'icona è un NOME serializzabile, risolto qui.
const ICONS: Record<IconName, (p: IconProps) => React.JSX.Element> = { overview: Overview, materials: Materials, tag: Tag, swap: Swap, bell: Bell, gear: Gear, upload: Upload, cards: Cards, send: Send, trash: Trash, shield: Shield, logout: Logout };

export type SidebarItem = { label: string; href: string; icon: IconName; badge?: number; exact?: boolean };
export type SidebarSection = { label?: string; items: SidebarItem[] };
export type SidebarProps = { logo: ReactNode; logoHref?: string; sections: SidebarSection[]; footer?: ReactNode; pathname: string };

export function isActivePath(pathname: string, href: string, exact = false): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function SidebarNav({ section, pathname, className }: { section: SidebarSection; pathname: string; className: string }) {
  return (
    <nav aria-label={section.label} className={className}>
      {section.label && <div className="eyebrow mb-1 px-3">{section.label}</div>}
      {section.items.map(({ label, href, icon, badge, exact }) => {
        const Icon = ICONS[icon];
        const active = isActivePath(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`sidebar-link group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[13.5px] font-medium transition-[background-color,border-color,color] duration-300 ease-out ${active ? "glass text-ink dark:text-white" : "glass-hover text-muted hover:text-ink dark:text-white"}`}
          >
            <Icon className={`transition-colors duration-300 ease-out ${active ? "text-brand" : "text-muted2 group-hover:text-ink"}`} />
            <span className="flex-1">{label}</span>
            {badge != null && badge > 0 && (
              <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-down-soft px-1 text-[10.5px] font-semibold text-down">{badge}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ logo, logoHref = "/", sections, footer, pathname }: SidebarProps) {
  // Una sola sezione senza titolo: il <nav> È la colonna, senza contenitore intermedio.
  // Il wrapper con gap-5 serve solo a distanziare le sezioni, quindi solo quando sono più d'una.
  const single = sections.length === 1 && !sections[0].label;
  return (
    <aside className="hidden w-[230px] shrink-0 lg:block">
      <div className="sticky top-0 flex h-screen flex-col px-4 py-5">
        <Link href={logoHref} className="relative flex items-center px-1.5">{logo}</Link>
        {single ? (
          <SidebarNav section={sections[0]} pathname={pathname} className="relative mt-9 flex flex-1 flex-col gap-1" />
        ) : (
          <div className="relative mt-9 flex flex-1 flex-col gap-5">
            {sections.map((s, i) => (
              <SidebarNav key={s.label ?? i} section={s} pathname={pathname} className="flex flex-col gap-1" />
            ))}
          </div>
        )}
        {footer && <div className="mt-4 flex flex-col gap-3">{footer}</div>}
      </div>
    </aside>
  );
}
