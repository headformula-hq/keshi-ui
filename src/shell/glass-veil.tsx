/** Velo sfocato sopra lo sfondo animato, sotto la UI (da app/layout.tsx di keshi-live). */
export function GlassVeil() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] bg-white/10 backdrop-blur-md backdrop-saturate-150 dark:bg-black/25" />;
}
