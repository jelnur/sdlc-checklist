---
id: SDLC-0021
slug: open-source-license-compliance
title: Open Source License Compliance
summary: Identifying the licence of every third-party component you ship, checking it against a written policy in the build, and producing the attribution the licences require.
category: governance
lifecycle_phase: [build, govern]
adoption_level: 3
effort: medium
automatable: full
applies_to: [any]
tags: [compliance, supply-chain]
sources:
  - title: "OpenChain (ISO/IEC 5230) licence compliance"
    url: https://openchainproject.org/license-compliance
    type: standard
  - title: "SPDX (ISO/IEC 5962)"
    url: https://spdx.dev/
    type: standard
status: draft
---

## Purpose

Avoid shipping a component whose licence terms you cannot meet, and produce the notices those
licences require. This is cheap in the build and expensive at acquisition due diligence.

## Examples

- A CI check that fails the build when a dependency introduces a copyleft licence not on the allowlist.
- A generated `NOTICES` file, shipped with the artifact, listing each component's licence and attribution.

## What Good Looks Like

There is a written policy naming allowed, review-required and forbidden licences. It is enforced
in the build rather than at review time, attribution is generated rather than maintained by
hand, and transitive and container-base components are in scope.

## Best Practices

- Write the policy down first, including who decides on an exception.
- Enforce in CI on the dependency graph, not by manual audit.
- Cover transitive dependencies and container base images.
- Generate attribution from the same data that drives enforcement.
- Record exceptions with a reason and an owner, so the list stays reviewable.

## Automation

Fully automatable: licence detection from the dependency graph, policy checks in CI, and
attribution generation.

## Signals & Metrics

Share of components with an identified licence, policy violations caught in CI, count and age of
open exceptions, and components whose licence could not be determined.

## Anti-Patterns

- No written policy, so each case is decided ad hoc by whoever noticed.
- Auditing once before a funding round rather than continuously.
- Direct dependencies only, missing the transitive tail where the surprises are.
- A hand-maintained attribution file that stopped matching the build long ago.

## Tooling

FOSSA, Snyk, `license-checker`, `pip-licenses`, ScanCode or OSS Review Toolkit; SPDX or
CycloneDX documents as the shared data format.

## Getting Started

Write a one-page policy listing allowed and forbidden licences, run a licence scanner over your
main service's dependency graph, and add the check to CI once the current violations are
resolved or accepted.

## References

Rendered from `sources` at build time.
