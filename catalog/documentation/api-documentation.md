---
id: SDLC-0006
slug: api-documentation
title: API Documentation
summary: Publishing a machine-readable interface description alongside human guides, generated from or validated against the running service so the docs cannot silently diverge from it.
category: documentation
lifecycle_phase: [design, build]
adoption_level: 2
effort: medium
automatable: partial
applies_to: [web, backend]
tags: [documentation]
sources:
  - title: "OpenAPI Specification"
    url: https://spec.openapis.org/oas/latest.html
    type: standard
  - title: "Diátaxis documentation framework"
    url: https://diataxis.fr/
    type: practice-report
status: draft
---

## Purpose

Let a consumer integrate without reading your source or asking you. An undocumented API is
one whose real contract lives in whatever the last caller happened to observe.

## Examples

- An OpenAPI document checked into the repo, rendered as reference docs and used to generate client SDKs.
- A getting-started tutorial alongside that reference, because a schema dump is not an onboarding path.

## What Good Looks Like

The published description matches what the service actually returns, and CI fails when it
does not. Reference material and task-oriented guides both exist and are not confused for
each other.

## Best Practices

- Keep one machine-readable description as the source of truth, versioned with the code.
- Validate the description against the real service in CI, or generate it from the implementation.
- Separate reference from tutorial. Diátaxis names the four kinds; mixing them produces documents that serve nobody.
- Document errors and rate limits, which is what integrators actually get stuck on.

## Automation

Description generation from code, contract tests against the description, SDK and docs-site
generation, and CI drift checks all automate. Writing the guides does not.

## Signals & Metrics

Endpoint coverage in the description, drift-check failures, and support questions that the
existing documentation already answered.

## Anti-Patterns

- Hand-maintained docs in a wiki that drift within one release.
- A schema dump published as the entire documentation.
- Documenting the happy path only, so every error is a support ticket.

## Tooling

OpenAPI with Redocly, Scalar or Swagger UI; AsyncAPI for event-driven interfaces;
Schemathesis or Dredd for contract checks; MkDocs or Docusaurus for guides.

## Getting Started

Produce an OpenAPI document for your most-used service, commit it, and add a CI step that
fails when the service and the document disagree.

## References

Rendered from `sources` at build time.
