# Threat Model

## Assets protected by the benchmark

- tenant-confidential records and exports;
- workspace administration boundaries;
- integrity of bulk administrative changes;
- cache and repository tenant bindings;
- asynchronous job identity and integrity;
- object-storage tenant prefixes;
- webhook authenticity, integrity, freshness, replay state, and key lifecycle;
- legitimate application behavior that must survive a repair.

## Adversary model

The synthetic adversary may control identifiers, selected request fields, queue payload fields, object prefixes, webhook bodies, timestamps, event identifiers, and key identifiers. The adversary may be authenticated as an ordinary user or administrator in a different scope. The adversary does not possess unrestricted host access or valid signing secrets unless a scenario explicitly tests lifecycle misuse.

## Trust boundaries

- authenticated actor to service method;
- tenant-scoped service to repository/cache/storage;
- producer to asynchronous worker;
- external webhook sender to receiver;
- key store to verification logic;
- patch candidate to benchmark harness.

## Benchmark-specific threats

- **Oracle under-specification:** a bad patch passes because tests omit a material path.
- **Overfitting:** a candidate special-cases visible values instead of enforcing the invariant.
- **Functional regression:** an exploit is blocked by disabling legitimate behavior.
- **Test contamination:** a model has direct access to hidden tests or reference code.
- **Non-determinism:** timing, network, or environmental state changes a result.
- **Supply-chain risk:** dependencies or runners execute untrusted code with excessive privilege.

## Mitigations

- paired functional/security tests;
- explicit invariant and naive negative control;
- all-tests verification gate;
- synthetic fixtures and deterministic clocks where needed;
- bounded local execution;
- no network access required for scenario evaluation;
- versioned manifests and result metadata;
- future separation of public task context from evaluator-only tests.
