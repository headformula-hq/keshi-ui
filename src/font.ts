import localFont from "next/font/local";

/**
 * Carica Creato Display con tutti i pesi e lo espone come variabile CSS
 * `--font-creato`, che `styles.css` usa per `--font-sans` e `--font-serif`.
 * Va chiamata in un module scope del layout radice (vincolo di next/font).
 */
export function createCreatoFont() {
  return localFont({
    variable: "--font-creato",
    display: "swap",
    src: [
      { path: "./fonts/CreatoDisplay-Thin.otf", weight: "100", style: "normal" },
      { path: "./fonts/CreatoDisplay-ThinItalic.otf", weight: "100", style: "italic" },
      { path: "./fonts/CreatoDisplay-Light.otf", weight: "300", style: "normal" },
      { path: "./fonts/CreatoDisplay-LightItalic.otf", weight: "300", style: "italic" },
      { path: "./fonts/CreatoDisplay-Regular.otf", weight: "400", style: "normal" },
      { path: "./fonts/CreatoDisplay-RegularItalic.otf", weight: "400", style: "italic" },
      { path: "./fonts/CreatoDisplay-Medium.otf", weight: "500", style: "normal" },
      { path: "./fonts/CreatoDisplay-MediumItalic.otf", weight: "500", style: "italic" },
      { path: "./fonts/CreatoDisplay-Bold.otf", weight: "700", style: "normal" },
      { path: "./fonts/CreatoDisplay-BoldItalic.otf", weight: "700", style: "italic" },
      { path: "./fonts/CreatoDisplay-ExtraBold.otf", weight: "800", style: "normal" },
      { path: "./fonts/CreatoDisplay-ExtraBoldItalic.otf", weight: "800", style: "italic" },
      { path: "./fonts/CreatoDisplay-Black.otf", weight: "900", style: "normal" },
      { path: "./fonts/CreatoDisplay-BlackItalic.otf", weight: "900", style: "italic" },
    ],
  });
}
