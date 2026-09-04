#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { getScenario, loadCatalog, validateManifest } from './core/catalog.js';
import { runPilot } from './core/pilot.js';
import { renderPilotMarkdown } from './core/report.js';
import { runCustomScenario, runScenario } from './core/runner.js';
import { VARIANTS, type PilotSummary, type VariantName } from './core/types.js';
async function main(): Promise<void> {
  const [command='help', ...args] = process.argv.slice(2);
  if (command === 'list') { for (const s of await loadCatalog()) console.log(`${s.id}\n  ${s.title}\n  ${s.securityInvariant}\n`); return; }
  if (command === 'validate') { const catalog=await loadCatalog(); const ids=new Set<string>(); for (const s of catalog) { validateManifest(s); if(ids.has(s.id)) throw new Error(`Duplicate id: ${s.id}`); ids.add(s.id);} console.log(`Validated ${catalog.length} scenario manifests.`); return; }
  if (command === 'run') { const [id, v='reference']=args; if(!id || !VARIANTS.includes(v as VariantName)) throw new Error('Usage: run <scenario-id> [vulnerable|naive|reference]'); const r=await runScenario(await getScenario(id),v as VariantName); console.log(JSON.stringify(r,null,2)); process.exitCode=r.verifiedRepair?0:2; return; }
  if (command === 'run-custom') { const [id,modulePath]=args; if(!id||!modulePath) throw new Error('Usage: run-custom <scenario-id> <compiled-module.js>'); const r=await runCustomScenario(await getScenario(id),modulePath); console.log(JSON.stringify(r,null,2)); process.exitCode=r.verifiedRepair?0:2; return; }
  if (command === 'pilot') { const summary=await runPilot(); const i=args.indexOf('--write'); if(i>=0){const out=args[i+1];if(!out)throw new Error('--write requires a path');await writeFile(path.resolve(out),`${JSON.stringify(summary,null,2)}\n`);console.log(`Wrote ${out}`);} console.log(JSON.stringify(summary,null,2)); const o=summary.oracleValidation; if(o.negativeControlsRejected!==o.negativeControlsTotal||o.referenceRepairsAccepted!==o.referenceRepairsTotal)process.exitCode=3; return; }
  if (command === 'report') { const ii=args.indexOf('--input'),oi=args.indexOf('--output');const input=ii>=0?args[ii+1]:'docs/pilot-results.json';const output=oi>=0?args[oi+1]:'docs/PILOT_RESULTS.md';if(!input||!output)throw new Error('Invalid report paths');const summary=JSON.parse(await readFile(path.resolve(input),'utf8')) as PilotSummary;await writeFile(path.resolve(output),renderPilotMarkdown(summary));console.log(`Wrote ${output}`);return; }
  console.log('SecurePatch Bench v0.1\n\nCommands: list | validate | run <id> [variant] | run-custom <id> <module.js> | pilot [--write path] | report');
}
main().catch((error: unknown)=>{console.error(error instanceof Error ? error.stack??error.message:String(error));process.exitCode=1;});
