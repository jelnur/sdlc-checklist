---
id: SDLC-0012
slug: threat-modeling
title: Threat Modeling
summary: A structured session over a design that asks what can go wrong and what will be done about each answer, producing tracked mitigations rather than a document.
category: security
lifecycle_phase: [design]
adoption_level: 3
effort: high
automatable: partial
applies_to: [any]
tags: [security, architecture]
sources:
  - title: "OWASP Threat Modeling Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
    type: practice-report
  - title: "OWASP SAMM: Threat Assessment"
    url: https://owaspsamm.org/model/design/threat-assessment/
    type: standard
  - title: "Microsoft Security Development Lifecycle"
    url: https://www.microsoft.com/en-us/securityengineering/sdl
    type: vendor-doc
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Find design-level security flaws while they are still cheap to fix. A missing authorisation
boundary is a diagram problem before it is a code problem, and no scanner will find it.

## Examples

- A one-hour session over a new payment flow's data-flow diagram, walking trust boundaries and filing each accepted risk as a ticket.
- Re-modelling an existing service when it gains its first external API.

## What Good Looks Like

Every mitigation is a tracked item with an owner, not a row in a document. The model is
revisited when the design changes, and engineers, not only the security team, can run the
session.

## Best Practices

- Draw the data-flow diagram first; you cannot reason about boundaries you have not drawn.
- Use a prompt framework such as STRIDE so coverage does not depend on who is in the room.
- Answer the four questions: what are we building, what can go wrong, what will we do, did we do a good job.
- File every finding as a tracked ticket, including the ones you accept, with the reason.
- Time-box it. A four-hour session that happens beats a perfect one that does not.

## Automation

Diagram-as-code and threat libraries automate parts of the record-keeping; `pytm` and
Threagile generate candidate threats from a described architecture. The reasoning about your
specific trust boundaries is the part that does not automate.

## Signals & Metrics

Share of new services modelled before launch, mitigations closed versus accepted, age of
accepted risks past their review date, and design-level findings later discovered in
production.

## Anti-Patterns

- A model produced once at design time and never revisited.
- Output that is a document rather than tracked work.
- Security-team-only sessions, which do not scale and do not transfer skill.
- Confusing a vulnerability scan with a threat model; they find different classes of problem.

## Tooling

OWASP Threat Dragon, Microsoft Threat Modeling Tool, `pytm`, Threagile, or a whiteboard and
the STRIDE prompts.

## Getting Started

Take the next new service, draw its data-flow diagram, spend an hour walking STRIDE across
each trust boundary, and file every finding as a ticket.

## References

Rendered from `sources` at build time.
