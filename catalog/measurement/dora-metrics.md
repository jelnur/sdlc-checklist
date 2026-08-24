---
id: SDLC-0020
slug: dora-metrics
title: DORA Metrics
summary: Tracking deployment frequency, lead time for changes, change failure rate and failed deployment recovery time together, as a diagnostic of delivery performance rather than as individual targets.
category: measurement
lifecycle_phase: [operate, govern]
adoption_level: 2
effort: medium
automatable: full
applies_to: [any]
tags: [metrics]
sources:
  - title: "Forsgren, Humble & Kim, Accelerate"
    url: https://itrevolution.com/product/accelerate/
    type: book
  - title: "DORA, DORA metrics"
    url: https://dora.dev/guides/dora-metrics/
    type: practice-report
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Get an evidence-based read on delivery performance. The four measures work as a set because
throughput and stability constrain each other; either one alone is easy to improve by making
the other worse.

## Examples

- A dashboard computing all four from deployment events and incident records, per team, updated weekly.
- Lead time measured from first commit to production release, so the queueing between stages is visible.

## What Good Looks Like

All four are reported together, derived automatically from systems of record, at team level,
and read as a trend to prompt investigation rather than as a score to hit.

## Best Practices

- Report all four. A pair of throughput measures without the stability pair invites gaming.
- Derive them from existing events, so nobody is reporting them by hand.
- Report per team and per service; a company-wide average hides everything useful.
- Use them to ask questions, not to rank teams.
- Define each measure explicitly and keep the definition stable, or the trend is meaningless.

## Automation

Fully automatable from deployment pipelines, version control and the incident tracker.

## Signals & Metrics

Deployment frequency, lead time for changes, change failure rate, and time to restore service
after a failed deployment.

## Anti-Patterns

- Individual targets on one measure, most often deployment frequency, which is trivially gamed.
- Using the metrics to compare or rank individuals.
- Hand-collected numbers, which are late, inconsistent and quietly abandoned.
- Reporting a single organisation-wide average.
- Changing a definition mid-stream, which resets the trend without saying so.

## Tooling

Four Keys, DevLake, Sleuth, LinearB, or a query over deployment events and incidents from your
own CI and incident tools.

## Getting Started

Compute deployment frequency and change failure rate for one team from data you already have in
CI and your incident tracker, then add the other two before anyone is shown the numbers.

## References

Rendered from `sources` at build time.
