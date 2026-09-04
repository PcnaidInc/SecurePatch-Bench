import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { CATEGORIES, VARIANTS, type ScenarioManifest } from './types.js';
import { findRepositoryRoot } from './paths.js';

export async function loadCatalog(): Promise<ScenarioManifest[]> {
  const root = await findRepositoryRoot(); const scenariosRoot = path.join(root, 'scenarios'); const manifests: ScenarioManifest[] = [];
  for (const category of await readdir(scenariosRoot, {withFileTypes: true})) {
    if (!category.isDirectory()) continue;
    for (const scenario of await readdir(path.join(scenariosRoot, category.name), {withFileTypes: true})) {
      if (!scenario.isDirectory()) continue;
      const manifest = JSON.parse(await readFile(path.join(scenariosRoot, category.name, scenario.name, 'manifest.json'), 'utf8')) as ScenarioManifest;
      validateManifest(manifest, `${category.name}/${scenario.name}`); manifests.push(manifest);
    }
  }
  return manifests.sort((a,b) => a.id.localeCompare(b.id));
}
export async function getScenario(id: string): Promise<ScenarioManifest> {
  const catalog = await loadCatalog(); const match = catalog.find((item) => item.id === id);
  if (!match) throw new Error(`Unknown scenario "${id}". Available: ${catalog.map((item) => item.id).join(', ')}`);
  return match;
}
export function validateManifest(manifest: ScenarioManifest, directoryHint?: string): void {
  const name = directoryHint ?? manifest.id;
  if (manifest.schemaVersion !== '1.0') throw new Error(`Unsupported schema: ${name}`);
  if (manifest.id !== name && directoryHint) throw new Error(`Manifest id ${manifest.id} does not match directory ${directoryHint}`);
  if (!CATEGORIES.includes(manifest.category)) throw new Error(`Invalid category: ${name}`);
  if (!manifest.id || !manifest.title || !manifest.securityInvariant.trim()) throw new Error(`Missing required text: ${name}`);
  if (manifest.language !== 'TypeScript' || manifest.runtime !== 'Node.js') throw new Error(`Unsupported runtime: ${name}`);
  if (!manifest.cwes.length || !manifest.owaspMappings.length || !manifest.visibleBehavior.length || !manifest.securityOracle.length) throw new Error(`Incomplete manifest arrays: ${name}`);
  for (const variant of VARIANTS) if (!manifest.variants[variant]?.trim()) throw new Error(`Missing ${variant} description: ${name}`);
}
