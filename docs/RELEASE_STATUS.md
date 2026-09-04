# SecurePatch Bench Publication Status

## v0.1.0 is published

SecurePatch Bench v0.1.0 is the project's first public technical-report release.

### Canonical resources

- Source repository: <https://github.com/PcnaidInc/SecurePatch-Bench>
- Release: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0>
- Release PDF: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf>
- Public research page: <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>
- Newsroom: <https://newsroom.pcnaid.com/>

## Claims boundary

Version 0.1 validates the benchmark's paired functional and security oracles against intentionally vulnerable implementations, deliberately incomplete repairs, and complete reference repairs. It does not report language-model performance, is not peer reviewed, and should be cited as a technical report/preprint.

## Tag and branch policy

The `v0.1.0` tag is the immutable archival software snapshot. Do not move or replace it. Documentation corrections made on `main` after publication are not retroactively part of that tagged snapshot. Any material change to data, results, scoring, or the fixed PDF should be released under a new semantic version.

## Future release process

1. Update versioned source, manuscript, results, `CHANGELOG.md`, and `CITATION.cff`.
2. Run `npm ci` and `npm run ci`.
3. Merge only after CI passes.
4. Create a new immutable version tag from the tested commit.
5. Create a GitHub release and attach the corresponding fixed-layout PDF.
6. Update the newsroom page and archival identifier, when applicable.
