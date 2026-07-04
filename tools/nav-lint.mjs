#!/usr/bin/env node
// nav-lint.mjs — enforces PRN-06 mechanically (runs at the hardening gate).
// Checks: (1) edge endpoints exist, (2) reachability from entry nodes per
// platform, (3) accepted screens have spec files, (4) no literal hex colors
// in screen specs (tokens only).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const graphPath = join(root, 'design', 'NAV-GRAPH.md');
const screensDir = join(root, 'design', 'screens');
const text = readFileSync(graphPath, 'utf8');

const errors = [];
const nodes = new Map(); // id -> {slug, platform, kind, status}
const edges = [];        // {from, to, platform}

for (const line of text.split('\n')) {
  const n = line.match(/^(SCR-\d+)\s*\|\s*([\w-]+)\s*\|\s*(web|mobile|both)\s*\|\s*(entry|screen|modal)\s*\|\s*(\w+)\s*\|/);
  if (n) { nodes.set(n[1], { slug: n[2], platform: n[3], kind: n[4], status: n[5] }); continue; }
  const e = line.match(/^(SCR-\d+)\s*--[\w-]+-->\s*(SCR-\d+)\s*\|\s*(web|mobile|both)\s*\|/);
  if (e) edges.push({ from: e[1], to: e[2], platform: e[3] });
}

if (nodes.size === 0) errors.push('No SCR nodes parsed — check NAV-GRAPH.md format.');

// 1. Edge endpoints exist
for (const { from, to } of edges) {
  if (!nodes.has(from)) errors.push(`Edge references undeclared node ${from}`);
  if (!nodes.has(to)) errors.push(`Edge references undeclared node ${to} (broken link)`);
}

// 2. Reachability per platform from entry nodes
const onPlatform = (nodePlat, p) => nodePlat === 'both' || nodePlat === p;
for (const p of ['web', 'mobile']) {
  const reach = new Set([...nodes].filter(([, v]) => v.kind === 'entry' && onPlatform(v.platform, p)).map(([id]) => id));
  let grew = true;
  while (grew) {
    grew = false;
    for (const { from, to, platform } of edges) {
      if (onPlatform(platform, p) && reach.has(from) && !reach.has(to)) { reach.add(to); grew = true; }
    }
  }
  for (const [id, v] of nodes) {
    if (onPlatform(v.platform, p) && !reach.has(id)) {
      errors.push(`${id} (${v.slug}) unreachable on ${p} — orphan screen`);
    }
  }
}

// 3. Accepted screens have spec files
const specs = existsSync(screensDir) ? readdirSync(screensDir) : [];
for (const [id, v] of nodes) {
  if (v.status !== 'accepted') continue;
  if (!specs.some(f => f.startsWith(`${id}-`))) {
    errors.push(`${id} is accepted but design/screens/${id}-${v.slug}.md is missing`);
  }
}

// 4. No literal hex colors in screen specs (tokens only)
for (const f of specs.filter(f => f.endsWith('.md'))) {
  const body = readFileSync(join(screensDir, f), 'utf8');
  const hex = body.match(/#[0-9a-fA-F]{3,8}\b/g);
  if (hex) errors.push(`${f} contains literal color(s) ${[...new Set(hex)].join(', ')} — use tokens.json references`);
}

if (errors.length) {
  console.error(`nav-lint: FAIL (${errors.length})`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(`nav-lint: PASS — ${nodes.size} screens, ${edges.length} edges, contract holds.`);
