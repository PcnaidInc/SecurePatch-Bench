# SecurePatch Bench v0.1 Technical Report

**Title:** *SecurePatch Bench v0.1: Paired Functional and Security Oracles for Complete SaaS Vulnerability Remediation*  
**Author:** Abdul Badran, Pcnaid Inc.  
**Status:** Technical Report / Preprint - not peer reviewed  
**Version:** 0.1.0  
**Published:** September 4, 2026

## What to do with this paper

The original `SecurePatch-Bench-v0.1-Research-Paper` ZIP was only a transfer package. Do not deploy that ZIP as a separate website or create another repository for it.

Use the publication in four ways:

1. **Public landing page:** link people to <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>.
2. **Fixed document:** provide the [release PDF](https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf) when an application, reviewer, or archive asks for a paper.
3. **Reproducibility:** direct technical reviewers to the [v0.1.0 release](https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0) and this repository.
4. **Editing:** use [`SecurePatch_Bench_v0.1_Technical_Report.md`](SecurePatch_Bench_v0.1_Technical_Report.md) as the canonical manuscript source. Keep the DOCX as an offline editing convenience unless a future publisher specifically requests it.

## Publication state

- [x] Public source repository
- [x] Passing public CI
- [x] Tagged `v0.1.0` software release
- [x] Release PDF attached
- [x] Public Pcnaid research landing page
- [x] Citation metadata
- [ ] DOI or archival identifier — optional
- [ ] Independent peer review — future work

## Result boundary

Version 0.1 validates the benchmark's paired functional and security oracles against intentionally vulnerable implementations, deliberately incomplete repairs, and complete reference repairs. It does **not** report the performance of a language model or coding agent.

## Headline results

- 9 synthetic TypeScript SaaS scenarios
- 18 of 18 negative controls rejected
- 9 of 9 complete reference repairs accepted
- all built-in candidate families preserved the designated functional tests

## Canonical resources

- [Publication page](https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/)
- [Release PDF](https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf)
- [Release v0.1.0](https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0)
- [Repository](https://github.com/PcnaidInc/SecurePatch-Bench)
- [Publication and claims guide](PUBLICATION_GUIDE.md)

## Licensing

The original research prose and dataset documentation are licensed under CC BY 4.0. The benchmark software is licensed under Apache-2.0.
