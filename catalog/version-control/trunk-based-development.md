---
id: SDLC-0007
slug: trunk-based-development
title: Trunk-Based Development
summary: Everyone commits to a single shared branch at least daily, with short-lived branches and feature flags instead of long-running ones, so integration conflicts stay small enough to be trivial.
category: version-control
lifecycle_phase: [build]
adoption_level: 2
effort: medium
automatable: partial
applies_to: [any]
tags: [version-control, continuous-integration]
sources:
  - title: "Trunk Based Development"
    url: https://trunkbaseddevelopment.com/
    type: practice-report
  - title: "Forsgren, Humble & Kim, Accelerate"
    url: https://itrevolution.com/product/accelerate/
    type: book
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Keep merges small by keeping them frequent. Branch lifetime and merge pain grow together,
and the fix is to shorten the branch rather than get better at merging.

## Examples

- Branches that live under a day and merge behind a feature flag when the work is not finished.
- A release branch cut from trunk for a versioned product, with fixes cherry-picked from trunk rather than developed on the branch.

## What Good Looks Like

Trunk is always releasable, branches rarely reach two days old, and nobody schedules a
"merge week".

## Best Practices

- Merge to trunk at least daily, per engineer.
- Hide unfinished work behind a flag rather than behind a branch.
- Keep trunk green; a broken trunk blocks everyone and is the top priority to fix.
- Branch by abstraction for changes too large to flag.

## Automation

Branch-age reporting, merge queues, and required status checks on trunk automate the
enforcement. Feature-flag hygiene needs a human owner.

## Signals & Metrics

Mean and maximum branch age, merges to trunk per engineer per day, trunk red time, and the
count of flags older than their removal date.

## Anti-Patterns

- Long-lived feature branches, then a big-bang integration.
- Environment-per-branch workflows that make branches cheap to keep alive.
- Flags that outlive the feature and become permanent hidden configuration.

## Tooling

Git with branch protection, GitHub or GitLab merge queues, and a flag system such as
OpenFeature, Unleash, LaunchDarkly, or a config table.

## Getting Started

Pick a maximum branch age of two days, report on branches older than that once a week, and
introduce a flag mechanism so unfinished work has somewhere to hide.

## References

Rendered from `sources` at build time.
