---
id: SDLC-0004
slug: usability-testing
title: Usability Testing
summary: Watching a representative user attempt a real task in the product without help, to find where the design fails rather than asking people whether they like it.
category: ux
lifecycle_phase: [design, verify]
adoption_level: 2
effort: medium
automatable: partial
applies_to: [web, mobile]
tags: [ux, testing]
sources:
  - title: "ISO 9241-210:2019, Human-centred design for interactive systems"
    url: https://www.iso.org/standard/77520.html
    type: standard
  - title: "Nielsen Norman Group, Usability Testing 101"
    url: https://www.nngroup.com/articles/usability-testing-101/
    type: practice-report
status: draft
---

## Purpose

Find out whether people can use the thing, by watching them try. Opinions collected in a
survey and behaviour observed under task are frequently different.

## Examples

- Five people asked to complete signup on a prototype while the researcher stays silent.
- An unmoderated remote test where the task and the screen recording are collected asynchronously.

## What Good Looks Like

Findings arrive early enough to change the design, participants resemble actual users, and
the facilitator does not rescue anyone mid-task.

## Best Practices

- Give a task, not a tour. "Buy a blue shirt" beats "what do you think of this page".
- Stay quiet. The moment you help, you have destroyed the finding.
- A handful of participants per round, run often, beats one large study run late.

## Automation

Session recording, click and rage-click analytics, and unmoderated test platforms automate
collection. Interpreting why someone hesitated does not automate.

## Signals & Metrics

Task completion rate, time on task, error and recovery counts, and the number of findings
that resulted in a design change.

## Anti-Patterns

- Testing after launch, when the finding can no longer change anything.
- Recruiting colleagues, who already know how the product works.
- Leading questions that collect agreement rather than behaviour.

## Tooling

Maze, UserTesting, Lookback, Hotjar, or a screen recorder and a video call.

## Getting Started

Pick the single most important task in your product, recruit five people who match your
users, and watch each of them attempt it without help.

## References

Rendered from `sources` at build time.
