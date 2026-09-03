import type { ReactNode } from "react";
import { type SidebarProps } from "./sidebar.js";
export declare function AppShell({ sidebar, topbar, children, }: {
    sidebar: Omit<SidebarProps, "pathname"> & {
        pathname?: string;
    };
    topbar?: {
        search?: ReactNode;
        actions?: ReactNode;
    };
    children: ReactNode;
}): import("react").JSX.Element;
