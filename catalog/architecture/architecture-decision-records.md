---
id: SDLC-0005
slug: architecture-decision-records
title: Architecture Decision Records
summary: A short, numbered, immutable document per significant architectural decision recording the context, the choice, and the consequences, superseded rather than edited when the decision changes.
category: architecture
lifecycle_phase: [design]
adoption_level: 2
effort: low
automatable: none
applies_to: [any]
tags: [architecture, documentation]
sources:
  - title: "Architecture Decision Records (adr.github.io)"
    url: https://adr.github.io/
    type: practice-report
  - title: "ISO/IEC/IEEE 42010, Architecture description"
    url: https://www.iso.org/standard/74393.html
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Record why, not just what. Six months later the diagram survives and the reasoning does
not, so every revisit re-argues a decision somebody already made carefully.

## Examples

- `docs/adr/0007-use-postgres-not-dynamodb.md`, with context, decision, and consequences.
- ADR 0012 marked `superseded by 0031` when the team later moved off that database.

## What Good Looks Like

A new engineer can read the ADR directory in an hour and understand the shape of the system
and the constraints that produced it. Rejected options are recorded with why.

## Best Practices

- One decision per file, numbered, in the repository next to the code.
- Never edit a decided ADR. Write a new one that supersedes it.
- Record the options you rejected and the reason; that is most of the value.
- Keep it to a page. An ADR nobody writes because it is a chore records nothing.

## Automation

N/A — writing down a reason is the work, and it cannot be generated from the code.

## Signals & Metrics

N/A — count of ADRs measures activity, not quality, and would reward padding.

## Anti-Patterns

- Editing history, so the record shows only the current answer.
- ADRs for trivia, which buries the handful that matter.
- Keeping them in a wiki disconnected from the code they describe.

## Tooling

`adr-tools`, `log4brains`, or a `docs/adr/` directory and a template file.

## Getting Started

Create `docs/adr/0001-record-architecture-decisions.md` explaining that you are doing this,
then write the next real decision up as 0002.

## References

Rendered from `sources` at build time.
