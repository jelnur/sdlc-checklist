---
id: SDLC-0023
slug: security-champions
title: Security Champions
summary: A named engineer inside each delivery team given time, training and a direct line to the security team, so security review scales with the number of teams rather than the size of the security team.
category: education
lifecycle_phase: [govern]
adoption_level: 4
effort: medium
automatable: none
applies_to: [any]
tags: [training, security]
sources:
  - title: "OWASP Security Champions Guide"
    url: https://owasp.org/www-project-security-champions-guidebook/
    type: practice-report
  - title: "OWASP SAMM: Education & Guidance"
    url: https://owaspsamm.org/model/governance/education-and-guidance/
    type: standard
status: draft
---

## Purpose

Break the bottleneck. A central security team cannot review every change in every team, so put
someone with the context and the training inside each team instead.

## Examples

- One engineer per squad who runs the team's threat-modelling session and triages its dependency alerts, with a standing hour a week for it.
- A monthly champions forum where findings and fixes from one team reach the others.

## What Good Looks Like

Champions volunteer rather than being assigned, they have explicitly allocated time, and the
role has a defined scope. Teams with a champion resolve their own findings without escalating
by default.

## Best Practices

- Ask for volunteers. A conscripted champion is a name on a list.
- Allocate the time explicitly, or it loses to delivery work every week.
- Define what the role does and does not cover, so it does not become a dumping ground.
- Give them training and a real channel to the security team.
- Run a regular forum so lessons cross team boundaries.
- Recognise it in performance review, or the role costs the volunteer.

## Automation

N/A — this is an organisational structure and a training investment, not a mechanism to
automate.

## Signals & Metrics

Share of teams with an active champion, time to resolve security findings in teams with and
without one, champion retention, and threat models run without central involvement.

## Anti-Patterns

- Appointing a champion with no time allocated.
- The champion becoming the only person in the team who cares about security.
- No path back to the security team, leaving the champion isolated.
- Using the role as a way to shift accountability off the security team without shifting support with it.

## Tooling

N/A — a shared channel and a calendar entry are sufficient; nothing needs installing.

## Getting Started

Ask for one volunteer in the team that files the most security questions, allocate them an hour
a week, and give them a standing slot with the security team.

## References

Rendered from `sources` at build time.
