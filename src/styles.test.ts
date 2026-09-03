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
  it("NON importa tailwind né keshi-auth (lo fa l'app ospite)", () => {
    expect(css).not.toContain('@import "tailwindcss"');
    expect(css).not.toContain("keshi-auth");
  });
});
