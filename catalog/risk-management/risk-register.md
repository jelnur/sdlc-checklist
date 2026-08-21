---
id: SDLC-0022
slug: risk-register
title: Risk Register
summary: A maintained list of identified risks with likelihood, impact, a named owner and a chosen response, reviewed on a schedule so accepted risks stay visible instead of quietly becoming permanent.
category: risk-management
lifecycle_phase: [plan, govern]
adoption_level: 2
effort: low
automatable: none
applies_to: [any]
tags: [risk]
sources:
  - title: "ISO 31000:2018, Risk management — Guidelines"
    url: https://www.iso.org/standard/65694.html
    type: standard
  - title: "ISO/IEC/IEEE 12207:2017, Software life cycle processes"
    url: https://www.iso.org/standard/63712.html
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Make the risks you have decided to live with visible and owned. Undocumented risk is
indistinguishable from risk nobody noticed, and both surface at the same moment.

## Examples

- A register row: single-region database, likelihood low, impact severe, owner named, response
  "accept until Q4, multi-region work scheduled", review date set.
- A quarterly review where each row is confirmed, changed, closed, or escalated.

## What Good Looks Like

Every row has one named person, not a team. Each has a chosen response — avoid, reduce,
transfer or accept — and a review date. The register is short enough to be read in full at
review.

## Best Practices

- One named owner per risk. A risk owned by a team is owned by nobody.
- Record the chosen response, not just the description.
- Give every accepted risk a review date, and treat an overdue one as a finding.
- Keep it short. A register of two hundred rows is not reviewed, it is archived.
- Link each risk to the mitigation work in the normal tracker so it can be scheduled.

## Automation

N/A — identifying and judging risk is the practice; a tool can only store the result.

## Signals & Metrics

Count of risks past their review date, share of rows with a named owner, and risks that
materialised while sitting in the register versus those that were never recorded.

## Anti-Patterns

- A register written for an audit and not opened again.
- Rows owned by a department.
- Everything rated high, which conveys no ordering.
- Accepted risks with no review date, which is how a temporary compromise becomes the
  architecture.

## Tooling

A tracked issue type with `likelihood` and `impact` fields, a spreadsheet under version
control, or the risk module of an existing GRC tool.

## Getting Started

List the five things most likely to hurt you in the next six months, give each one an owner, a
response and a review date, and put the review in the calendar.

## References

Rendered from `sources` at build time.
