import type { ReactNode } from "react";

export function EmptyState({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-serif text-[24px] font-semibold leading-tight text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
