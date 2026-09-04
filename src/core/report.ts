import type { PilotSummary } from './types.js';
export function renderPilotMarkdown(summary: PilotSummary): string {
  const lines = ['# SecurePatch Bench v0.1 Pilot Results','',`Generated: ${summary.generatedAt}`,'','## Scope','',
    `- Scenarios: ${summary.scenarioCount}`, `- Evaluations: ${summary.evaluationCount}`,
    `- Runtime: ${summary.environment.node} on ${summary.environment.platform}/${summary.environment.architecture}`,'',
    '## Oracle validation','',
    `- Negative controls rejected: ${summary.oracleValidation.negativeControlsRejected}/${summary.oracleValidation.negativeControlsTotal}`,
    `- Reference repairs accepted: ${summary.oracleValidation.referenceRepairsAccepted}/${summary.oracleValidation.referenceRepairsTotal}`,'',
    '## Results by variant','','| Variant | Verified repairs | Functional tests | Security tests |','|---|---:|---:|---:|'];
  for (const [variant, v] of Object.entries(summary.byVariant)) lines.push(`| ${variant} | ${v.verifiedRepairs}/${v.evaluations} | ${v.functionalTestsPassed}/${v.functionalTestsTotal} | ${v.securityTestsPassed}/${v.securityTestsTotal} |`);
  lines.push('','## Scenario detail','','| Scenario | Variant | Functional | Security | Verified | Score |','|---|---|---:|---:|:---:|---:|');
  for (const r of summary.results) lines.push(`| \`${r.scenarioId}\` | ${r.variant} | ${r.functional.passed}/${r.functional.total} | ${r.security.passed}/${r.security.total} | ${r.verifiedRepair ? 'yes':'no'} | ${r.score.toFixed(4)} |`);
  lines.push('','> These figures validate the benchmark oracles against intentionally vulnerable, deliberately incomplete, and reference implementations. They are not an evaluation of any language model.','');
  return `${lines.join('\n')}\n`;
}
