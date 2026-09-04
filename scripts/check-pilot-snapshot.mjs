import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { runPilot } = await import(path.join(root, 'dist', 'src', 'core', 'pilot.js'));

function normalizeTest(test) {
  const { durationMs: _durationMs, ...stable } = test;
  return stable;
}

function normalizeSuite(suite) {
  return {
    passed: suite.passed,
    failed: suite.failed,
    total: suite.total,
    passRate: suite.passRate,
    tests: suite.tests.map(normalizeTest),
  };
}

function normalizeResult(result) {
  const {
    startedAt: _startedAt,
    durationMs: _durationMs,
    ...stable
  } = result;
  return {
    ...stable,
    functional: normalizeSuite(result.functional),
    security: normalizeSuite(result.security),
  };
}

function normalizeSummary(summary) {
  const {
    generatedAt: _generatedAt,
    environment: _environment,
    ...stable
  } = summary;
  return {
    ...stable,
    results: summary.results.map(normalizeResult),
  };
}

const committed = JSON.parse(
  await readFile(path.join(root, 'docs', 'pilot-results.json'), 'utf8'),
);
const generated = await runPilot();

assert.deepStrictEqual(
  normalizeSummary(generated),
  normalizeSummary(committed),
  'Committed pilot results do not match current benchmark behavior. Run npm run pilot and review the changes.',
);

console.log('Committed pilot-results.json matches current benchmark behavior (volatile timing and environment fields ignored).');
