---
id: SDLC-0019
slug: disaster-recovery-planning
title: Disaster Recovery Planning
summary: Agreeing how much data loss and downtime is acceptable per system, designing backup and failover to meet it, and proving it by rehearsing the restore rather than assuming the backup works.
category: business-continuity
lifecycle_phase: [design, operate]
adoption_level: 3
effort: high
automatable: partial
applies_to: [backend, data, infra]
tags: [business-continuity, reliability]
sources:
  - title: "ISO 22301:2019, Business continuity management systems"
    url: https://www.iso.org/standard/75106.html
    type: standard
  - title: "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems"
    url: https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final
    type: standard
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Be able to come back from the failures ordinary incident response cannot absorb: a lost
region, a deleted database, an encrypted fileset. An untested backup is a hypothesis.

## Examples

- Documented recovery point and recovery time objectives per system, with backup frequency
  derived from them rather than chosen by habit.
- A quarterly game day that restores the production database into an isolated environment and
  times it.

## What Good Looks Like

Every system has a stated recovery point and recovery time objective, the last rehearsal is
recent and its measured time is inside the objective, and at least one backup copy is offline
or immutable.

## Best Practices

- Set the objectives first; backup design follows from them.
- Rehearse the restore on a schedule, and record the time it actually took.
- Keep one immutable or offline copy, so ransomware cannot reach the backups.
- Test the restore path, not just backup completion; a backup that cannot be read is not a
  backup.
- Write the runbook for someone who was not involved in designing it.
- Include the dependencies: DNS, secrets, certificates, and the third parties you need to come
  back.

## Automation

Backup scheduling, integrity verification, replication and failover can be automated; declaring
a disaster and deciding to fail over stays a human decision.

## Signals & Metrics

Measured restore time versus objective, measured data loss versus objective, days since the
last successful rehearsal, backup success and verification rate, and share of systems with a
tested runbook.

## Anti-Patterns

- Backups that have never been restored.
- Objectives that exist on paper with no design behind them.
- All copies reachable from the same compromised credentials.
- A plan documented once and never rehearsed, so it is stale when needed.
- Recovering the application and discovering the secrets store was not in scope.

## Tooling

Cloud-native backup and cross-region replication; Velero for Kubernetes; `pgBackRest` or
Barman for PostgreSQL; object-lock storage for immutability; Chaos Mesh or AWS FIS for
rehearsal.

## Getting Started

Write down the recovery point and recovery time objectives for your most important database,
then restore last night's backup into a scratch environment and time it. The gap between the
measurement and the objective is your plan.

## References

Rendered from `sources` at build time.

- `iso.org` returns 403 to automated checkers and needs the link-check allowlist.
