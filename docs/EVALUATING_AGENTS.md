# Evaluating Models and Coding Agents

Version 0.1 provides the scenario and scoring substrate. A fair model study should add an adapter that compiles the candidate into a module exporting `createCandidate()`.

## Minimum controlled protocol

Record for every run:

- benchmark commit and release;
- scenario identifier;
- model and provider identifier;
- model version or snapshot when available;
- system and task prompts;
- files and test information visible to the model;
- tools, network access, and approval gates;
- temperature, effort, token limits, timeout, and retries;
- agent framework and version;
- candidate patch or source hash;
- test output, score, and verified-repair decision;
- latency, token usage, and estimated cost;
- whether a human intervened.

## Recommended conditions

1. Repository and task only.
2. Repository plus concise threat model.
3. Repository plus public tests and static-analysis evidence.
4. Repository plus an evidence protocol requiring the agent to state the invariant, patch minimally, add tests, execute checks, and report uncertainty.

Run at least three independent trials per scenario and condition. Do not expose reference implementations or evaluator-only tests to the candidate. Report refusals and invalid outputs rather than silently retrying until success.

## Custom candidate interface

After compiling a candidate module:

```bash
node dist/src/cli.js run-custom <scenario-id> ./candidate.js
```

A zero exit status means verified repair. Exit status `2` means the candidate ran but failed one or more tests. Other nonzero values indicate infrastructure or input errors.
