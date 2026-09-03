# keshi-ui

Design system condiviso delle app Keshi: token Tailwind v4, font Creato Display, shell (sidebar + topbar + tema), primitive.

## Installazione
npm i keshi-ui@github:headformula-hq/keshi-ui#vX.Y.Z

## Cosa esporta

| Export | Contenuto | Uso |
|---|---|---|
| `keshi-ui` (`.`) | Primitive: `Card`, `PageHeader`, `Badge`, `LiveBadge`, `Button`, `Table`/`Th`/`Tr`/`Td`, `EmptyState`, `Skeleton`, `Modal`, `ToastProvider`/`useToast`, `cx` | `import { Button, Card } from "keshi-ui";` |
| `keshi-ui/shell` | `AppShell`, `Sidebar`, `Topbar`, `ThemeToggle`, `THEME_INIT_SCRIPT`, `ShaderBackground`, `GlassVeil`, `isActivePath`, tipi `IconName`/`SidebarItem`/`SidebarSection`/`SidebarProps` | `import { AppShell } from "keshi-ui/shell";` |
| `keshi-ui/icons` | Set di icone SVG (`Overview`, `Materials`, `Tag`, `Swap`, `Bell`, `Gear`, `Upload`, `Cards`, `Send`, `Trash`, `Shield`, `Logout`, `Sun`, `Moon`, ecc.) | `import { Overview } from "keshi-ui/icons";` |
| `keshi-ui/styles.css` | Token CSS (colori, spaziature) e utility condivise (`.glass`, `.sidebar-link`, `.eyebrow`, ecc.) | `@import "keshi-ui/styles.css";` in `app/globals.css` |
| `keshi-ui/fonts/*` | I file `.otf` di Creato Display | Referenziati da `localFont` nell'app: `../node_modules/keshi-ui/dist/fonts/*.otf` |

## Adottare in un'app

### 1. `app/globals.css`

I due `@import` iniziali restano dell'app ospite; il resto (token, utility) arriva dal pacchetto:

```css
@import "tailwindcss";
@import "keshi-ui/styles.css";
@source "../node_modules/keshi-ui/dist";
```

### 2. `app/layout.tsx`

> **Il font si dichiara nell'app, non nel pacchetto.** `next/font` pretende che il loader sia
> *chiamato* in module scope di un file dell'app (`Font loaders must be called and assigned to a
> const in the module scope`), quindi rifiuta qualunque wrapper-funzione importata da un pacchetto:
> per questo `keshi-ui/font` non esiste più. Il pacchetto continua a servire i `.otf` via
> `keshi-ui/fonts/*`; lo snippet qui sotto va copiato tale e quale in `app/layout.tsx`.

`THEME_INIT_SCRIPT` evita il flash del tema scuro leggendo `localStorage['theme']` prima dell'idratazione; `ShaderBackground` e `GlassVeil` vanno nel `<body>`, dietro alla UI:

```tsx
import localFont from "next/font/local";
import { THEME_INIT_SCRIPT, ShaderBackground, GlassVeil } from "keshi-ui/shell";

// I path sono relativi a questo file: da app/layout.tsx sono ../node_modules/keshi-ui/dist/fonts/*.otf
const creato = localFont({
  variable: "--font-creato",
  display: "swap",
  src: [
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Thin.otf", weight: "100", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-ThinItalic.otf", weight: "100", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Light.otf", weight: "300", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Bold.otf", weight: "700", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-Black.otf", weight: "900", style: "normal" },
    { path: "../node_modules/keshi-ui/dist/fonts/CreatoDisplay-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={creato.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ShaderBackground />
        <GlassVeil />
        {children}
      </body>
    </html>
  );
}
```

### 3. Shell (sidebar + topbar)

`AppShell` è un client component che gestisce layout, sidebar attiva (via `usePathname`) e topbar; le icone della sidebar si passano per **nome** (`IconName`), non per funzione, così anche un server component può descrivere la sidebar:

- `Sidebar`: con **una sola sezione senza titolo** il `<nav>` è direttamente la colonna (`relative mt-9 flex flex-1 flex-col gap-1`); il contenitore che distanzia le sezioni compare solo da due sezioni in su.
- `Topbar`: `search` e `actions` sono figli **diretti** dell'`<header>`. La larghezza la porta l'elemento di ricerca (es. `className="relative flex-1"`), la Topbar non aggiunge wrapper.

```tsx
import { AppShell, ThemeToggle } from "keshi-ui/shell";
import { Button } from "keshi-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      sidebar={{
        logo: <span>Keshi</span>,
        sections: [
          { items: [{ label: "Panoramica", href: "/", icon: "overview", exact: true }] },
        ],
        footer: <ThemeToggle />,
      }}
      topbar={{ actions: <Button>Nuovo</Button> }}
    >
      {children}
    </AppShell>
  );
}
```

## Rilasciare una nuova versione

```bash
# 1. versione SENZA tag (il tag deve arrivare dopo dist)
npm version 0.1.0 --no-git-tag-version
# 2. verifica + build
npm run release
# 3. un solo commit con versione e dist
git add -A && git commit -m "release: v0.1.0"
# 4. tag ANNOTATO e push esplicito
git tag -a v0.1.0 -m "v0.1.0" && git push origin main && git push origin v0.1.0
```
