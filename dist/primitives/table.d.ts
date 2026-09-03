import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
export declare function Table({ children, minWidth, className }: {
    children: ReactNode;
    minWidth?: number;
    className?: string;
}): import("react").JSX.Element;
export declare function Th({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>): import("react").JSX.Element;
export declare function Tr({ hover, className, ...rest }: HTMLAttributes<HTMLTableRowElement> & {
    hover?: boolean;
}): import("react").JSX.Element;
export declare function Td({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>): import("react").JSX.Element;
