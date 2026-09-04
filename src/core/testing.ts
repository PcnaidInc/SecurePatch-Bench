import { performance } from 'node:perf_hooks';
import type { TestCaseResult } from './types.js';

export class BenchmarkAssertionError extends Error {
  public constructor(message: string) { super(message); this.name = 'BenchmarkAssertionError'; }
}
export function equal<T>(actual: T, expected: T, message: string): void {
  if (!Object.is(actual, expected)) throw new BenchmarkAssertionError(`${message}; expected=${String(expected)} actual=${String(actual)}`);
}
export function deepEqual(actual: unknown, expected: unknown, message: string): void {
  const a = JSON.stringify(actual); const e = JSON.stringify(expected);
  if (a !== e) throw new BenchmarkAssertionError(`${message}; expected=${e} actual=${a}`);
}
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new BenchmarkAssertionError(message);
}
export function extractErrorCode(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const value = (error as {code?: unknown}).code;
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
}
export async function rejects(operation: () => unknown | Promise<unknown>, expectedCode: string, message: string): Promise<void> {
  try { await operation(); }
  catch (error) {
    const code = extractErrorCode(error);
    if (code !== expectedCode) throw new BenchmarkAssertionError(`${message}; expected error code ${expectedCode}, received ${code ?? 'none'}`);
    return;
  }
  throw new BenchmarkAssertionError(`${message}; operation unexpectedly succeeded`);
}
export async function runCase(name: string, kind: TestCaseResult['kind'], operation: () => unknown | Promise<unknown>): Promise<TestCaseResult> {
  const started = performance.now();
  try {
    await operation();
    return {name, kind, passed: true, durationMs: round(performance.now() - started)};
  } catch (error) {
    return {name, kind, passed: false, durationMs: round(performance.now() - started), details: error instanceof Error ? `${error.name}: ${error.message}` : String(error)};
  }
}
function round(value: number): number { return Math.round(value * 1000) / 1000; }
