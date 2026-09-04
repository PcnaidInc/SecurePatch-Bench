export class ScenarioError extends Error {
  public readonly code: string;
  public constructor(code: string, message: string) {
    super(message);
    this.name = 'ScenarioError';
    this.code = code;
  }
}
export function fail(code: string, message: string): never {
  throw new ScenarioError(code, message);
}
