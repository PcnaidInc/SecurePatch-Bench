import process from 'node:process';
import { loadCatalog } from './catalog.js';
import { runScenario } from './runner.js';
import { VARIANTS, type PilotSummary, type ScenarioResult, type VariantName } from './types.js';
export async function runPilot(): Promise<PilotSummary> {
  const catalog = await loadCatalog(); const results: ScenarioResult[] = [];
  for (const scenario of catalog) for (const variant of VARIANTS) results.push(await runScenario(scenario, variant));
  const byVariant: PilotSummary['byVariant'] = {};
  for (const variant of VARIANTS) byVariant[variant] = summarizeVariant(results, variant);
  const negative = results.filter((r) => r.variant !== 'reference'); const references = results.filter((r) => r.variant === 'reference');
  return {
    schemaVersion: '1.0', benchmark: 'SecurePatch Bench', benchmarkVersion: '0.1.0', generatedAt: new Date().toISOString(),
    environment: {node: process.version, platform: process.platform, architecture: process.arch},
    scenarioCount: catalog.length, evaluationCount: results.length, byVariant,
    oracleValidation: {
      negativeControlsRejected: negative.filter((r) => !r.verifiedRepair).length,
      negativeControlsTotal: negative.length,
      referenceRepairsAccepted: references.filter((r) => r.verifiedRepair).length,
      referenceRepairsTotal: references.length
    }, results
  };
}
function summarizeVariant(results: ScenarioResult[], variant: VariantName) {
  const selected = results.filter((r) => r.variant === variant);
  const sum = (key: 'passed'|'total', suite: 'functional'|'security') => selected.reduce((n,r) => n + r[suite][key], 0);
  return {evaluations: selected.length, verifiedRepairs: selected.filter((r) => r.verifiedRepair).length,
    functionalTestsPassed: sum('passed','functional'), functionalTestsTotal: sum('total','functional'),
    securityTestsPassed: sum('passed','security'), securityTestsTotal: sum('total','security')};
}
