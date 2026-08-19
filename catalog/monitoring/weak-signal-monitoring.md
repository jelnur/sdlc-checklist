---
id: SDLC-0001
slug: weak-signal-monitoring
title: Weak Signal Monitoring
summary: Watching signals that are too small to alert on, where the rate or the pattern matters rather than the single event, so you can act before something becomes an incident.
category: monitoring
subcategory: observability-signals
lifecycle_phase: [operate]
adoption_level: 3
effort: high
automatable: partial
applies_to: [web, backend, infra, data]
tags: [observability, reliability, incident-response, security]
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

One 404 means nothing. Nobody should be paged for it.

A thousand 404s an hour, all hitting `/.env`, `/wp-admin`, and `/admin.php`, means someone
is looking for a way in. Nothing is broken. No alert will fire. But something has changed,
and you want to know about it.

That is a weak signal: too small to alert on, where the **rate or the pattern** is
interesting rather than the event.

Most monitoring asks "is it broken right now?" Weak signal monitoring asks a different
question: "is something changing that will matter later?"

**This is not a sixth kind of monitoring.** Performance, access, errors, throughput and logs
are places you look. Weak signal monitoring is a way of reading any of them. The same access
log that answers "who is using us" also answers "is one client scraping everything we have."
Same data, different question.

The data is usually already there. What is usually missing is someone treating a small change
as information instead of noise.

The hard part is not technical. Research on high-reliability organizations found that
disasters build up slowly, and not because the warning was invisible. They build up because
nobody passed the warning on. You can have perfect dashboards and still miss every early
warning, because the person who saw it was not sure it counted.

## Examples

Each row is the same technique pointed at a different place. None of these page anyone.

| Where you look | The weak signal | What it can mean |
|---|---|---|
| Errors | 404 rate, and which paths | Recon, a broken deploy, dead inbound links, old clients calling a removed endpoint |
| Access logs | Request pattern per client or ASN | Scraping, rising bandwidth cost, credential stuffing |
| Performance | p99 latency climbing while the average stays flat | Saturation on the way |
| Capacity | Disk projected to fill in four hours | You are about to run out of space |
| SLO burn | Error budget burning at 1x for three days | A slow leak nobody has noticed |
| Auth | Failed-login rate per account or per IP | Credential stuffing, or a broken client retrying |
| Dependencies | Retry and timeout rate to one upstream | That upstream is degrading before it fails |

Two of these are worth spelling out, because they are the least obvious.

**404 rate.** A 404 is not an error you act on individually, which is exactly why it is useful.
Watch the rate and the paths. A burst of requests for `/.env`, `/wp-admin` and `/admin.php` is
someone probing for a way in. A steady trickle on a path your own pages link to means you
shipped a broken reference. A rise in 404s from external referrers means the web's links to you
are rotting. Three different meanings from one metric, separated by looking at which paths.

**Scraping patterns in access logs.** Read straight from Caddy or nginx logs. One client pulling
every page in sequence, ignoring `robots.txt`, or walking your pagination is scraping. It rarely
breaks anything, so nothing alerts. What it does is cost you bandwidth, take your content, and
sometimes warm up for something worse. This one is invisible in totals and obvious the moment
you group by IP, ASN, or user agent.

## What Good Looks Like

You can check each of these by asking someone, not by opening a dashboard.

- Somebody can answer **"what is getting worse right now that is not broken yet?"** from
  memory. If they have to go and look, it is being recorded, not watched.
- Every resource that can run out has a **forecast that reaches further ahead than your fix
  takes**. A four-hour disk warning is useless if provisioning takes a week.
- The weak-signal queue has **one named owner**. Items get closed with a decision, not left
  to rot: fixed, accepted on purpose with a reason and a date to revisit, or reclassified as
  noise with the threshold changed.
- Postmortems answer **"could we have seen this coming?"** and the answer is usually no. Early
  on the answer will usually be yes. That flipping over time is how you know this is working.
- When somebody raises a threshold, **the reason is written down** and a review date is set.
- Near misses get written up too. A failure you survived by luck is a free lesson.

## Best Practices

- **Send weak signals to a queue, never to a pager.** An early warning is not urgent yet. Page
  on it and people start skimming alerts. The SRE book puts it plainly: when pages come too
  often, people "second-guess, skim, or even ignore incoming alerts." Give it a ticket, an
  owner, and a business-hours deadline instead.
- **Alert on the trend, not the number.** "Disk above 85%" tells you when it is nearly too
  late. "Disk will be full in six days" tells you while you can still fix it. Pick a horizon
  longer than your lead time to act.
- **Watch p99, not averages.** The average stays flat while the slowest 1% gets steadily worse.
  Averaging across a fleet also hides the one machine that will break first.
- **Watch rates of things that are individually harmless.** 404s are the clearest example.
  A single one is noise. The rate, and which paths, is a real signal. The same is true for
  auth failures, retries, and cache misses.
- **Group by client, not just by endpoint.** Scraping and credential stuffing only look
  obvious when you aggregate per IP, per ASN, or per user agent. Totals hide them completely.
- **Make every item close with a written decision.** Fixed, accepted, or noise. If accepted,
  record why and when to look again. This one rule is what stops a warning quietly becoming
  the new normal, because "we decided to live with this" ends up dated and reviewable instead
  of just forgotten.
- **Make raising a hunch cheap.** Anyone can open a weak-signal ticket without having to
  justify it first, and nobody looks silly when it turns out to be nothing. Early warnings
  usually fail on the way to being shared, not on the way to being detected.
- **Add "could we have seen this coming?" to your postmortem template.** Every incident then
  tunes your thresholds for free, and you learn which signals actually come before trouble in
  your system.
- **Keep data long enough to see the trend you care about.** Spotting a three-month drift needs
  three months of history at useful resolution. This is a storage cost decision that often
  hides as a tooling problem.
- **Give each kind of signal a named owner, not a team.** A signal everyone owns gets looked at
  by nobody.

## Automation

Detection automates well. Judgement does not. That split is the whole shape of this practice.

**What you can automate.** SLO burn-rate alerting is the packaged version of this. For a 99.9%
SLO, the SRE Workbook suggests paging on fast burn (14.4x over an hour, 6x over six hours) and
opening a **ticket** on slow burn: 1x over three days. That last row is the weak signal, and
sending it to a ticket instead of a pager is deliberate. Pairing each long window with a short
one about 1/12 its length stops alerts for problems that already went away.

Also automatable: forecasting when a resource runs out instead of thresholding it, anomaly
detection on percentiles rather than averages, log-based rate tracking for 404s and auth
failures grouped by client, and capturing near misses so recovered failures still get recorded.

**What you cannot automate.** Deciding whether a small change is fragility or just noise. That
judgement is the point of the practice. Every attempt to replace it with a threshold just moves
the same problem up a level.

## Signals & Metrics

- **How long the warning was visible before anyone acted.** Measurable after any incident, and
  the most honest measure of whether this works at all.
- **Slow-burn ticket volume, and what happened to them.** How many led to a change versus were
  closed as noise. All noise means your thresholds are wrong. Zero tickets means the alert is
  not actually wired up.
- **Share of incidents that had a visible warning first.** Should fall over time.
- **Near misses recorded** versus roughly how many you think happened.
- **Forecast horizon per resource.** How far ahead you can see each one running out, measured
  against whichever runs out first rather than a fleet average.
- **Age of accepted risks past their review date.** A growing number here is a warning becoming
  the new normal, with a paper trail.

## Anti-Patterns

- **The warning becomes the new normal.** You see it often, nothing bad happens, and the odd
  reading turns into the baseline. This is the most common failure and it is a people problem,
  not a tooling one.
- **Raising the threshold instead of investigating.** The alert fires, so you move the line.
  Looks identical to tuning out noise, and it is how warnings quietly become normal in practice.
- **Paging on early warnings.** Covered above. The result is that real pages get skimmed.
- **Acknowledging instead of resolving.** The alert is acked, nobody is assigned, and the ack is
  the last thing that ever happens to it.
- **Averages hiding the problem.** Mean latency looks fine while p99 has been sliding for weeks.
- **Only looking at totals.** Total 404s look flat while one client's 404s went up 50x.
- **Dashboards nobody opens.** A warning on a dashboard nobody looks at on a schedule was never
  monitored, only stored.
- **Warnings that belong to another team.** The team that spots it cannot fix it, and the team
  that can fix it never sees it. It becomes a backlog item nobody owns.

## Tooling

By category, because this is a way of using tools rather than a tool you install:

- **SLO and error-budget tools** for burn-rate alerting: Sloth, Pyrra, OpenSLO, Nobl9, or
  burn-rate rules written straight into Prometheus.
- **Time-series storage with forecasting:** Prometheus (`predict_linear` for "when will this
  run out"), plus Thanos or Mimir for the longer retention that trends need.
- **Log aggregation you can group by client:** Loki, OpenSearch, or `goaccess` and friends
  against Caddy or nginx access logs. The requirement is aggregating by IP, ASN, or user agent,
  not just counting.
- **Anomaly detection** on percentile series. Built into most APM suites.
- **A near-miss and incident log**, so failures you recovered from still get recorded.

Retention is the underrated part. Seeing a three-month drift needs three months of data.

## Getting Started

Three steps for a team with no SLOs and no new tools. Step 1 is worth doing on its own.

1. **Look back at your last five incidents (half a day, no tooling).** For each one ask: was
   there a sign beforehand, in data we already had? Write down what it was and how long it was
   visible. You now know which two or three signals actually come before trouble in your
   system. That is the whole practice in miniature, and it costs a meeting.
2. **Instrument the most common one (one day).** One signal. One trend-based alert with a
   horizon longer than your fix time. One ticket queue. One named owner. Not a pager. Resist
   doing three at once; one that gets acted on beats three that nobody owns.
3. **Add one question to your postmortem template (one hour).** "Could we have seen this
   coming, and where?" Now step 1 keeps happening by itself instead of being a one-off.

## References

Rendered from `sources` at build time. The rest is further reading that does not qualify under
conditional rule 1.

- Google SRE Book, Chapter 6: Monitoring Distributed Systems —
  <https://sre.google/sre-book/monitoring-distributed-systems/>
- Google SRE Workbook, Chapter 5: Alerting on SLOs —
  <https://sre.google/workbook/alerting-on-slos/>
- Weick & Sutcliffe, *Managing the Unexpected* —
  <https://books.google.com/books/about/Managing_the_Unexpected.html?id=GU55MJOp1OcC>
- Diane Vaughan, *The Challenger Launch Decision* — the classic case of a warning becoming
  normal. Verify and cite properly before promoting to `sources`.
- Sidney Dekker, *Drift into Failure* — how systems slide into trouble while every individual
  decision looks reasonable. Same caveat.
