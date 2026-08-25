---
id: SDLC-0026
slug: accessibility-conformance-testing
title: Accessibility Conformance Testing
summary: Evaluating a product against a named conformance level of WCAG using automated checks, manual keyboard and screen-reader testing, and testing with disabled users, then publishing the result.
category: accessibility
lifecycle_phase: [build, verify]
adoption_level: 2
effort: medium
automatable: partial
applies_to: [web, mobile]
tags: [ux, testing]
sources:
  - title: "W3C, Web Content Accessibility Guidelines (WCAG) 2.2"
    url: https://www.w3.org/TR/WCAG22/
    type: standard
  - title: "W3C, Website Accessibility Conformance Evaluation Methodology (WCAG-EM) 1.0"
    url: https://www.w3.org/TR/WCAG-EM/
    type: standard
  - title: "US Section 508 programme guidance"
    url: https://www.section508.gov/
    type: practice-report
status: draft
---

## Purpose

Establish whether people using assistive technology can actually use the product, against a
published standard rather than a judgement call. In many markets this is also a legal
obligation rather than a quality preference.

## Examples

- `axe-core` running in the end-to-end suite, failing the build on new violations.
- A manual pass over the checkout flow with keyboard only, then with a screen reader, because focus order and announcement quality are not machine-detectable.
- A moderated session with a screen-reader user, which finds the problems the first two miss.

## What Good Looks Like

A target conformance level is stated and public. Automated checks run on every change, manual
keyboard and screen-reader passes are part of the definition of done for user-facing work, and
the known gaps are documented rather than unknown.

## Best Practices

- Pick and publish a target: WCAG 2.2 level AA is the common baseline.
- Automate what is automatable and be explicit that it is a minority of the criteria.
- Test keyboard-only navigation and focus order manually; automation cannot judge them.
- Test with real assistive technology and, at higher maturity, with disabled users.
- Fix the design system once rather than each page, since most violations are componentised.
- Include accessibility criteria in the definition of done, not in a pre-launch audit.

## Automation

Automated rule engines catch a meaningful minority of WCAG failures — contrast, missing
alternative text, unlabelled controls, ARIA misuse — and belong in CI and in the linter.
Whether the focus order makes sense, whether alternative text is useful, and whether the
experience is workable are manual judgements.

## Signals & Metrics

Automated violations per page and their trend, criteria passed at the target level, share of
user-facing changes given a keyboard and screen-reader pass, and accessibility issues reported
by users.

## Anti-Patterns

- Treating an automated scan's clean result as conformance.
- Auditing once before launch rather than continuously.
- An overlay widget sold as remediation instead of fixing the underlying markup.
- Fixing page by page while the shared component keeps reintroducing the violation.
- Testing with a screen reader you have never learned to use, and concluding it works.

## Tooling

`axe-core` and `@axe-core/playwright`, Pa11y, Lighthouse, WAVE, `eslint-plugin-jsx-a11y`;
NVDA, JAWS or VoiceOver for manual passes; WCAG-EM Report Tool for recording the result.

## Getting Started

Add `axe-core` to the end-to-end tests for your highest-traffic page and fix what it reports,
then do one manual keyboard-only pass over the same flow. The gap between the two results is
the argument for doing the rest.

## References

Rendered from `sources` at build time.
