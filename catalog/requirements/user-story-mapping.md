---
id: SDLC-0003
slug: user-story-mapping
title: User Story Mapping
summary: Laying out the steps a user takes across the top and the supporting stories underneath, so scope is cut by slicing the map rather than by dropping items off a flat list.
category: requirements
lifecycle_phase: [plan]
adoption_level: 2
effort: medium
automatable: none
applies_to: [any]
tags: [requirements, agile]
sources:
  - title: "Jeff Patton, Story Mapping"
    url: https://jpattonassociates.com/story-mapping/
    type: practice-report
  - title: "The Scrum Guide (2020)"
    url: https://scrumguides.org/scrum-guide.html
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Give requirements a shape. A flat backlog hides whether the next release is a coherent
journey or a scattering of half-finished features.

## Examples

- Mapping a checkout flow left to right, then drawing a horizontal line for the first
  release so the slice below it is a walkable path end to end.
- Using the map in a kickoff to find the step nobody had a story for.

## What Good Looks Like

The team can point at a horizontal slice and say "this release is these steps working, and
nothing else," and the slice describes something a user could actually complete.

## Best Practices

- Order the top row by the sequence a user actually moves through, not by team ownership.
- Cut releases as horizontal slices, so every release is a complete journey.
- Keep it visible and cheap to change; a map treated as a deliverable stops being useful.

## Automation

N/A — the value is in the shared conversation while building the map, not in the artifact.

## Signals & Metrics

N/A — no meaningful process metric; judge it by whether release scope decisions stop being
arbitrary.

## Anti-Patterns

- Building the map once and never revisiting it.
- Vertical slices, which ship one deep feature nobody can reach.
- Treating the map as a specification handed down rather than a working surface.

## Tooling

Sticky notes on a wall, or Miro, FigJam, or any shared whiteboard.

## Getting Started

Take the next release, write the user's steps left to right on one wall, and put the known
stories underneath. The gaps are the finding.

## References

Rendered from `sources` at build time.
