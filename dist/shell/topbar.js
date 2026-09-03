import { jsxs as _jsxs } from "react/jsx-runtime";
// `search` e `actions` sono figli DIRETTI dell'header: nessun contenitore intermedio.
// La larghezza la porta l'elemento di ricerca (tipicamente `relative flex-1`), non la Topbar.
export function Topbar({ search, actions }) {
    return (_jsxs("header", { className: "flex items-center gap-2.5", children: [search, actions] }));
}
