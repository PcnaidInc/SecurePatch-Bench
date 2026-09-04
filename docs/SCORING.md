# Scoring Specification

## Test suites

Each candidate receives two independent suite summaries:

- **Functional:** legitimate behavior and compatibility.
- **Security:** adversarial cases and the declared security invariant.

## Diagnostic score

```text
score = 0.40 * functional_pass_rate + 0.60 * security_pass_rate
```

The score is rounded to four decimal places. Security receives higher diagnostic weight because the benchmark targets security remediation, but functional preservation remains mandatory.

## Verified repair

```text
verifiedRepair = functional.failed == 0 AND security.failed == 0
```

There is no threshold override. A score of 0.90 is still a failed repair when one security test fails.

## Why both values are reported

The weighted score helps compare partial progress and identify where an incomplete candidate improved. The verified-repair gate prevents a high average from concealing a remaining exploitable path or a functional regression.

## Future metrics

Later releases may add:

- patch application and build success;
- touched-file and changed-line counts;
- security-test coverage by invariant;
- semantic-equivalence review;
- confidence calibration and abstention;
- time, token, and monetary cost;
- repeated-run success and variance;
- unsafe action or scope-violation rate.
