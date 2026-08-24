---
id: SDLC-0013
slug: load-testing
title: Load Testing
summary: Driving a realistic, scripted workload at a production-like environment to find where latency, throughput or resource use stops meeting the stated target, before real traffic does.
category: performance
lifecycle_phase: [verify]
adoption_level: 3
effort: high
automatable: full
applies_to: [web, backend, data]
tags: [performance, testing]
sources:
  - title: "ISO/IEC 25010, Systems and software quality models"
    url: https://www.iso.org/standard/78176.html
    type: standard
  - title: "Grafana k6 testing guides"
    url: https://grafana.com/docs/k6/latest/testing-guides/
    type: vendor-doc
  - title: "Grafana, Types of load testing"
    url: https://grafana.com/load-testing/types-of-load-testing/
    type: vendor-doc
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Establish the point at which the system stops meeting its performance target, and learn what
breaks first, on a schedule you chose rather than during a launch.

## Examples

- A k6 script replaying the real ratio of read to write endpoints at two times peak traffic.
- A soak test held at expected load for eight hours to expose a memory leak that a ten-minute run cannot.

## What Good Looks Like

There is a written target to test against, the environment resembles production including
data volume, and results are compared run over run rather than read once.

## Best Practices

- Write the target down first. Without a number, the result is unreadable.
- Model the real traffic mix and think time; uniform requests to one endpoint measure nothing useful.
- Use production-like data volume. Query plans change with table size.
- Report percentiles, not averages, and record the resource ceiling that was hit.
- Run it on a schedule so regressions surface as a trend.

## Automation

Fully automatable: scripted scenarios in CI or nightly, with thresholds that fail the run and
results stored for comparison.

## Signals & Metrics

Latency percentiles at each load level, throughput at the target percentile, error rate under
load, saturation of the first resource to run out, and drift between runs.

## Anti-Patterns

- Testing against a laptop or an empty database, then being surprised in production.
- Reporting average latency, which hides the tail entirely.
- One test before launch and never again.
- Load-testing without a stated target, producing a number nobody can act on.

## Tooling

k6, Gatling, Locust, JMeter, or Vegeta; paired with the service's own metrics so you can see
what saturated.

## Getting Started

Write down one target for your busiest endpoint, script that endpoint's real traffic mix in
k6, and run it against a production-like environment until the target is missed.

## References

Rendered from `sources` at build time.
