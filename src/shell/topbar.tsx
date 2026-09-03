import type { ReactNode } from "react";

export function Topbar({ search, actions }: { search?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex items-center gap-2.5">
      <div className="min-w-0 flex-1">{search}</div>
      {actions}
    </header>
  );
}
