#!/usr/bin/env bash
# Compila i sorgenti e copia gli asset non-TS (css, font e relativa licenza OFL) in dist.
set -euo pipefail
rm -rf dist
npx tsc -p tsconfig.build.json
cp src/styles.css dist/styles.css
mkdir -p dist/fonts && cp src/fonts/*.otf dist/fonts/ && cp src/fonts/LICENSE-*.txt dist/fonts/

# KESHI_UI_VERSION: il sorgente tiene il segnaposto "0.0.0", qui ci scriviamo la
# versione vera letta da package.json (niente sed: la sostituzione è esatta e in JS).
node -e '
const { readFileSync, writeFileSync } = require("node:fs");
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const file = "dist/index.js";
const code = readFileSync(file, "utf8");
const atteso = `KESHI_UI_VERSION = "0.0.0"`;
if (!code.includes(atteso)) {
  console.error(`build: segnaposto ${atteso} non trovato in ${file}`);
  process.exit(1);
}
writeFileSync(file, code.replace(atteso, `KESHI_UI_VERSION = "${version}"`));
console.log(`build: KESHI_UI_VERSION = ${version}`);
'
