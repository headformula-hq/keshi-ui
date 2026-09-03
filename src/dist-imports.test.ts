// @vitest-environment node
//
// GUARDIA DI REGRESSIONE — richiede `dist/` già costruita: esegui `npm run build`
// prima di questo test (lo fa `npm run release`; in locale: npm run build && npm test).
//
// Perché esiste: tsc non riscrive gli specificatori di modulo. Se un sorgente in `src/`
// importa "./primitives/card" (senza estensione), la dist emette lo stesso specificatore:
// Turbopack lo tollera, ma Vitest — che esternalizza node_modules e carica il pacchetto
// con l'import() nativo di Node — fallisce con ERR_MODULE_NOT_FOUND.
// Quindi ogni import/export relativo nella dist DEVE finire con ".js".
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));

function fileJs(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return fileJs(full);
    return full.endsWith(".js") ? [full] : [];
  });
}

/** Cattura lo specificatore di ogni `from "…"` / `import("…")` che inizia con ./ o ../ */
const SPECIFICATORI = /(?:\bfrom\s*|\bimport\s*\(\s*)["'](\.\.?\/[^"']*)["']/g;

describe("dist: import relativi con estensione", () => {
  it("dist/ esiste (altrimenti: esegui npm run build)", () => {
    expect(existsSync(DIST), `dist/ non trovata in ${DIST}: esegui npm run build`).toBe(true);
  });

  it("nessun import/export relativo senza estensione .js", () => {
    expect(existsSync(DIST), `dist/ non trovata in ${DIST}: esegui npm run build`).toBe(true);
    const files = fileJs(DIST);
    expect(files.length, `nessun .js in ${DIST}: esegui npm run build`).toBeGreaterThan(0);

    const colpevoli: string[] = [];
    for (const file of files) {
      const code = readFileSync(file, "utf8");
      for (const m of code.matchAll(SPECIFICATORI)) {
        const spec = m[1];
        if (!spec.endsWith(".js")) colpevoli.push(`${file.slice(DIST.length + 1)} → "${spec}"`);
      }
    }
    expect(colpevoli, `import relativi senza ".js" nella dist:\n${colpevoli.join("\n")}`).toEqual([]);
  });
});
