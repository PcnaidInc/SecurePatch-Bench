# Responsible Use

SecurePatch Bench supports lawful defensive research and secure software development.

## Required boundaries

- Use only the provided synthetic scenarios or systems you own or have explicit authorization to assess.
- Run untrusted candidates with least privilege and no production credentials.
- Do not expose model or agent tools to unrestricted networks by default.
- Do not publish sensitive details of an accidental third-party vulnerability before coordinated disclosure.
- Keep human approval before applying a generated patch to a production system.
- Treat benchmark success as evidence about these scenarios, not as a guarantee of general security.

## Publication guidance

Report the exact benchmark version, commit, Node version, candidate/model identifier, prompt/context conditions, tool permissions, repetitions, failures, and exclusions. Separate oracle-validation results from model-evaluation results.

## Prohibited project use

The maintainers do not authorize adapting this project for credential theft, persistence, malware deployment, service disruption, unauthorized exploitation, mass scanning, or targeting real organizations without written permission.
