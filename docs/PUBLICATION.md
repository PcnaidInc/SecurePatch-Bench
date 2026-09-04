# Publication and Claims Guide

## Public publication locations

- Publication page: <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>
- Public PDF: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf>
- Public repository: <https://github.com/PcnaidInc/SecurePatch-Bench>
- Tagged release: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0>

## Accurate v0.1 claims

You may say:

- SecurePatch Bench v0.1 contains nine synthetic TypeScript SaaS security-repair scenarios.
- It uses paired functional and security oracles.
- The built-in pilot rejected all 18 negative controls and accepted all 9 reference repairs.
- The naive secret-rotation repair passed 90% of the weighted diagnostic score but failed verification because one security invariant remained unsatisfied.
- Version 0.1 is a published Pcnaid technical report/preprint and open-source benchmark release.

Do not say:

- any model achieved or failed a particular repair rate in v0.1;
- the benchmark proves a model is generally safe or unsafe;
- the scenarios represent all SaaS vulnerability classes;
- the report is peer reviewed unless and until it is accepted through a peer-review process;
- the current release contains real-world vulnerability prevalence results.

## Required label

`Technical Report / Preprint - not peer reviewed`

## Archiving

The `v0.1.0` GitHub release is the stable software citation. A later archival deposit may add a DOI. Update `CITATION.cff` only after a DOI has actually been assigned.

## CI reproducibility

Runtime timestamps, platform metadata, and duration measurements are intentionally retained in `docs/pilot-results.json`, so byte-for-byte regeneration is not expected across machines. CI compares the current run with the committed snapshot after excluding only volatile timing and environment fields. All scenario identities, test outcomes, failure details, scores, and oracle-validation totals must match. CI also verifies that `docs/PILOT_RESULTS.md` is an exact rendering of the committed JSON snapshot.
