# Governance

SecurePatch Bench is maintained by Pcnaid Inc. as an open defensive research project.

## Roles

- **Maintainer:** approves releases, licensing, safety boundaries, and final scenario acceptance.
- **Scenario reviewer:** checks the security invariant, mappings, and negative controls.
- **Test reviewer:** checks determinism, functional preservation, and oracle independence.
- **Contributor:** proposes code, scenarios, documentation, or research changes.

One person may hold more than one role in early releases. Material research claims should still receive a second-person review before being described as independently validated.

## Decision standard

Changes are accepted based on technical evidence, reproducibility, defensive value, legal authorization, and maintainability. Commercial relationships, vendor status, or institutional affiliation do not override the benchmark criteria.

## Release process

A release requires:

1. successful CI on Node.js 22;
2. manifest validation;
3. negative controls rejected and reference repairs accepted;
4. updated benchmark card, results, changelog, and citation metadata;
5. a security and provenance review;
6. a signed or otherwise attributable release tag.

## Conflicts and disclosure

Contributors should disclose relationships that could materially affect interpretation of a model, vendor, dataset, or result. Such relationships do not automatically disqualify a contribution but must not be hidden.

## Changes to governance

Governance changes are reviewed through a public pull request and recorded in the changelog.
