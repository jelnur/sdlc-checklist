---
id: SDLC-0017
slug: infrastructure-as-code
title: Infrastructure as Code
summary: Defining environments in version-controlled declarative files applied by automation, so infrastructure is reviewed, reproducible and diffable instead of being accumulated console state.
category: infrastructure
lifecycle_phase: [build, release, operate]
adoption_level: 2
effort: high
automatable: full
applies_to: [infra]
tags: [infrastructure, automation]
sources:
  - title: "Kief Morris, Infrastructure as Code"
    url: https://infrastructure-as-code.com/
    type: book
  - title: "Martin Fowler, InfrastructureAsCode"
    url: https://martinfowler.com/bliki/InfrastructureAsCode.html
    type: practice-report
  - title: "Forsgren, Humble & Kim, Accelerate"
    url: https://itrevolution.com/product/accelerate/
    type: book
status: draft
generated_by: assistant:claude-opus-5
---

## Purpose

Make environments reproducible and reviewable. Infrastructure built by hand in a console is
knowledge held in one person's memory, and it cannot be rebuilt, diffed, or reviewed.

## Examples

- Terraform modules defining a service's network, compute and database, applied from CI on
  merge.
- Kubernetes manifests reconciled continuously by Argo CD, so the cluster converges on the
  committed state.

## What Good Looks Like

Any environment can be rebuilt from the repository. Changes go through review, plans are
shown before apply, and drift from the committed definition is detected rather than
discovered.

## Best Practices

- Declarative and idempotent, so applying twice is safe.
- Review the plan before applying, in the pull request.
- Replace rather than patch servers; mutating in place recreates the state you were escaping.
- Keep environments as the same code with different parameters.
- Store state remotely with locking, and never hand-edit it.
- Keep secrets out of the definitions and inject them at apply time.

## Automation

Fully automatable: plan on pull request, apply on merge, continuous reconciliation, drift
detection, and policy-as-code checks before apply.

## Signals & Metrics

Share of infrastructure under code, drift detections per week, time to rebuild an environment
from scratch, and the count of manual console changes.

## Anti-Patterns

- Console changes alongside code, so the definition is no longer the truth.
- One shared mutable environment nobody can reproduce.
- Copy-pasted definitions per environment that diverge quietly.
- Secrets committed into the definitions.
- Applying without reading the plan.

## Tooling

Terraform or OpenTofu, Pulumi, AWS CDK, CloudFormation; Ansible for configuration;
Argo CD or Flux for reconciliation; Checkov, `tfsec` or OPA for policy; Atlantis for
pull-request-driven apply.

## Getting Started

Import one existing environment into Terraform, get a clean plan with no changes, then make
the next change through code and require review on it.

## References

Rendered from `sources` at build time.
