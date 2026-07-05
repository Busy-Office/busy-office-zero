#!/usr/bin/env node
// graph-lint.mjs — enforces ADR-34 (index + shards) mechanically at the hardening gate.
// Checks: (1) index ≤ 200 lines, (2) accepted ADR/MOD nodes have shards,
// (3) every shard maps back to an index node, (4) shard front-matter (id/status)
// agrees with filename and index, (5) edge endpoints exist in the index,
// (6) FLOW shards map to a declared MOD, (8) doc ownership + staleness (ADR-12).
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
// Reads leading front-matter, either plain (`key: value` lines from line 1)
// or YAML-fenced (`---` ... `---`, used by .claude/agents + .claude/skills).
const readFrontMatter = p => {
  const raw = readFileSync(p, 'utf8').split('\n');
  const head = raw[0] === '---' ? raw.slice(1, raw.indexOf('---', 1)) : raw.slice(0, 8);
  const get = k => {
    const l = head.find(l => l.startsWith(k + ':'));
    return l ? l.split(':').slice(1).join(':').trim() : '';
  };
  return { id: get('id'), status: get('status'), owner: get('owner'), updated: get('updated'), decidedBy: get('decided-by') };
};
const frontMatter = p => readFrontMatter(p); // back-compat alias (id/status checks below)

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

// (8) doc ownership + staleness (ADR-12)
const OWNER_ROSTER = new Set(['chief-architect', 'pm', 'product-design-manager', 'ux-ui-designer']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const governedDocs = [
  'README.md', 'CLAUDE.md', 'DESIGN-GRAPH.md',
  'docs/ASSETS.md', 'docs/SKILLS.md', 'docs/OWNERS.md',
  'design/NAV-GRAPH.md', 'design/DESIGN-SYSTEM.md', 'design/COMPONENTS.md',
];
for (const t of ['adr', 'mod']) {
  const dir = join(root, 'graph', t);
  if (existsSync(dir)) for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) governedDocs.push(`graph/${t}/${f}`);
}
if (existsSync(join(root, 'design/screens'))) {
  for (const f of readdirSync(join(root, 'design/screens')).filter(f => f.endsWith('.md'))) governedDocs.push(`design/screens/${f}`);
}
if (existsSync(join(root, '.claude/agents'))) {
  for (const f of readdirSync(join(root, '.claude/agents')).filter(f => f.endsWith('.md'))) governedDocs.push(`.claude/agents/${f}`);
}
if (existsSync(join(root, '.claude/skills'))) {
  for (const skill of readdirSync(join(root, '.claude/skills'))) {
    const p = `.claude/skills/${skill}/SKILL.md`;
    if (existsSync(join(root, p))) governedDocs.push(p);
  }
}

const docDates = new Map(); // path -> {owner, updated, decidedBy}
for (const rel of governedDocs) {
  const p = join(root, rel);
  const fm = readFrontMatter(p);
  if (!fm.owner || !OWNER_ROSTER.has(fm.owner)) errors.push(`${rel}: missing/unknown 'owner' front-matter (roster: ${[...OWNER_ROSTER].join(', ')})`);
  if (!fm.updated || !DATE_RE.test(fm.updated)) errors.push(`${rel}: missing/malformed 'updated' front-matter (expected YYYY-MM-DD)`);
  docDates.set(rel, fm);
}
// tokens.json carries the same fields inside its "meta" object (JSON, not line-based front-matter).
const tokensPath = join(root, 'design/tokens.json');
if (existsSync(tokensPath)) {
  const meta = JSON.parse(readFileSync(tokensPath, 'utf8')).meta || {};
  if (!meta.owner || !OWNER_ROSTER.has(meta.owner)) errors.push(`design/tokens.json: missing/unknown 'meta.owner'`);
  if (!meta.updated || !DATE_RE.test(meta.updated)) errors.push(`design/tokens.json: missing/malformed 'meta.updated'`);
}

// staleness: a doc's decided-by node must not have a shard newer than the doc itself.
// Scope limit (ADR-12): only applies where decided-by resolves to a shard-bearing node (ADR/MOD).
for (const [rel, fm] of docDates) {
  if (!fm.decidedBy) continue;
  const shardPath = join(shardDir('adr'), `${fm.decidedBy}.md`);
  if (!existsSync(shardPath)) continue; // not a shard-bearing node — out of scope
  const shardFm = readFrontMatter(shardPath);
  if (shardFm.updated && fm.updated && shardFm.updated > fm.updated) {
    errors.push(`${rel}: stale — ${fm.decidedBy} shard updated ${shardFm.updated}, doc last updated ${fm.updated}`);
  }
}

if (errors.length) {
  console.error(`graph-lint: FAIL (${errors.length})`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(`graph-lint: PASS — ${nodes.size} nodes, ${edges.length} edges, index ${lines.length}/200 lines, shards consistent, ${docDates.size + 1} docs owned+fresh.`);
