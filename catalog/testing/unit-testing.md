---
id: SDLC-0011
slug: unit-testing
title: Unit Testing
summary: Fast, isolated automated tests over a single unit of code, run on every commit, forming the base of the test suite because they are the cheapest place to find a defect.
category: testing
lifecycle_phase: [build, verify]
adoption_level: 1
effort: medium
automatable: full
applies_to: [any]
tags: [testing, code-quality]
sources:
  - title: "ISTQB Certified Tester Foundation Level Syllabus v4.0"
    url: https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/
    type: standard
  - title: "Martin Fowler, UnitTest"
    url: https://martinfowler.com/bliki/UnitTest.html
    type: practice-report
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Catch defects at the cheapest point in the lifecycle, and make refactoring safe by pinning
behaviour before it is changed.

## Examples

- A pure function tested across its boundary values, including the empty and error cases.
- A table-driven test covering a state machine's legal and illegal transitions in one file.

## What Good Looks Like

The whole unit suite runs in seconds, developers run it before pushing, and a failure names
the broken behaviour rather than requiring a debugger to interpret.

## Best Practices

- Test behaviour through the public interface, not private implementation detail.
- One reason to fail per test, so the name tells you what broke.
- Keep them deterministic: no clock, network, filesystem or random input without control.
- Cover boundaries and error paths, which is where the defects actually are.
- Treat a flaky unit test as a defect in the test, and fix or delete it the same day.

## Automation

Fully automatable: runners, watch mode, coverage reporting, and mutation testing in CI.

## Signals & Metrics

Suite runtime, pass rate, flaky-test count, mutation score, and coverage read as a diagnostic
rather than a target.

## Anti-Patterns

- Coverage as a target, which produces assertion-free tests that execute lines.
- Tests coupled to implementation detail, so every refactor breaks them.
- Slow "unit" tests that reach a real database, so nobody runs them locally.
- Deleting or skipping a failing test to unblock a merge.

## Tooling

Vitest or Jest, pytest, JUnit, `go test`, RSpec; Stryker or `mutmut` for mutation testing.

## Getting Started

Pick the function that has caused the most production bugs, write tests for its boundary and
error cases, and wire the suite into CI as a required check.

## References

Rendered from `sources` at build time.
