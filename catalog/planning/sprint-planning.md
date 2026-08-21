---
id: SDLC-0002
slug: sprint-planning
title: Sprint Planning
summary: A fixed-length session where the team agrees what it will deliver in the coming iteration and how, producing a commitment small enough to be believable.
category: planning
lifecycle_phase: [plan]
adoption_level: 1
effort: low
automatable: none
applies_to: [any]
tags: [planning, agile]
sources:
  - title: "The Scrum Guide (2020)"
    url: https://scrumguides.org/scrum-guide.html
    type: standard
  - title: "Manifesto for Agile Software Development"
    url: https://agilemanifesto.org/
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Turn a ranked backlog into a specific, bounded commitment for one iteration, so that
everyone knows what is in scope and what is not.

## Examples

- A two-week sprint planning session that selects backlog items up to the team's recent
  throughput and stops there.
- Quarterly planning that fixes objectives while leaving the item-level selection to each
  iteration.

## What Good Looks Like

Anyone on the team can state the iteration goal from memory, and the selected items were
sized against real recent throughput rather than optimism.

## Best Practices

- Let the team, not a manager, decide how much it takes on.
- Pull from a backlog that was already ordered before the session starts.
- Name one iteration goal, so mid-iteration trade-offs have something to be judged against.

## Automation

N/A — this is a negotiation between people; tooling can track the outcome but cannot make
the commitment.

## Signals & Metrics

Planned versus completed items per iteration, and how often scope is added mid-iteration.

## Anti-Patterns

- Capacity set by a manager and handed to the team.
- Planning against a backlog nobody ordered beforehand, so the session becomes triage.
- A commitment that has never once been met, which teaches everyone to ignore it.

## Tooling

Any issue tracker with an iteration or sprint field: Jira, Linear, GitHub Projects.

## Getting Started

Run one session: order the backlog first, pick items totalling no more than what the team
finished last iteration, and write down a single goal.

## References

Rendered from `sources` at build time.
