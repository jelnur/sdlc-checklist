---
id: SDLC-0025
slug: deprecation-policy
title: Deprecation Policy
summary: A published, binding rule for how long a version, endpoint or feature keeps working after it is deprecated, and what notice and migration path consumers get before it is removed.
category: decommissioning
lifecycle_phase: [release, operate]
adoption_level: 3
effort: medium
automatable: partial
applies_to: [web, backend, mobile]
tags: [lifecycle-end, change-control]
sources:
  - title: "Kubernetes Deprecation Policy"
    url: https://kubernetes.io/docs/reference/using-api/deprecation-policy/
    type: vendor-doc
  - title: "ISO/IEC/IEEE 12207:2017, Software life cycle processes (Disposal process)"
    url: https://www.iso.org/standard/63712.html
    type: standard
  - title: "Semantic Versioning 2.0.0"
    url: https://semver.org/
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Let things be removed. Without a published rule, every interface is supported forever by
default, and the cost of that accumulates silently until nothing can be changed.

## Examples

- A stated policy that a deprecated API version keeps working for twelve months from the
  announcement, with a documented migration path.
- Deprecation surfaced in-band: a response header and a log warning on every call to the old
  endpoint, plus usage metrics showing who is still calling it.

## What Good Looks Like

The policy is published before it is needed and applies to everything. Deprecation is announced
with a removal date and a migration path, remaining consumers are identifiable from telemetry,
and removals actually happen on the date.

## Best Practices

- Publish the support window before the first deprecation, so it is a rule rather than a
  negotiation.
- Announce with a date and a migration path in the same message.
- Signal in-band as well as in release notes: headers, log warnings, deprecation annotations.
- Instrument usage of the deprecated thing, so you know who is left rather than guessing.
- Remove on the date. A policy that slips once is not a policy.
- Dispose of the data too; a retired system's data does not retire itself.

## Automation

Usage telemetry, deprecation headers and annotations, and linters that flag calls to deprecated
interfaces automate well. Negotiating with the last remaining consumer does not.

## Signals & Metrics

Count of deprecated-but-not-removed items and their age past the removal date, remaining traffic
to deprecated interfaces, number of supported versions in production, and share of deprecations
removed on schedule.

## Anti-Patterns

- Removing something with no notice, which breaks consumers who had no chance to move.
- Deprecating with no removal date, which is a label rather than a plan.
- Extending the window every time someone complains, which teaches everyone to ignore the dates.
- No usage data, so the decision to remove is made blind.
- Retiring the service and leaving its data and credentials in place.

## Tooling

`Deprecation` and `Sunset` response headers (RFC 8594); OpenAPI `deprecated`; language-level
deprecation attributes; API gateway analytics or usage metrics per version; changelog and release
notes tooling.

## Getting Started

Publish one sentence stating your support window, then apply it to the oldest interface you want
to remove: announce a date, instrument its usage, and remove it on that date.

## References

Rendered from `sources` at build time.

- `iso.org` returns 403 to automated checkers and needs the link-check allowlist.
