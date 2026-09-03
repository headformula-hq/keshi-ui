/**
 * Carica Creato Display con tutti i pesi e lo espone come variabile CSS
 * `--font-creato`, che `styles.css` usa per `--font-sans` e `--font-serif`.
 * Va chiamata in un module scope del layout radice (vincolo di next/font).
 */
export declare function createCreatoFont(): import("next/dist/compiled/@next/font").NextFontWithVariable;
