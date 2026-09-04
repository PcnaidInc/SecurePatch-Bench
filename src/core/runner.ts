import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { performance } from 'node:perf_hooks';
import type { CandidateFactory, ScenarioManifest, ScenarioModule, ScenarioResult, SuiteResult, TestCaseResult, VariantName } from './types.js';
import { findRepositoryRoot } from './paths.js';

export async function runScenario(manifest: ScenarioManifest, variant: VariantName): Promise<ScenarioResult> {
  const root = await findRepositoryRoot();
  const modulePath = path.join(root, 'dist', 'scenarios', manifest.id, 'scenario.js');
  const loaded = await importFresh(modulePath) as Partial<ScenarioModule>;
  if (!loaded.harness || !loaded.variants?.[variant]) throw new Error(`Scenario module is incomplete: ${manifest.id}`);
  return evaluate(manifest, variant, loaded.harness, loaded.variants[variant], modulePath);
}
export async function runCustomScenario(manifest: ScenarioManifest, candidatePath: string): Promise<ScenarioResult> {
  const root = await findRepositoryRoot();
  const scenarioPath = path.join(root, 'dist', 'scenarios', manifest.id, 'scenario.js');
  const loaded = await importFresh(scenarioPath) as Partial<ScenarioModule>;
  const custom = await importFresh(path.resolve(candidatePath)) as {createCandidate?: CandidateFactory};
  if (!loaded.harness || !custom.createCandidate) throw new Error('Scenario harness or custom createCandidate export is missing.');
  return evaluate(manifest, 'custom', loaded.harness, custom.createCandidate, path.resolve(candidatePath));
}
async function importFresh(modulePath: string): Promise<unknown> {
  const bust = `?v=${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return import(`${pathToFileURL(modulePath).href}${bust}`);
}
async function evaluate(manifest: ScenarioManifest, variant: VariantName | 'custom', harness: ScenarioModule['harness'], factory: CandidateFactory, modulePath: string): Promise<ScenarioResult> {
  const startedAt = new Date().toISOString(); const started = performance.now();
  const functional = summarize(await harness.runFunctional(factory)); const security = summarize(await harness.runSecurity(factory));
  const verifiedRepair = functional.failed === 0 && security.failed === 0;
  return {
    scenarioId: manifest.id, title: manifest.title, category: manifest.category, variant,
    candidateModule: path.relative(process.cwd(), modulePath), startedAt,
    durationMs: round(performance.now() - started), functional, security, verifiedRepair,
    score: round(functional.passRate * 0.4 + security.passRate * 0.6)
  };
}
function summarize(tests: TestCaseResult[]): SuiteResult {
  const passed = tests.filter((test) => test.passed).length; const failed = tests.length - passed;
  return {passed, failed, total: tests.length, passRate: tests.length ? round(passed / tests.length) : 0, tests};
}
function round(value: number): number { return Math.round(value * 10000) / 10000; }
