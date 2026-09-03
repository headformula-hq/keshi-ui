import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, italic, right }: { eyebrow?: string; title: string; italic?: string; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-7">
      <div>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h1 className="font-serif text-[32px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[38px]">
          {title}
          {italic && (<>{" "}<em className="font-normal italic text-ink-soft">{italic}</em></>)}
        </h1>
      </div>
      {right && <div className="text-right">{right}</div>}
    </div>
  );
}
