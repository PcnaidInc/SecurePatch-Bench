# Dataset and Manifest Schema

Every scenario has a `manifest.json` conforming to [`schemas/scenario-manifest.schema.json`](../schemas/scenario-manifest.schema.json).

## Required fields

- `schemaVersion`: manifest contract version.
- `id`: `<category>/<scenario-slug>`.
- `title`: human-readable name.
- `category`: `authorization`, `tenant-isolation`, or `webhooks`.
- `version`: scenario semantic version.
- `language` and `runtime`: currently TypeScript and Node.js.
- `cwes`: applicable MITRE CWE identifiers.
- `owaspMappings`: applicable OWASP API Security mappings.
- `summary`: concise defect description.
- `securityInvariant`: the condition every accepted repair must enforce.
- `visibleBehavior`: legitimate behavior that must continue to work.
- `securityOracle`: security behaviors tested by the evaluator.
- `variants`: descriptions of vulnerable, naive, and reference candidates.
- `safeUse`: authorization and safety boundary.
- `license`: scenario code license.

## Result schema

Pilot output includes environment metadata, counts by variant, oracle-validation totals, and per-scenario suite results. Each test records its name, kind, pass/fail state, duration, and optional failure detail.
