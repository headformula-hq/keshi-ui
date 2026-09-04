// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("styles.css", () => {
  it("definisce i token del design system nel blocco @theme", () => {
    for (const t of ["--color-ink", "--color-brand", "--color-up", "--color-down", "--color-muted2", "--color-line-strong", "--color-surface2", "--color-gold-soft", "--radius-card", "--font-sans", "--font-serif"]) {
      expect(css, t).toContain(`${t}:`);
    }
    expect(css).toContain("@theme {");
    expect(css).toContain('@custom-variant dark (&:where(.dark, .dark *));');
  });
  it("definisce la palette scura sotto html.dark", () => {
    expect(css).toMatch(/html\.dark\s*\{[^}]*--color-bg:\s*#0e0e0f/);
  });
  it("espone le utility di progetto", () => {
    for (const u of [".glass", ".glass-hover:hover", ".eyebrow", ".tnum", ".card", ".card-hover", ".chip", ".sidebar-link:focus-visible", ".no-scrollbar", ".rise", ".pop-in"]) {
      expect(css, u).toContain(u);
    }
  });
  it("le classi vivono in un unico @layer components (le utility devono batterle)", () => {
    const open = css.indexOf("@layer components {");
    expect(open).toBeGreaterThan(-1);
    expect(css.indexOf("@layer components {", open + 1)).toBe(-1);
    // chiusura del blocco: brace matching dal primo `{`
    let depth = 0;
    let close = -1;
    for (let i = css.indexOf("{", open); i < css.length; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}" && --depth === 0) { close = i; break; }
    }
    expect(close).toBeGreaterThan(open);
    for (const rule of [".card {", ".glass {", ".glass-hover {", ".glass-hover:hover {", ".chip {", ".eyebrow {", ".tnum {", ".no-scrollbar {", ".rise {", ".pop-in {", ".sidebar-link:focus-visible {", "html.dark .glass {"]) {
      const idx = css.indexOf(rule);
      expect(idx, `${rule} presente`).toBeGreaterThan(-1);
      expect(idx, `${rule} dentro @layer components`).toBeGreaterThan(open);
      expect(idx, `${rule} prima della chiusura del layer`).toBeLessThan(close);
    }
    // .glass-hover (riposo, bordo trasparente) precede .glass: ThemeToggle ha entrambe.
    expect(css.indexOf(".glass-hover {")).toBeLessThan(css.indexOf(".glass {"));
    // fuori layer: token, variante dark, keyframes, html/body, focus ring in base
    for (const outside of ["@theme {", "@custom-variant dark", "@keyframes rise", "@keyframes pop-in", "@layer base {", "html.dark {"]) {
      const idx = css.indexOf(outside);
      expect(idx, `${outside} fuori da @layer components`).toBeLessThan(open);
    }
  });
  it("NON importa tailwind né keshi-auth (lo fa l'app ospite)", () => {
    expect(css).not.toContain('@import "tailwindcss"');
    expect(css).not.toContain("keshi-auth");
  });
});
