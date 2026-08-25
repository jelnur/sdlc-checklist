---
id: SDLC-0018
slug: blameless-postmortem
title: Blameless Postmortem
summary: A written review after an incident that establishes the timeline and contributing causes without attributing fault to individuals, producing tracked action items rather than a document.
category: incident-management
lifecycle_phase: [operate]
adoption_level: 2
effort: medium
automatable: none
applies_to: [any]
tags: [incident-response, reliability]
sources:
  - title: "Google SRE Book, Chapter 15: Postmortem Culture"
    url: https://sre.google/sre-book/postmortem-culture/
    type: book
  - title: "Google SRE Workbook, Implementing SLOs"
    url: https://sre.google/workbook/implementing-slos/
    type: book
status: draft
---

## Purpose

Convert an outage into a change. Blame is the mechanism that suppresses the information you
need: if naming what happened is career-risking, the account you get will be incomplete.

## Examples

- A postmortem covering timeline, impact, contributing causes, what went well, and action items with owners and dates.
- A postmortem for a near miss, where luck rather than design prevented an outage.

## What Good Looks Like

Postmortems are written for every incident above an agreed threshold, they are readable by
people outside the team, and their action items are tracked to completion at the same priority
as feature work.

## Best Practices

- Trigger it on objective criteria, not on how bad it felt.
- Describe systems and decisions, not people. "The deploy tool allowed X" beats "the engineer did X".
- Ask what made the wrong action look reasonable at the time.
- Every action item gets an owner and a date, in the normal tracker.
- Publish internally, and read the archive periodically; the pattern across ten postmortems is worth more than any one.
- Include what went well, so the things that worked are kept deliberately.

## Automation

N/A — timeline collection can be assisted by tooling, but the analysis is the practice and
cannot be generated.

## Signals & Metrics

Share of qualifying incidents with a postmortem, action items completed versus opened and
their age, and repeat incidents with the same contributing cause.

## Anti-Patterns

- A named individual as the root cause, which ends the investigation early.
- Action items with no owner, which are decoration.
- Postmortems filed and never read again.
- Skipping the near misses, which are free lessons.
- A single "root cause" for an incident that had several contributing ones.

## Tooling

An incident-management tool such as incident.io, FireHydrant, Rootly or PagerDuty; a document
template; the normal issue tracker for the action items.

## Getting Started

Write a postmortem for the last incident using a five-heading template, take every action item
into your tracker with an owner, and agree the threshold that triggers the next one.

## References

Rendered from `sources` at build time.
