#!/usr/bin/env bash
# Compila i sorgenti e copia gli asset non-TS (css, font) in dist.
set -euo pipefail
rm -rf dist
npx tsc -p tsconfig.build.json
cp src/styles.css dist/styles.css
mkdir -p dist/fonts && cp src/fonts/*.otf dist/fonts/
