# SecurePatch Bench v0.1.0

SecurePatch Bench v0.1.0 is the first public release of Pcnaid Inc.'s synthetic defensive benchmark for complete SaaS security remediation.

## Included

- Nine TypeScript scenarios across authorization, tenant isolation, and webhook security.
- Paired functional and security oracles.
- Vulnerable baselines, deliberately incomplete repairs, and complete reference repairs.
- Reproducible CLI, JSON results, Markdown report, schemas, benchmark card, threat model, responsible-use guidance, and technical report.

## Oracle-validation result

- Rejected 18 of 18 negative controls.
- Accepted 9 of 9 complete reference repairs.
- All candidate families retained their designated functional behavior.

## Important boundary

This release validates the benchmark and its test oracles. It does **not** report language-model or coding-agent performance and is not a general model leaderboard.

## Publication

- Technical report: https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/
- PDF: https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf

Research status: **Technical Report / Preprint - not peer reviewed**.
