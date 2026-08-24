---
id: SDLC-0010
slug: continuous-integration
title: Continuous Integration
summary: Every commit to the shared branch triggers an automated build and test run, so the codebase is verified continuously rather than at the end of a release cycle.
category: build
lifecycle_phase: [build]
adoption_level: 1
effort: medium
automatable: full
applies_to: [any]
tags: [continuous-integration, automation]
sources:
  - title: "Martin Fowler, Continuous Integration"
    url: https://martinfowler.com/articles/continuousIntegration.html
    type: practice-report
  - title: "Humble & Farley, Continuous Delivery"
    url: https://continuousdelivery.com/
    type: book
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Find integration failures within minutes of the commit that caused them, while the author
still remembers the change and the diff is still small.

## Examples

- A GitHub Actions workflow that builds, lints and tests on every push and pull request.
- A pipeline that produces one immutable artifact and reuses it for every later stage rather than rebuilding per environment.

## What Good Looks Like

The main branch is nearly always green, the pipeline finishes fast enough that people wait
for it, and a red build is fixed before anything else.

## Best Practices

- Build once, then promote the same artifact; rebuilding per environment loses the guarantee.
- Keep the pipeline fast. Above roughly ten minutes people stop waiting and start batching.
- Make the build reproducible and self-contained, with pinned dependencies.
- Fix a broken build before merging anything else.
- Delete or quarantine flaky tests; a suite people distrust is not a gate.

## Automation

Fully automatable, and that is the point: hooks, runners, caching, and required status
checks.

## Signals & Metrics

Pipeline duration and its p95, build success rate on the default branch, time to green after
a break, and flaky-test rate.

## Anti-Patterns

- A nightly build presented as CI, which delays feedback by a day.
- Ignoring or muting failures to keep merging.
- Manual steps in the middle of the pipeline.
- Rebuilding the artifact separately for each environment.

## Tooling

GitHub Actions, GitLab CI, Jenkins, Buildkite, CircleCI; Nix, Bazel or Docker for
reproducible builds; Turborepo or Gradle build caches for speed.

## Getting Started

Add one workflow that installs pinned dependencies, builds, and runs the test suite on every
push, and make it a required check on the default branch.

## References

Rendered from `sources` at build time.
