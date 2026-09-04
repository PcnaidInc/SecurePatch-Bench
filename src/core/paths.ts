import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
export async function findRepositoryRoot(start = process.cwd()): Promise<string> {
  for (const candidate of [start, path.resolve(moduleDirectory, '../../..')]) {
    const found = await searchUp(candidate); if (found) return found;
  }
  throw new Error('Unable to locate the SecurePatch Bench repository root.');
}
async function searchUp(start: string): Promise<string | undefined> {
  let current = path.resolve(start);
  while (true) {
    try {
      await access(path.join(current, 'package.json'));
      const parsed = JSON.parse(await readFile(path.join(current, 'package.json'), 'utf8')) as {name?: string};
      if (parsed.name === '@pcnaid/securepatch-bench') return current;
    } catch { /* continue */ }
    const parent = path.dirname(current); if (parent === current) return undefined; current = parent;
  }
}
