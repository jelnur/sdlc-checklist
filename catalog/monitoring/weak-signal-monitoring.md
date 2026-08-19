---
id: SDLC-0001
slug: weak-signal-monitoring
title: Weak Signal Monitoring
summary: Detecting the quiet precursors of failure, such as saturation trends and slow error-budget burn, early enough to act before they become user-visible incidents.
category: monitoring
subcategory: observability-signals
lifecycle_phase: [operate]
adoption_level: 3
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
generated_by: assistant:claude-opus-5
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

Observable properties, each checkable by asking rather than by inspecting a dashboard:

- Someone on the team can answer **"what is degrading right now that is not yet broken?"**
  from memory. Needing to go and look means the answer is not being tracked, only recorded.
- Every finite resource has a **projected exhaustion date with a horizon longer than the lead
  time to add capacity**. A four-hour disk forecast is useless if provisioning takes a week.
- The weak-signal queue has **one named owner**, a grooming cadence, and items that close with
  a recorded decision: fixed, accepted with a rationale and a review date, or noise with the
  threshold changed. Items do not age out silently.
- Postmortems answer **"was this visible beforehand, and where?"** and the answer is usually
  no. A team early in the practice will find the answer is usually yes; that gap closing over
  time is the signal the practice is working.
- **Raised thresholds carry a reason and a review date.** A threshold quietly loosened is
  indistinguishable from a precursor ignored.
- Near-misses are written up with the same rigour as outages, because a failure the system
  recovered from by luck is a free lesson about fragility.

## Best Practices

- **Route weak signals to a queue, never to a pager.** A precursor is by definition not yet
  urgent. Paging on it produces the fatigue the SRE book describes, where people "second-guess,
  skim, or even ignore incoming alerts." Give it a ticket, an owner, and a business-hours SLA.
- **Alert on the derivative, not the level.** Replace "disk above 85%" with "projected to
  exhaust within N days," where N exceeds your lead time to act. The threshold tells you it is
  too late; the trend tells you while you can still do something.
- **Watch high percentiles, not means.** p99 latency degrades while the average sits flat.
  Aggregations that average across a fleet hide the one instance that will fail first.
- **Add a slow-burn tier to SLO alerting.** Alongside fast-burn pages, run the Workbook's 1x
  burn rate over three days as a *ticket*. It catches sustained low-level degradation that
  "can exhaust your error budget if left unchecked," and the ticket routing is the point, not
  a compromise.
- **Require every weak-signal item to close with a recorded decision.** Fixed, accepted, or
  reclassified as noise. Acceptance must carry a rationale and a review date. This single rule
  is the mechanism that prevents normalization of deviance, because it makes "we have decided
  to live with this" a dated artifact rather than a slow forgetting.
- **Make raising a hunch cheap.** Anyone can open a weak-signal ticket without justifying it
  first, and doing so is never penalised when it turns out to be nothing. Weick and Sutcliffe's
  finding is that weak signals fail on the social path, not the detection path: the conditions
  that stop a signal being shared or escalated are what let disasters incubate.
- **Add "was this visible beforehand?" as a mandatory postmortem field.** Answering it
  systematically converts every incident into calibration for your thresholds, and produces the
  precursor-present rate you need to know whether any of this is working.
- **Retain data long enough to see the drift you care about.** Detecting a quarter-long trend
  requires a quarter of history at usable resolution. This is usually a retention-cost decision
  masquerading as a tooling limitation.
- **Give each precursor class a named owner, not a team.** A signal owned by everyone is
  triaged by no one.

## Automation

Partially automatable, and the boundary is the point: detection automates well, judgment does
not.

**What automates.** Multiwindow, multi-burn-rate alerting is the mechanized form of weak
signal detection. The SRE Workbook's recommended starting point for a 99.9% SLO pairs
fast-burn pages (14.4x burn over 1 hour, 6x over 6 hours) with a **slow-burn ticket at 1x
burn rate over 3 days**. Pairing each long window with a short verification window of about
1/12 its duration suppresses alerts for problems that have already stopped.

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
- **Accepted-risk age.** How long items sit in "accepted with rationale" past their review
  date. A growing number here is normalization of deviance with a paper trail.

## Anti-Patterns

- **Normalization of deviance.** The precursor is seen repeatedly, nothing bad happens yet,
  and the abnormal reading becomes the accepted baseline. This is the dominant failure mode
  and it is social, not technical.
- **Threshold ratcheting.** Each time an alert fires, the threshold is raised instead of the
  cause investigated. Mechanically indistinguishable from tuning out noise, and the most
  common way normalization of deviance actually happens in practice.
- **Paging on weak signals.** Covered above; the result is that real pages get skimmed.
- **Acknowledgement as resolution.** The alert is acked, nobody is assigned, and the ack is
  the last event in its history.
- **Averages hiding the signal.** Mean latency is stable while p99 has been degrading for
  weeks.
- **Dashboards with no reader.** A precursor visible on a dashboard nobody opens on a
  schedule was never monitored, only recorded.
- **Cross-team precursors dying in handoff.** The signal is detected by the team that sees it
  and the fix belongs to a team that does not, so it becomes a backlog item with no owner on
  either side.

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

Three steps for a team with no SLOs and no new tooling. Step 1 pays for itself even if steps
2 and 3 never happen.

1. **Audit your last five incidents for precursors (half a day, no tooling).** For each one,
   ask: was there a signal visible beforehand in data we already had? Write down the answer,
   the signal, and how long it was visible. You now know your precursor-present rate and,
   more usefully, which two or three signals actually precede failure in *your* system. This
   is the whole practice in miniature and it requires nothing but a meeting and your existing
   dashboards.
2. **Instrument the single most common precursor from step 1 (one day).** One signal, one
   trend-based alert with a horizon longer than your fix lead time, routed to a ticket queue
   with one named owner. Not a pager. Resist doing all three signals; one that closes its
   loop beats three that nobody owns.
3. **Add one mandatory postmortem question (one hour).** "Was this visible beforehand, and
   where?" This makes step 1 self-sustaining instead of a one-off audit, and every future
   incident now calibrates your thresholds for free.

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
