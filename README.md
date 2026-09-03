# keshi-ui

Design system condiviso delle app Keshi: token Tailwind v4, font Creato Display, shell (sidebar + topbar + tema), primitive.

## Installazione
npm i keshi-ui@github:headformula-hq/keshi-ui#vX.Y.Z

## Uso
1. `app/globals.css`: `@import "tailwindcss"; @import "keshi-ui/styles.css"; @source "../node_modules/keshi-ui/dist";`
2. `app/layout.tsx`: `const creato = createCreatoFont()` da `keshi-ui/font`, classe `creato.variable` su `<html>`, `THEME_INIT_SCRIPT` in `<head>`, `<ShaderBackground />` + `<GlassVeil />` in `<body>`.
3. Shell: `<AppShell sidebar={{ items, logo, footer }} topbar={{ search, actions }}>{children}</AppShell>` da `keshi-ui/shell`.

## Rilascio
Vedi sezione "Rilasciare" in fondo (stessa procedura di keshi-auth).
