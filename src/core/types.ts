export const VARIANTS = ['vulnerable', 'naive', 'reference'] as const;
export type VariantName = (typeof VARIANTS)[number];
export const CATEGORIES = ['authorization', 'tenant-isolation', 'webhooks'] as const;
export type ScenarioCategory = (typeof CATEGORIES)[number];

export interface ScenarioManifest {
  schemaVersion: '1.0';
  id: string;
  title: string;
  category: ScenarioCategory;
  version: string;
  language: 'TypeScript';
  runtime: 'Node.js';
  cwes: string[];
  owaspMappings: string[];
  summary: string;
  securityInvariant: string;
  visibleBehavior: string[];
  securityOracle: string[];
  variants: Record<VariantName, string>;
  safeUse: string;
  license: 'Apache-2.0';
}

export interface TestCaseResult {
  name: string;
  kind: 'functional' | 'security';
  passed: boolean;
  durationMs: number;
  details?: string;
}
export type CandidateFactory = () => unknown;
export interface ScenarioHarness {
  runFunctional(factory: CandidateFactory): Promise<TestCaseResult[]>;
  runSecurity(factory: CandidateFactory): Promise<TestCaseResult[]>;
}
export interface ScenarioModule {
  harness: ScenarioHarness;
  variants: Record<VariantName, CandidateFactory>;
}
export interface SuiteResult {
  passed: number;
  failed: number;
  total: number;
  passRate: number;
  tests: TestCaseResult[];
}
export interface ScenarioResult {
  scenarioId: string;
  title: string;
  category: ScenarioCategory;
  variant: VariantName | 'custom';
  candidateModule: string;
  startedAt: string;
  durationMs: number;
  functional: SuiteResult;
  security: SuiteResult;
  verifiedRepair: boolean;
  score: number;
}
export interface PilotSummary {
  schemaVersion: '1.0';
  benchmark: 'SecurePatch Bench';
  benchmarkVersion: string;
  generatedAt: string;
  environment: {node: string; platform: string; architecture: string};
  scenarioCount: number;
  evaluationCount: number;
  byVariant: Record<string, {
    evaluations: number;
    verifiedRepairs: number;
    functionalTestsPassed: number;
    functionalTestsTotal: number;
    securityTestsPassed: number;
    securityTestsTotal: number;
  }>;
  oracleValidation: {
    negativeControlsRejected: number;
    negativeControlsTotal: number;
    referenceRepairsAccepted: number;
    referenceRepairsTotal: number;
  };
  results: ScenarioResult[];
}
