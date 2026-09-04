# SecurePatch Bench v0.1 Publication Guide

## Current publication status

The initial publication sequence is complete:

1. The canonical repository is public.
2. Public GitHub Actions validation passes.
3. The immutable `v0.1.0` tag and release exist.
4. The report PDF is attached to the release.
5. Pcnaid hosts the public research landing page at <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>.
6. Citation metadata is available in `CITATION.cff`.

Use this label everywhere until the manuscript has completed formal peer review:

> Technical Report / Preprint - Not Peer Reviewed

Version 0.1 reports **benchmark-oracle validation**, not language-model performance. The built-in `vulnerable`, `naive`, and `reference` candidates are controlled fixtures used to test the benchmark itself.

## Canonical publication artifacts

- Publication page: <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>
- PDF: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/download/v0.1.0/SecurePatch_Bench_v0.1_Technical_Report.pdf>
- Repository: <https://github.com/PcnaidInc/SecurePatch-Bench>
- Release: <https://github.com/PcnaidInc/SecurePatch-Bench/releases/tag/v0.1.0>
- Manuscript source: [`SecurePatch_Bench_v0.1_Technical_Report.md`](SecurePatch_Bench_v0.1_Technical_Report.md)

The editable DOCX from the delivery package is not canonical and does not need to be published separately.

## Publication claims

Accurate claims for v0.1:

- SecurePatch Bench v0.1 contains nine synthetic TypeScript SaaS repair scenarios.
- The scenarios cover authorization, tenant isolation, and webhook security.
- Each scenario uses separate functional and security test oracles.
- The oracle-validation pilot rejected 18 of 18 negative controls and accepted 9 of 9 reference repairs.
- No evaluated language model is reported in v0.1.

Do not claim that:

- a language model achieved any repair rate in this release;
- the benchmark proves that a model is generally secure or insecure;
- the report has been peer reviewed;
- the nine scenarios represent all software-security defects;
- the current release measures real-world vulnerability prevalence; or
- OpenAI, Anthropic, CRN, or another provider endorsed the research.

## Suggested citation

Badran, Abdul. 2026. *SecurePatch Bench v0.1: Paired Functional and Security Oracles for Complete SaaS Vulnerability Remediation*. Version 0.1.0. Pcnaid Inc. Technical Report / Preprint. <https://newsroom.pcnaid.com/research/securepatch-bench-v0-1/>.

## Form wording now supported

> Published SecurePatch Bench v0.1, a public technical report and open-source defensive benchmark using paired functional and security oracles to evaluate complete repair of authorization, tenant-isolation, and webhook-security defects in synthetic TypeScript SaaS systems. The initial report validates benchmark behavior and does not claim language-model performance.

## Optional next steps

1. Archive the tagged release through a service such as Zenodo or OSF if a DOI or long-term archival identifier is desired.
2. Add the assigned identifier to `CITATION.cff`, the publication page, and a new release note.
3. Seek independent technical review and publish reviewer names only with permission.
4. Run controlled model evaluations under a preregistered protocol for a later release.
5. Publish corrections as a new version rather than moving or silently replacing the `v0.1.0` tag.

## Corrections

Material errors should be corrected in:

- the repository default branch;
- a new tagged release when results or the fixed PDF change;
- the public landing page;
- the archive or preprint record, when the service supports versioning; and
- `CHANGELOG.md`.

Retain the historical `v0.1.0` release unless removal is required for security, privacy, licensing, or legal reasons.
