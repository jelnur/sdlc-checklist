---
id: SDLC-0024
slug: technical-debt-management
title: Technical Debt Management
summary: Recording deliberate design compromises as tracked, owned items with the interest they cost, and scheduling repayment as normal work rather than waiting for a rewrite that never gets approved.
category: maintenance
lifecycle_phase: [build, operate]
adoption_level: 3
effort: medium
automatable: partial
applies_to: [any]
tags: [maintenance, code-quality]
sources:
  - title: "Martin Fowler, TechnicalDebt"
    url: https://martinfowler.com/bliki/TechnicalDebt.html
    type: practice-report
  - title: "Ward Cunningham, The WyCash Portfolio Management System (OOPSLA '92)"
    url: http://c2.com/doc/oopsla92.html
    type: paper
status: draft
---

## Purpose

Make the cost of past shortcuts visible so it can be traded against new work. Debt that is not
recorded is paid anyway, as unexplained slowness, and nobody can point at the reason.

## Examples

- A tracked item: "auth logic duplicated across three services; every auth change costs three pull requests" — with the interest stated, not just the defect.
- A standing share of each iteration allocated to debt items chosen by the team.

## What Good Looks Like

Debt items name their ongoing cost, not only what is wrong. They sit in the same backlog as
feature work and are picked continuously, and the deliberate compromises are distinguished from
plain mistakes.

## Best Practices

- Record the interest: what this costs per change, per incident, or per onboarding.
- Distinguish a deliberate trade-off taken with reason from accidental mess; they need different responses.
- Repay continuously in small pieces. A big-bang rewrite proposal loses to feature work every time.
- Attach repayment to work already touching that code, which is when it is cheapest.
- Tie it to evidence — change failure rate, lead time, incident causes — so it argues for itself.

## Automation

Static analysis, complexity and duplication reporting, and change-coupling analysis of history
surface candidates. Deciding what is worth repaying does not automate.

## Signals & Metrics

Share of iteration capacity spent on debt items, age distribution of debt items, lead time and
change failure rate in the worst-affected modules, and incidents traced to a known recorded item.

## Anti-Patterns

- A separate "tech debt backlog" that is never prioritised against anything.
- Labelling every piece of code you dislike as debt, which drains the term of meaning.
- Waiting for a rewrite to be approved.
- Repaying debt in code nobody touches, which buys nothing.
- Fixing symptoms without recording the underlying compromise.

## Tooling

SonarQube or CodeScene for hotspot and complexity analysis; `code-maat` or `git-of-theseus` for
change coupling; the normal issue tracker with a label, which is the important part.

## Getting Started

Take the three parts of the system that slow you down most, write one tracked item each stating
what it costs per change, and commit a fixed slice of the next iteration to one of them.

## References

Rendered from `sources` at build time.
