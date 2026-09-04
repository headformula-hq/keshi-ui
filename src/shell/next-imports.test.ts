// @vitest-environment node
//
// GUARDIA: gli import da `next/*` nei sorgenti DEVONO avere l'estensione .js.
// La dist viene caricata dai test delle app ospiti con l'import() nativo di Node,
// che non aggiunge estensioni: "next/link" → ERR_MODULE_NOT_FOUND, "next/link.js" ok
// (next non ha un campo `exports`, quindi il file si risolve direttamente).
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("..", import.meta.url));

function sorgenti(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sorgenti(full);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [full] : [];
  });
}

const NEXT_IMPORT = /\bfrom\s*["'](next\/[^"']+)["']/g;

describe("import da next/* con estensione .js", () => {
  it("sidebar.tsx e tabs.tsx importano next/link.js, app-shell.tsx next/navigation.js", () => {
    expect(readFileSync(join(SRC, "shell/sidebar.tsx"), "utf8")).toContain('from "next/link.js"');
    expect(readFileSync(join(SRC, "primitives/tabs.tsx"), "utf8")).toContain('from "next/link.js"');
    expect(readFileSync(join(SRC, "shell/app-shell.tsx"), "utf8")).toContain('from "next/navigation.js"');
  });

  it("nessun sorgente importa next/<x> senza estensione", () => {
    const colpevoli: string[] = [];
    for (const file of sorgenti(SRC)) {
      for (const m of readFileSync(file, "utf8").matchAll(NEXT_IMPORT)) {
        if (!m[1].endsWith(".js")) colpevoli.push(`${file.slice(SRC.length)} → "${m[1]}"`);
      }
    }
    expect(colpevoli, `import da next/* senza ".js":\n${colpevoli.join("\n")}`).toEqual([]);
  });
});
