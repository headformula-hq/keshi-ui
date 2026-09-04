export type TabItem = {
    label: string;
    href?: string;
    active?: boolean;
    count?: number;
    onClick?: () => void;
};
/**
 * Riga di tab. Con `href` ogni voce è un `Link` di Next (soft-nav + prefetch, come la
 * Sidebar) con `aria-current="page"` sull'attiva (nav admin, filtri di stato di
 * Pubblica); senza `href` è un <button type="button"> con `aria-pressed`
 * (intervalli, selettori locali).
 * `count` si rende come « · N » preceduto da uno spazio reale, così il nome
 * accessibile è "In coda · 3" e non "In coda· 3".
 */
export declare function Tabs({ items, ariaLabel, className }: {
    items: TabItem[];
    ariaLabel?: string;
    className?: string;
}): import("react").JSX.Element;
