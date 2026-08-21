---
id: SDLC-0008
slug: coding-standards
title: Coding Standards
summary: A written, machine-enforced convention for how code in a language is formatted and structured, so style is settled by a tool in CI rather than argued in review.
category: coding
lifecycle_phase: [build]
adoption_level: 1
effort: low
automatable: full
applies_to: [any]
tags: [code-quality]
sources:
  - title: "PEP 8, Style Guide for Python Code"
    url: https://peps.python.org/pep-0008/
    type: standard
  - title: "Google Style Guides"
    url: https://google.github.io/styleguide/
    type: practice-report
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Make the codebase read as though one person wrote it, and remove style from human review
entirely. Every minute spent arguing about brace placement is a minute not spent on the
logic.

## Examples

- `ruff format` and `ruff check` pinned in `pyproject.toml`, run as a required CI check.
- A shared ESLint and Prettier config published as an internal package and extended by every
  repository.

## What Good Looks Like

Formatting is applied automatically and is never mentioned in a review comment. The
configuration is committed, pinned, and identical locally and in CI.

## Best Practices

- Adopt an existing standard and configure it; do not author one from scratch.
- Pin the tool version, or CI and local developers will disagree.
- Auto-format on commit or in the editor, so nobody hand-fixes lint output.
- Treat unformatted code as a build failure, not a review comment.

## Automation

Fully automatable: formatters, linters, pre-commit hooks, and a required CI check.

## Signals & Metrics

Lint and format CI failure rate, count of suppression comments and their age, and how often
style appears in review comments.

## Anti-Patterns

- A style guide that exists only as a wiki page nobody enforces.
- Review comments about formatting when a formatter could settle it.
- Blanket suppressions added to silence CI, with no expiry.

## Tooling

Ruff or Black for Python, ESLint with Prettier or Biome for JavaScript and TypeScript,
`gofmt` and `golangci-lint` for Go, `rustfmt` and Clippy for Rust, `pre-commit` to run them
locally.

## Getting Started

Add the standard formatter for your main language with its default configuration, format the
whole repository in one commit, and make the check required.

## References

Rendered from `sources` at build time.
