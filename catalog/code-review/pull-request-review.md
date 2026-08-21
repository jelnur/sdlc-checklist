---
id: SDLC-0009
slug: pull-request-review
title: Pull Request Review
summary: A second engineer reads and approves a change before it merges, with the review scoped small enough to be read properly and mechanical checks already handled by CI.
category: code-review
lifecycle_phase: [build, verify]
adoption_level: 1
effort: medium
automatable: partial
applies_to: [any]
tags: [review, code-quality]
sources:
  - title: "Google Engineering Practices: Code Review Developer Guide"
    url: https://google.github.io/eng-practices/review/
    type: practice-report
  - title: "Sadowski et al., Modern Code Review: A Case Study at Google"
    url: https://research.google/pubs/modern-code-review-a-case-study-at-google/
    type: paper
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Catch defects a machine cannot, and spread knowledge of the codebase past the one person who
wrote the change. Review is as much about the second reader as the first.

## Examples

- A 150-line pull request reviewed within a few hours by one owner of the affected area.
- A CODEOWNERS file routing changes in a sensitive directory to the team that maintains it.

## What Good Looks Like

Reviews turn around in hours, not days. Changes are small. Comments are about design,
correctness and clarity, because style and formatting were already settled by CI.

## Best Practices

- Keep changes small. Review quality falls sharply with size.
- Automate everything mechanical first, so humans read logic.
- Say what you want and why; distinguish a blocking objection from a preference.
- One reviewer who understands the area beats three who do not.
- Set an expected turnaround, because a slow review pushes people toward bigger batches.

## Automation

Assignment, ownership routing, required checks, and merge queues automate. Judging whether a
design is right does not.

## Signals & Metrics

Time to first review, pull request size distribution, review iterations per change, and the
share of changes merged with no substantive comment.

## Anti-Patterns

- Thousand-line pull requests, which get approved without being read.
- Rubber-stamp approvals, which convert the gate into theatre.
- Nitpicking style that a formatter should own.
- One person as the sole reviewer for everything, which is a bottleneck and a single point of
  knowledge.

## Tooling

GitHub, GitLab or Gerrit review; CODEOWNERS for routing; Danger or a merge queue for policy
enforcement.

## Getting Started

Require one approving review on the default branch, put your formatter and test suite behind
required checks, and set a stated goal for time to first review.

## References

Rendered from `sources` at build time.
