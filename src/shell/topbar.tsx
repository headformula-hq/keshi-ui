import type { ReactNode } from "react";

// `search` e `actions` sono figli DIRETTI dell'header: nessun contenitore intermedio.
// La larghezza la porta l'elemento di ricerca (tipicamente `relative flex-1`), non la Topbar.
export function Topbar({ search, actions }: { search?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex items-center gap-2.5">
      {search}
      {actions}
    </header>
  );
}
