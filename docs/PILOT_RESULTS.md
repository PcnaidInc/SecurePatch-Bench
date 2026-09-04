# SecurePatch Bench v0.1 Pilot Results

Generated: 2026-09-04T05:01:43.778Z

## Scope

- Scenarios: 9
- Evaluations: 27
- Runtime: v22.16.0 on linux/x64

## Oracle validation

- Negative controls rejected: 18/18
- Reference repairs accepted: 9/9

## Results by variant

| Variant | Verified repairs | Functional tests | Security tests |
|---|---:|---:|---:|
| vulnerable | 0/9 | 11/11 | 8/33 |
| naive | 0/9 | 11/11 | 18/33 |
| reference | 9/9 | 11/11 | 33/33 |

## Scenario detail

| Scenario | Variant | Functional | Security | Verified | Score |
|---|---|---:|---:|:---:|---:|
| `authorization/bulk-user-disable` | vulnerable | 1/1 | 0/3 | no | 0.4000 |
| `authorization/bulk-user-disable` | naive | 1/1 | 1/3 | no | 0.6000 |
| `authorization/bulk-user-disable` | reference | 1/1 | 3/3 | yes | 1.0000 |
| `authorization/order-export-idor` | vulnerable | 2/2 | 0/3 | no | 0.4000 |
| `authorization/order-export-idor` | naive | 2/2 | 2/3 | no | 0.8000 |
| `authorization/order-export-idor` | reference | 2/2 | 3/3 | yes | 1.0000 |
| `authorization/workspace-admin-boundary` | vulnerable | 1/1 | 1/3 | no | 0.6000 |
| `authorization/workspace-admin-boundary` | naive | 1/1 | 2/3 | no | 0.8000 |
| `authorization/workspace-admin-boundary` | reference | 1/1 | 3/3 | yes | 1.0000 |
| `tenant-isolation/cache-key-and-lookup` | vulnerable | 1/1 | 1/3 | no | 0.6000 |
| `tenant-isolation/cache-key-and-lookup` | naive | 1/1 | 1/3 | no | 0.6000 |
| `tenant-isolation/cache-key-and-lookup` | reference | 1/1 | 3/3 | yes | 1.0000 |
| `tenant-isolation/object-storage-prefix` | vulnerable | 1/1 | 1/4 | no | 0.5500 |
| `tenant-isolation/object-storage-prefix` | naive | 1/1 | 2/4 | no | 0.7000 |
| `tenant-isolation/object-storage-prefix` | reference | 1/1 | 4/4 | yes | 1.0000 |
| `tenant-isolation/queue-job-binding` | vulnerable | 1/1 | 0/3 | no | 0.4000 |
| `tenant-isolation/queue-job-binding` | naive | 1/1 | 1/3 | no | 0.6000 |
| `tenant-isolation/queue-job-binding` | reference | 1/1 | 3/3 | yes | 1.0000 |
| `webhooks/replay-window` | vulnerable | 1/1 | 1/4 | no | 0.5500 |
| `webhooks/replay-window` | naive | 1/1 | 2/4 | no | 0.7000 |
| `webhooks/replay-window` | reference | 1/1 | 4/4 | yes | 1.0000 |
| `webhooks/secret-rotation` | vulnerable | 2/2 | 3/6 | no | 0.7000 |
| `webhooks/secret-rotation` | naive | 2/2 | 5/6 | no | 0.9000 |
| `webhooks/secret-rotation` | reference | 2/2 | 6/6 | yes | 1.0000 |
| `webhooks/signature-coverage` | vulnerable | 1/1 | 1/4 | no | 0.5500 |
| `webhooks/signature-coverage` | naive | 1/1 | 2/4 | no | 0.7000 |
| `webhooks/signature-coverage` | reference | 1/1 | 4/4 | yes | 1.0000 |

> These figures validate the benchmark oracles against intentionally vulnerable, deliberately incomplete, and reference implementations. They are not an evaluation of any language model.

