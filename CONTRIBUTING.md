# Contributing to SecurePatch Bench

Thank you for helping improve defensive software-repair evaluation.

## Contribution principles

Every contribution must be:

1. **Lawful and authorized.** Do not submit customer code, credentials, personal data, active exploitation instructions, or artifacts taken from systems you were not authorized to assess.
2. **Defensive and reproducible.** Scenarios should teach or measure safe remediation, not enable targeting of live third-party systems.
3. **Paired-oracle.** A valid scenario must include functional tests that preserve legitimate behavior and security tests that enforce the stated invariant.
4. **Independently reviewable.** The manifest, scenario code, test names, and expected behaviors must make the intended boundary clear.
5. **Minimal and synthetic by default.** Prefer newly written compact applications over copied production projects.

## Development setup

```bash
npm ci
npm run ci
```

Node.js 22 or later is required.

## Adding a scenario

Create:

```text
scenarios/<category>/<scenario-id>/manifest.json
scenarios/<category>/<scenario-id>/scenario.ts
```

The scenario module must export:

```ts
export const variants = {
  vulnerable: () => candidate,
  naive: () => candidate,
  reference: () => candidate,
};

export const harness = {
  runFunctional,
  runSecurity,
};
```

The three variants serve different validation roles:

- `vulnerable` preserves ordinary behavior while violating the security invariant;
- `naive` is a plausible but deliberately incomplete repair;
- `reference` satisfies all functional and security tests.

A pull request must demonstrate:

- vulnerable and naive variants fail at least one security test;
- all legitimate functional tests still pass for all built-in variants unless the manifest explicitly documents otherwise;
- the reference variant passes every test;
- the scenario contains no real secret, personal data, or live target information;
- `npm run ci` succeeds.

## Security mappings

Map only to standards that directly fit the scenario. CWE and OWASP identifiers are descriptive metadata, not certification or endorsement.

## Pull requests

Use a focused title and explain:

- the security invariant;
- why the visible functional tests are insufficient by themselves;
- which incomplete repair the naive variant represents;
- how the hidden/security tests reject that repair;
- the legal source and license of any external artifact.

## Licensing

By submitting a contribution, you agree that source code may be distributed under Apache-2.0 and original research/documentation may be distributed under CC BY 4.0 unless clearly identified otherwise.
