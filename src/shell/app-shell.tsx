"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Sidebar, type SidebarProps } from "./sidebar.js";
import { Topbar } from "./topbar.js";

export function AppShell({
  sidebar, topbar, children,
}: {
  sidebar: Omit<SidebarProps, "pathname"> & { pathname?: string };
  topbar?: { search?: ReactNode; actions?: ReactNode };
  children: ReactNode;
}) {
  const current = usePathname();
  const pathname = sidebar.pathname ?? current ?? "/";
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar {...sidebar} pathname={pathname} />
      <main className="flex min-w-0 flex-1 flex-col px-3 pb-3 lg:pl-0">
        <div className="shrink-0 pt-3 pb-3"><Topbar {...topbar} /></div>
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto rounded-[26px] border border-line/60 bg-[#fbfcfd] p-6 dark:bg-bg">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
