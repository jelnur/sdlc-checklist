---
id: SDLC-0001
slug: weak-signal-monitoring
title: Weak Signal Monitoring
summary: Detecting the quiet precursors of failure, such as saturation trends and slow error-budget burn, early enough to act before they become user-visible incidents.
category: monitoring
subcategory: observability-signals
lifecycle_phase: [operate]
adoption_level: 4
effort: high
automatable: partial
applies_to: [backend, infra, data]
tags: [observability, reliability, incident-response]
sources:
  - title: "Google SRE Book, Chapter 6: Monitoring Distributed Systems"
    url: https://sre.google/sre-book/monitoring-distributed-systems/
    type: book
  - title: "Google SRE Workbook, Chapter 5: Alerting on SLOs"
    url: https://sre.google/workbook/alerting-on-slos/
    type: book
  - title: "Weick & Sutcliffe, Managing the Unexpected: Resilient Performance in an Age of Uncertainty"
    url: https://books.google.com/books/about/Managing_the_Unexpected.html?id=GU55MJOp1OcC
    type: book
status: draft
generated_by: human:jelnur
---

## Purpose

Most monitoring answers "is it broken now?" Weak signal monitoring answers "is it about to
break, and has it been telling us so for a while?"

Every signal in the golden four can be read two ways. Saturation as a threshold gives you
"the disk is full." Saturation as a trend gives you what the SRE book calls "predictions of
impending saturation, such as 'It looks like your database will fill its hard drive in 4
hours.'" The same chapter notes that 99th percentile response times "can give a very early
signal of saturation" long before averages move. The data is usually already being
collected. What is missing is a practice that treats a small deviation as a window into
system fragility rather than as noise to be filtered out.

The organizational half matters as much as the technical half. High reliability organizations
practice what Weick and Sutcliffe call preoccupation with failure: small signals of failure
are treated as evidence about the system, not as exceptions to be dismissed. Their finding is
that disasters incubate not because the hazard was invisible, but because the conditions
prevented weak signals from being noticed, shared, or escalated. A team can have perfect
telemetry and still miss every precursor.

## What Good Looks Like

> **YOURS TO WRITE.** Describe the observable end state, not the aspiration. Concretely: when
> a precursor appears, what happens, who sees it, and on what timescale? The distinguishing
> question for this section is what a team that does this well can *say* that a team with
> ordinary monitoring cannot. Avoid "the team is proactive"; that is a feeling, not an
> observable.

## Best Practices

> **YOURS TO WRITE — this is the section the whole entry exists for.**
>
> You put "weak signal monitoring" on your original list next to five signals anyone would
> name. Start from why. Recall one outage that had a quiet precursor nobody was watching:
>
> 1. What was the precursor, specifically? A metric, a log line, a support ticket, a
>    complaint, a graph nobody was looking at?
> 2. How long was it visible before the incident? Hours, weeks, a quarter?
> 3. What would have had to be true for someone to notice it in time? Not "better
>    monitoring" — the actual missing thing. A named owner? A review ritual? A different
>    aggregation? Permission to escalate on a hunch?
>
> Answer 3 and you have written this section. Each bullet should be independently
> actionable by a team that has not had your outage.

## Automation

Partially automatable, and the boundary is the point: detection automates well, judgment does
not.

**What automates.** Multiwindow, multi-burn-rate alerting is the mechanized form of weak
signal detection. The SRE Workbook's recommended starting point for a 99.9% SLO pairs
fast-burn pages (14.4x burn over 1 hour, 6x over 6 hours) with a **slow-burn ticket at 1x
burn rate over 3 days**, which catches sustained low-level degradation that "can exhaust your
error budget if left unchecked." The slow-burn row is the weak signal: it deliberately
generates a ticket rather than a page, so it can be worked in business hours. Pairing each
long window with a short verification window of about 1/12 its duration suppresses alerts for
problems that have already stopped.

Beyond burn rate: trend-based capacity projection (extrapolate to exhaustion rather than
alerting on a static threshold), anomaly detection on high percentiles instead of means, and
automated near-miss capture so recovered failures are still recorded.

**What does not automate.** Deciding whether a small deviation is fragility or noise. That is
the judgment the practice exists to cultivate, and every attempt to threshold it away
recreates the problem one level up.

## Signals & Metrics

- **Time-to-detection versus time-to-precursor.** The gap between when a precursor first
  became visible in existing telemetry and when anyone acted. Retrospectively measurable
  after any incident, and the single most honest measure of whether this practice works.
- **Slow-burn ticket volume and disposition.** Tickets opened at 1x burn rate, and what
  fraction led to a change versus were closed as noise. All-noise means thresholds are wrong;
  zero volume means the alert is not wired.
- **Precursor-present rate.** Share of incidents whose postmortem finds a signal that was
  already visible beforehand. This should fall over time.
- **Near-miss capture rate.** Recovered failures recorded versus estimated occurrences.
- **Saturation projection horizon.** How far ahead exhaustion is forecast for each
  finite resource, measured against the resource that will run out first rather than fleet
  averages.

## Anti-Patterns

- **Normalization of deviance.** The precursor is seen repeatedly, nothing bad happens yet,
  and the abnormal reading becomes the accepted baseline. This is the dominant failure mode
  and it is social, not technical.
- **Paging on weak signals.** A precursor is by definition not yet urgent. Routing it to a
  pager produces exactly the fatigue the SRE book warns of, where "employees second-guess,
  skim, or even ignore incoming alerts, sometimes even ignoring a 'real' page that's masked
  by the noise." Weak signals belong in a queue with an owner, not on a pager.
- **Averages hiding the signal.** Mean latency is stable while p99 has been degrading for
  weeks.
- **Dashboards with no reader.** A precursor visible on a dashboard nobody opens on a
  schedule was never monitored, only recorded.

> **YOURS TO ADD.** The above are from the literature. Add the ones you have personally
> watched happen — those are the ones that will make an engineer recognize their own team.

## Tooling

Vendor-neutral by category, since the practice is a use of tools rather than a tool:

- **SLO and error-budget engines** for multi-window burn-rate alerting: Sloth, Pyrra,
  OpenSLO, Nobl9, or burn-rate rules written directly as Prometheus recording rules.
- **Time-series backends with trend and forecast functions:** Prometheus (`predict_linear`
  for exhaustion forecasting), Thanos or Mimir for the retention that trend analysis needs.
- **Anomaly detection** on percentile series, native in most APM suites.
- **Incident and near-miss registries** so recovered failures are captured, not just
  incidents that breached.

Retention is the underrated requirement. Detecting a quarter-long drift needs a quarter of
data at usable resolution, which is a cost decision more than a tooling one.

## Getting Started

> **YOURS TO WRITE.** Exactly three steps for a team at adoption level 1, in order. The
> constraint that makes this section hard and worth writing: each step must be completable in
> under a day by a team that has no SLOs yet, and step 1 must produce value even if steps 2
> and 3 never happen.
>
> If you cannot make step 1 standalone-valuable, that is a real finding about
> `adoption_level: 4` — it would mean this practice genuinely cannot be entered at level 1,
> and the field is right.

## References

Rendered from `sources` at build time; the entries below are additional reading that does not
qualify under conditional rule 1.

- Google SRE Book, Chapter 6: Monitoring Distributed Systems —
  <https://sre.google/sre-book/monitoring-distributed-systems/>
- Google SRE Workbook, Chapter 5: Alerting on SLOs —
  <https://sre.google/workbook/alerting-on-slos/>
- Weick & Sutcliffe, *Managing the Unexpected* —
  <https://books.google.com/books/about/Managing_the_Unexpected.html?id=GU55MJOp1OcC>
- Diane Vaughan, *The Challenger Launch Decision* — the canonical case study of
  normalization of deviance. Verify and cite properly before promoting to `sources`.
- Sidney Dekker, *Drift into Failure* — on systems degrading gradually while every local
  decision looks reasonable. Same caveat.
