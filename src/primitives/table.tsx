import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cx } from "./cx.js";

export function Table({ children, minWidth = 640, className }: { children: ReactNode; minWidth?: number; className?: string }) {
  return (
    <div className={cx("overflow-x-auto", className)}>
      <table className="w-full text-left" style={{ minWidth }}>{children}</table>
    </div>
  );
}
export function Th({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" className={cx("eyebrow border-b border-line px-5 pb-2.5 font-semibold", className)} {...rest} />;
}
export function Tr({ hover = false, className, ...rest }: HTMLAttributes<HTMLTableRowElement> & { hover?: boolean }) {
  return <tr className={cx("border-b border-line last:border-0 transition-colors", hover && "hover:bg-surface2", className)} {...rest} />;
}
export function Td({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx("px-5 py-3.5 text-[13px] text-ink", className)} {...rest} />;
}
