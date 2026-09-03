import { cx } from "./cx.js";

export function Skeleton({ className, lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div aria-hidden="true" className={cx("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-3 animate-pulse rounded-full bg-surface2" style={{ width: `${100 - i * 12}%` }} />
      ))}
    </div>
  );
}
