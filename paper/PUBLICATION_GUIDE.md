# SecurePatch Bench v0.1 Publication Guide

## Publication status

Use this label everywhere until the manuscript has completed formal peer review:

> Technical Report / Preprint - Not Peer Reviewed

Version 0.1 reports **benchmark-oracle validation**, not language-model performance. The built-in `vulnerable`, `naive`, and `reference` candidates are controlled fixtures used to test the benchmark itself.

## Required publication order

1. Upload the source package to the canonical repository.
2. Make `PcnaidInc/SecurePatch-Bench` publicly readable.
3. Run the public GitHub Actions workflow and confirm it passes.
4. Create the Git tag and release `v0.1.0` from the exact tested commit.
5. Confirm the repository, release, paper, and generated results are accessible while signed out of GitHub.
6. Publish the PDF and Markdown report on Pcnaid's website or a reputable preprint/archive service.
7. Archive the tagged release with a service that issues a persistent identifier, if desired.
8. Add any assigned DOI or archive identifier to `CITATION.cff`, the PDF landing page, and the repository release notes.
9. Only after a stable public paper URL exists, describe the work as a published technical report or preprint in applications and due-diligence materials.

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
- the nine scenarios represent all software-security defects; or
- OpenAI, Anthropic, CRN, or another provider endorsed the research.

## Suggested citation

Badran, Abdul. 2026. *SecurePatch Bench v0.1: Paired Functional and Security Oracles for Complete SaaS Vulnerability Remediation*. Version 0.1.0. Pcnaid Inc. Technical Report / Preprint.

## Suggested repository release title

```text
SecurePatch Bench v0.1.0 - Oracle-Validation Pilot
```

## Suggested repository release summary

```text
SecurePatch Bench v0.1.0 introduces nine synthetic TypeScript SaaS
security-repair scenarios across authorization, tenant isolation, and webhook
security. Each scenario contains separate functional and security oracles,
plus vulnerable, deliberately incomplete, and reference implementations for
benchmark validation. The v0.1 pilot rejects all 18 negative controls and
accepts all 9 reference repairs. This release contains no language-model
performance results.
```

## Suggested public paper page

The public page should provide:

- the complete title and author;
- the technical-report/preprint label;
- publication date and version;
- abstract;
- PDF and accessible HTML or Markdown links;
- repository and tagged-release links;
- license information;
- citation text or BibTeX;
- a clear statement that v0.1 contains no model evaluation;
- a correction and contact policy; and
- the responsible-use statement.

## Form wording after publication

After the repository and paper are publicly available at stable URLs, the following description is supportable:

> Published SecurePatch Bench v0.1, a public technical report and open-source defensive benchmark using paired functional and security oracles to evaluate complete repair of authorization, tenant-isolation, and webhook-security defects in synthetic TypeScript SaaS systems. The initial report validates benchmark behavior and does not claim language-model performance.

## Corrections

Material errors should be corrected in all of the following places:

- repository default branch;
- release notes;
- PDF and Markdown report;
- public landing page;
- archive or preprint record, when the service supports versioning; and
- `CHANGELOG.md`.

Retain prior tagged releases unless removal is required for security, privacy, licensing, or legal reasons. Document substantive corrections rather than silently replacing historical claims.
