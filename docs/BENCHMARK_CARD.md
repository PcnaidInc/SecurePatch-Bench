# Benchmark Card: SecurePatch Bench v0.1

## Summary

SecurePatch Bench evaluates whether a repair candidate preserves intended SaaS behavior while satisfying an explicit security invariant. Version 0.1 contains nine small, synthetic TypeScript scenarios and paired functional/security oracles.

## Intended uses

- research on AI-assisted and automated vulnerability repair;
- secure-SDLC testing and education;
- evaluation of patch-validation workflows;
- controlled comparison of prompting, context, tools, and agent scaffolds;
- regression testing for benchmark infrastructure.

## Out-of-scope uses

- attacking or scanning third-party targets;
- assessing people, hiring candidates, or employee performance;
- claiming broad real-world model safety from this small synthetic set;
- converting scenario code into offensive automation;
- treating a diagnostic score as proof of a secure patch.

## Dataset composition

- 9 scenarios
- 3 authorization
- 3 tenant-isolation
- 3 webhook-security
- 11 functional tests per variant in aggregate
- 33 security tests per variant in aggregate
- vulnerable, naive, and reference candidates for each scenario

## Primary decision rule

A candidate is a verified repair only if every functional and every security test passes. The 40/60 weighted score is diagnostic only.

## Pilot validation

- 18/18 vulnerable or incomplete negative controls rejected
- 9/9 reference repairs accepted
- no model or agent evaluated in v0.1

## Known limitations

- synthetic, compact scenarios may underrepresent production complexity;
- TypeScript and Node.js only;
- fixed scenario APIs and deterministic in-process tests;
- no hidden test service in v0.1;
- no human maintainability or semantic-equivalence rating yet;
- no cost, latency, model, prompt, or repetition analysis yet;
- mappings to CWE and OWASP are descriptive and may not cover every relevant classification.

## Ethical considerations

The benchmark is designed for public defensive benefit. Scenarios contain no real credentials, personal data, customer code, or live targets. Contributors must document provenance and authorization.

## Maintenance

Pcnaid Inc. maintains the benchmark. Changes to scenario semantics, tests, or scoring require a version update and regenerated result artifacts.
