#!/usr/bin/env node
// graph-lint.mjs — enforces ADR-34 (index + shards) mechanically at the hardening gate.
// Checks: (1) index ≤ 200 lines, (2) accepted ADR/MOD nodes have shards,
// (3) every shard maps back to an index node, (4) shard front-matter (id/status)
// agrees with filename and index, (5) edge endpoints exist in the index,
// (6) FLOW shards map to a declared MOD.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'DESIGN-GRAPH.md');
const lines = readFileSync(indexPath, 'utf8').split('\n');
const errors = [];

// (1) size cap
if (lines.length > 200) errors.push(`Index is ${lines.length} lines — cap is 200 (extract depth to shards).`);

// parse nodes + edges
const nodes = new Map(); // id -> {type, status}
const edges = [];
for (const line of lines) {
  const n = line.match(/^([A-Z]{2,4}-[\w-]+)\s+([A-Z]{2,4})\s*\|\s*[^|]+\|\s*(\w+)\s*\|/);
  if (n) { nodes.set(n[1], { type: n[2], status: n[3] }); continue; }
  const e = line.match(/^([A-Z]{2,4}-[\w-]+)\s*--[\w-]+-->\s*([A-Z]{2,4}-[\w-]+)\s*\|/);
  if (e) edges.push({ from: e[1], to: e[2] });
}
if (nodes.size === 0) errors.push('No nodes parsed from index — check NODES format.');

// (5) edge endpoints
for (const { from, to } of edges) {
  if (!nodes.has(from)) errors.push(`Edge from undeclared node ${from}`);
  if (!nodes.has(to)) errors.push(`Edge to undeclared node ${to}`);
}

const shardDir = t => join(root, 'graph', t.toLowerCase());
const frontMatter = p => {
  const head = readFileSync(p, 'utf8').split('\n').slice(0, 3);
  const get = k => (head.find(l => l.startsWith(k + ':')) || '').split(':').slice(1).join(':').trim();
  return { id: get('id'), status: get('status') };
};

// (2) accepted ADR/MOD require shards; front-matter agreement for those that exist
for (const [id, v] of nodes) {
  if (!['ADR', 'MOD'].includes(v.type)) continue;
  const p = join(shardDir(v.type), `${id}.md`);
  if (!existsSync(p)) {
    if (v.status === 'accepted') errors.push(`${id} is accepted but shard graph/${v.type.toLowerCase()}/${id}.md is missing`);
    continue;
  }
  const fm = frontMatter(p);
  if (fm.id !== id) errors.push(`${id} shard front-matter id is '${fm.id}'`);
  if (fm.status !== v.status) errors.push(`${id}: index says '${v.status}', shard says '${fm.status}'`);
}

// (3)+(6) every shard maps back to the index
for (const t of ['adr', 'mod', 'flows']) {
  const dir = join(root, 'graph', t);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const stem = f.replace(/\.md$/, '');
    if (t === 'flows') {
      const mod = stem.replace(/^FLOW-/, '');
      if (!nodes.has(mod)) errors.push(`graph/flows/${f} references undeclared module ${mod}`);
    } else if (!nodes.has(stem)) {
      errors.push(`graph/${t}/${f} has no matching index node — orphan shard`);
    }
  }
}

// (7) root hygiene (ADR-06): root contains only the contracted files/dirs
const ROOT_ALLOW = new Set([
  'README.md', 'CLAUDE.md', 'DESIGN-GRAPH.md', '.claude', 'graph', 'design', 'docs', 'src', 'tools', 'archive',
  // legitimate Node/git residents:
  'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock',
  '.gitignore', '.git', 'node_modules', 'LICENSE',
]);
for (const entry of readdirSync(root)) {
  if (!ROOT_ALLOW.has(entry)) errors.push(`Root contains '${entry}' — not in the root contract (ADR-06); move it to its home dir`);
}

if (errors.length) {
  console.error(`graph-lint: FAIL (${errors.length})`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(`graph-lint: PASS — ${nodes.size} nodes, ${edges.length} edges, index ${lines.length}/200 lines, shards consistent.`);
