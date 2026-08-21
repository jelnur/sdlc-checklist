---
id: SDLC-0015
slug: blue-green-deployment
title: Blue-Green Deployment
summary: Running two identical production environments and switching traffic from the live one to the newly deployed one, so release and rollback are both a routing change rather than a redeploy.
category: release
lifecycle_phase: [release]
adoption_level: 3
effort: high
automatable: full
applies_to: [web, backend, infra]
tags: [deployment, reliability]
sources:
  - title: "Martin Fowler, BlueGreenDeployment"
    url: https://martinfowler.com/bliki/BlueGreenDeployment.html
    type: practice-report
  - title: "Humble & Farley, Continuous Delivery"
    url: https://continuousdelivery.com/
    type: book
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Make rollback fast and boring. If reverting a bad release means pointing the router back at
the environment that was working a minute ago, the cost of shipping drops.

## Examples

- Two identical target groups behind one load balancer, with the listener switched after
  smoke tests pass against the idle environment.
- Keeping the old environment warm for an hour after cutover, as the rollback path.

## What Good Looks Like

Cutover and rollback both take seconds, are the same mechanism, and have been rehearsed. The
idle environment is verified before it receives traffic, and schema changes are made
backward-compatible so both versions can run against one database.

## Best Practices

- Smoke-test the idle environment before switching, not after.
- Keep database changes backward-compatible; the shared database is what actually constrains
  this pattern.
- Keep the old environment available long enough to roll back to it.
- Drain connections on cutover rather than cutting them.
- Automate the switch, so a rollback under pressure is one command.

## Automation

Fully automatable: pipeline-driven provisioning, smoke tests, traffic switch, and automated
rollback on a health-check or error-rate breach.

## Signals & Metrics

Time to cut over, time to roll back, change failure rate, and the share of releases rolled
back successfully.

## Anti-Patterns

- Environments that have drifted apart, so the switch is not like-for-like.
- Backward-incompatible schema migrations, which make rollback impossible whatever the routing
  does.
- Tearing down the old environment immediately, which discards the rollback path.
- Manual cutover steps, exactly when calm execution matters most.

## Tooling

Load-balancer or ingress weighting; Argo Rollouts or Flagger on Kubernetes; AWS CodeDeploy;
Terraform or Pulumi for the paired environments.

## Getting Started

Stand a second identical environment for one service, put both behind the load balancer,
script the listener switch and the reverse, and rehearse the rollback before you need it.

## References

Rendered from `sources` at build time.
