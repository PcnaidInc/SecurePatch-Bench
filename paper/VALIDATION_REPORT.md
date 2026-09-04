# SecurePatch Bench v0.1 Validation Report

## Document QA

- PDF pages: 22
- Page size: US Letter
- PDF encryption: none
- Embedded PDF fonts: yes
- PDF outline/bookmarks: 62 items
- DOCX accessibility audit: 0 high-, medium-, or low-severity findings
- DOCX and PDF pages were rendered and visually reviewed after the final content update
- No clipped text, overlapping elements, broken tables, or missing-glyph defects were observed

## Benchmark QA

Validated with Node.js v22.16.0 and npm 10.9.2 on Linux x64.

- TypeScript typecheck: passed
- Automated tests: 2 passed, 0 failed
- Scenario manifests: 9 validated
- Built-in evaluations: 27
- Negative controls rejected: 18/18
- Reference repairs accepted: 9/9
- Functional tests passed by all built-in variants: 11/11 per variant
- Security tests: vulnerable 8/33; deliberately incomplete 18/33; reference 33/33
- Logical snapshot check: passed
- Generated Markdown report consistency check: passed

## Claims boundary

These results validate the benchmark implementation and its controlled negative and positive fixtures. They are not performance results for OpenAI, Anthropic, or any other language model, and they do not establish peer review or external endorsement.
