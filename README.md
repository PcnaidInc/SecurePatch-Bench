# SecurePatch Bench

[![CI](https://github.com/PcnaidInc/SecurePatch-Bench/actions/workflows/ci.yml/badge.svg)](https://github.com/PcnaidInc/SecurePatch-Bench/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/Code-Apache--2.0-blue.svg)](LICENSE)
[![Research: CC BY 4.0](https://img.shields.io/badge/Research-CC%20BY%204.0-lightgrey.svg)](paper/LICENSE-CC-BY-4.0.txt)

**SecurePatch Bench** is an open, defensive benchmark for testing whether a software repair candidate completely closes security defects **without breaking intended behavior**.

Version 0.1 focuses on three recurring trust-boundary families in TypeScript SaaS systems:

- authorization and object-level access control;
- tenant isolation across data, caches, queues, and object storage; and
- webhook authentication, replay resistance, signature coverage, and key rotation.

The repository is intentionally synthetic. It does not scan live targets, contain customer code, or provide instructions for attacking third-party systems.

> **Current release status:** v0.1 validates the benchmark oracles against intentionally vulnerable implementations, deliberately incomplete "naive" repairs, and complete reference repairs. It does **not** claim to evaluate any language model yet.

## Published technical report

The `SecurePatch-Bench-v0.1-Research-Paper` download package was a working publication bundle, **not a separate repository or application**. Its canonical public artifacts are now:

- **Publication page:** <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>
- **Technical-report PDF:** <https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf>
- **Tagged software release:** <https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0>
- **Canonical manuscript source:** [`paper/SecurePatch_Bench_v0.1_Technical_Report.md`](paper/SecurePatch_Bench_v0.1_Technical_Report.md)
- **Citation metadata:** [`CITATION.cff`](CITATION.cff)

Use the newsroom page as the public landing page, the release PDF when a fixed document is required, and the tagged release when citing the software snapshot. The report is a **technical report / preprint — not peer reviewed**. Version 0.1 reports benchmark-oracle validation, not language-model performance.

## Why this benchmark exists

A patch can compile, pass ordinary unit tests, and still leave the actual security invariant broken. SecurePatch Bench separates two requirements:

1. **Functional oracle:** legitimate behavior must keep working.
2. **Security oracle:** every defined adversarial or negative-control case must be rejected or handled safely.

A candidate is a **verified repair only when every functional and security test passes**. The weighted score is diagnostic; it is never a substitute for the all-tests gate.

## v0.1 pilot at a glance

| Variant | Verified repairs | Functional tests | Security tests |
|---|---:|---:|---:|
| Vulnerable baseline | 0/9 | 11/11 | 8/33 |
| Deliberately incomplete repair | 0/9 | 11/11 | 18/33 |
| Reference repair | 9/9 | 11/11 | 33/33 |

The pilot rejected all 18 negative controls and accepted all 9 reference repairs. Full generated results are in [`docs/PILOT_RESULTS.md`](docs/PILOT_RESULTS.md) and [`docs/pilot-results.json`](docs/pilot-results.json).

## Scenario catalog

| ID | Security focus | Primary mappings |
|---|---|---|
| `authorization/order-export-idor` | Ownership, tenant scope, uniform not-found behavior | CWE-639, CWE-862; OWASP API1 |
| `authorization/workspace-admin-boundary` | Resource-scoped administration | CWE-285, CWE-862; OWASP API5 |
| `authorization/bulk-user-disable` | Atomic authorization over a complete target set | CWE-285, CWE-862; OWASP API5 |
| `tenant-isolation/cache-key-and-lookup` | Tenant-aware repository and cache keys | CWE-639, CWE-668; OWASP API1 |
| `tenant-isolation/queue-job-binding` | Integrity-protected tenant/job binding | CWE-345, CWE-668, CWE-862 |
| `tenant-isolation/object-storage-prefix` | Canonical tenant storage boundaries | CWE-22, CWE-639, CWE-668 |
| `webhooks/replay-window` | Freshness and replay resistance | CWE-294, CWE-345 |
| `webhooks/signature-coverage` | Binding all business-relevant message components | CWE-345, CWE-347 |
| `webhooks/secret-rotation` | Key validity windows and rotation overlap | CWE-321, CWE-345, CWE-798 |

## Requirements

- Node.js 22 or later
- npm 10 or later

## Quick start

```bash
git clone https://github.com/PcnaidInc/SecurePatch-Bench.git
cd SecurePatch-Bench
npm ci
npm run ci
```

Useful commands:

```bash
npm run list
npm run validate
npm run pilot
npm run report
npm run benchmark
npm run build
npm test
```

Run a built-in variant:

```bash
npm run build
node dist/src/cli.js run authorization/order-export-idor naive
```

Evaluate a custom compiled module:

```bash
npm run build
node dist/src/cli.js run-custom authorization/order-export-idor ./candidate.js
```

The custom module must export:

```js
export function createCandidate() {
  return {
    // Implement the interface expected by the selected scenario.
  };
}
```

See [`docs/EVALUATING_AGENTS.md`](docs/EVALUATING_AGENTS.md) for the intended adapter workflow.

## Repository map

```text
scenarios/                  Synthetic benchmark instances
src/                        Catalog, runner, scoring, CLI, and reports
test/                       Benchmark self-tests
schemas/                    Machine-readable manifest schema
docs/                       Benchmark card, threat model, scoring, and results
paper/                      Technical-report source and publication license
.github/                    CI and contribution templates
```

## Scoring

The diagnostic score is:

```text
0.40 * functional pass rate + 0.60 * security pass rate
```

The verified-repair decision is stricter:

```text
verified repair = all functional tests pass AND all security tests pass
```

A candidate can therefore earn a high diagnostic score and still fail verification. That behavior is intentional.

## Safety and responsible use

SecurePatch Bench is for lawful, authorized, defensive research and secure software development. Use only local synthetic scenarios or systems you own or are explicitly authorized to assess. Do not adapt the harness to scan or attack third-party targets. Review [`SECURITY.md`](SECURITY.md), [`docs/RESPONSIBLE_USE.md`](docs/RESPONSIBLE_USE.md), and [`docs/THREAT_MODEL.md`](docs/THREAT_MODEL.md) before contributing new scenarios.

## Research status

The companion paper is a **technical report / preprint, not peer reviewed**. Version 0.1 reports oracle-validation results only. Model comparisons are planned for a later release after model, prompt, tool, environment, and repetition controls are finalized.

## Contributing

Contributions are welcome when they preserve reproducibility, legal authorization, defensive purpose, and paired functional/security validation. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`GOVERNANCE.md`](GOVERNANCE.md).

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff). Until a DOI is assigned, cite the public `v0.1.0` software release and the Pcnaid technical-report publication page.

## Licensing

- Source code and benchmark harness: [Apache License 2.0](LICENSE)
- Original research prose and dataset documentation: [Creative Commons Attribution 4.0](paper/LICENSE-CC-BY-4.0.txt)
- Individual third-party references retain their original rights.

## Maintainer

**Abdul Badran**  
Pcnaid Inc.  
`support@pcnaid.com`  
<https://pcnaid.com>
