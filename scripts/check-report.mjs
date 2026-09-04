import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { renderPilotMarkdown } = await import(path.join(root, 'dist', 'src', 'core', 'report.js'));

const summary = JSON.parse(
  await readFile(path.join(root, 'docs', 'pilot-results.json'), 'utf8'),
);
const committed = await readFile(path.join(root, 'docs', 'PILOT_RESULTS.md'), 'utf8');
const rendered = renderPilotMarkdown(summary);

assert.equal(
  rendered,
  committed,
  'PILOT_RESULTS.md is stale. Run npm run report and review the changes.',
);

console.log('PILOT_RESULTS.md matches docs/pilot-results.json.');
