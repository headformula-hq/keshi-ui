// @vitest-environment node
//
// Richiede `dist/` già costruita (come dist-imports.test.ts): npm run build && npm test.
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("./LICENSE-CreatoDisplay.txt", import.meta.url));
const DIST = fileURLToPath(new URL("../../dist/fonts/LICENSE-CreatoDisplay.txt", import.meta.url));

describe("licenza del font Creato Display (SIL OFL 1.1)", () => {
  it("sta accanto agli .otf in src/fonts, con copyright e Reserved Font Name", () => {
    expect(existsSync(SRC), `${SRC} mancante`).toBe(true);
    const testo = readFileSync(SRC, "utf8");
    expect(testo).toContain("SIL Open Font License, Version 1.1");
    expect(testo).toContain("Reserved Font Name 'Creato Display'");
    expect(testo).toContain("Anugrah Pasau");
  });

  it("la build la copia in dist/fonts accanto agli .otf (export keshi-ui/fonts/*), identica", () => {
    expect(existsSync(DIST), `${DIST} mancante: esegui npm run build`).toBe(true);
    expect(readFileSync(DIST, "utf8")).toBe(readFileSync(SRC, "utf8"));
  });
});
