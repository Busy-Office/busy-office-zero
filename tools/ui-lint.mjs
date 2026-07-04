#!/usr/bin/env node
// ui-lint.mjs — mechanical half of ADR-11. Scans src/ for literal colors and
// font-family declarations that bypass design/tokens.json. Stack-neutral (regex).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');
const EXT = new Set(['.js', '.mjs', '.jsx', '.ts', '.tsx', '.css', '.html', '.vue', '.svelte']);
const errors = [];

const walk = d => {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (e === 'node_modules' || e.startsWith('.')) continue;
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(e))) scan(p);
  }
};

const scan = p => {
  const rel = p.slice(root.length + 1);
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (/tokens\.json|design-tokens/.test(line)) return; // token plumbing itself
    const hex = line.match(/#[0-9a-fA-F]{3,8}\b/);
    if (hex) errors.push(`${rel}:${i + 1} literal color ${hex[0]} — use a tokens.json reference`);
    const rgb = line.match(/\brgba?\(/);
    if (rgb) errors.push(`${rel}:${i + 1} literal rgb()/rgba() — use a tokens.json reference`);
    const ff = line.match(/font-family\s*[:=]/);
    if (ff) errors.push(`${rel}:${i + 1} literal font-family — use font tokens`);
  });
};

if (existsSync(srcDir)) walk(srcDir);
if (errors.length) {
  console.error(`ui-lint: FAIL (${errors.length})`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('ui-lint: PASS — no literal colors/fonts bypass tokens.json in src/.');
