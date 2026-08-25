---
id: SDLC-0027
slug: data-protection-impact-assessment
title: Data Protection Impact Assessment
summary: A documented assessment run before high-risk processing of personal data begins, recording what is collected and why, the risks to the people involved, and the measures taken to reduce them.
category: privacy
lifecycle_phase: [design, govern]
adoption_level: 3
effort: high
automatable: partial
applies_to: [any]
tags: [compliance, data]
sources:
  - title: "GDPR Article 25, Data protection by design and by default"
    url: https://gdpr-info.eu/art-25-gdpr/
    type: standard
  - title: "ICO guidance: Data protection impact assessments"
    url: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/
    type: standard
  - title: "NIST Privacy Framework"
    url: https://www.nist.gov/privacy-framework
    type: standard
status: draft
---

## Purpose

Decide what personal data a feature will handle before it is built, when reducing the amount
collected is still a design choice rather than a migration. Under the GDPR this is mandatory
for high-risk processing, not optional.

## Examples

- An assessment before adding third-party analytics to an authenticated area, which ends with the identifier being hashed and the retention set to 90 days.
- A reassessment when an existing dataset is repurposed for model training, because the lawful basis and the expectations of the people in it have both changed.

## What Good Looks Like

There is a trigger that catches high-risk processing before build starts. The assessment names
the data, the purpose, the lawful basis, the retention period and the recipients. Its
mitigations are tracked work, and it is revisited when the processing changes.

## Best Practices

- Run it at design time. After launch the finding is a migration, not a design change.
- Have a written trigger — new personal-data category, new third-party recipient, profiling, special-category data — so it does not depend on somebody remembering.
- Record retention and deletion, not only collection; unbounded retention is the most common finding.
- Prefer designing the risk out: less data, shorter retention, pseudonymisation.
- Track mitigations as normal work with owners, in the same tracker as everything else.
- Keep it proportionate. A template long enough to deter use produces no assessments.

## Automation

Data-flow discovery, personal-data scanning and retention enforcement can be automated, and the
trigger can be wired into the design-review checklist. Judging risk to the people whose data it
is cannot.

## Signals & Metrics

Share of qualifying features assessed before build, mitigations open versus closed, retention
periods defined versus enforced in code, and data categories collected with no stated purpose.

## Anti-Patterns

- Running the assessment after launch, as a compliance artifact.
- Collecting data speculatively "in case it is useful later", which is what the assessment exists to catch.
- Retention set to indefinite by omission.
- An assessment owned by legal alone, with no engineer able to describe the actual data flow.
- Never revisiting it when the processing purpose changes.

## Tooling

A structured template as an issue type; OneTrust or Transcend for the register at scale;
`amnesia` or ARX for anonymisation; data-catalogue tools such as OpenMetadata or DataHub for
discovering the flows; policy-as-code for retention enforcement.

## Getting Started

Write a one-page template covering data, purpose, lawful basis, retention and recipients, then
complete it for the next feature that touches personal data and file every mitigation as a
ticket.

## References

Rendered from `sources` at build time.
