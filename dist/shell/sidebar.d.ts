import type { ReactNode } from "react";
export type IconName = "overview" | "materials" | "tag" | "swap" | "bell" | "gear" | "upload" | "cards" | "send" | "trash" | "shield" | "logout";
export type SidebarItem = {
    label: string;
    href: string;
    icon: IconName;
    badge?: number;
    exact?: boolean;
};
export type SidebarSection = {
    label?: string;
    items: SidebarItem[];
};
export type SidebarProps = {
    logo: ReactNode;
    logoHref?: string;
    sections: SidebarSection[];
    footer?: ReactNode;
    pathname: string;
};
export declare function isActivePath(pathname: string, href: string, exact?: boolean): boolean;
export declare function Sidebar({ logo, logoHref, sections, footer, pathname }: SidebarProps): import("react").JSX.Element;
