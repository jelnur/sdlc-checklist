---
id: SDLC-0016
slug: database-change-management
title: Database Change Management
summary: Schema changes as versioned, ordered migration scripts in the same repository as the code, applied automatically and written so the previous application version still runs against the new schema.
category: change-management
lifecycle_phase: [build, release]
adoption_level: 2
effort: medium
automatable: full
applies_to: [backend, data]
tags: [change-control, data]
sources:
  - title: "DORA capability: Database change management"
    url: https://dora.dev/capabilities/database-change-management/
    type: practice-report
  - title: "Fowler & Sadalage, Evolutionary Database Design"
    url: https://martinfowler.com/articles/evodb.html
    type: practice-report
status: draft
---

## Purpose

Stop the database being the one part of the system that is changed by hand. Schema is state,
and unversioned state is what makes a deployment impossible to roll back.

## Examples

- Numbered migration files under version control, applied by the pipeline before the new application version starts.
- An expand-and-contract sequence: add the new column and write to both, backfill, switch reads, then drop the old column in a later release.

## What Good Looks Like

Every environment's schema is reachable by replaying migrations from empty. Migrations are
reviewed with the code that needs them, and a release can be rolled back without a database
restore.

## Best Practices

- Keep migrations in the application repository, reviewed in the same change.
- Expand and contract: never make a breaking change and a code change in one release.
- Make migrations idempotent and forward-only; prefer a new migration over editing an applied one.
- Test migrations against a production-sized copy, because locking behaviour depends on data volume.
- Separate the long-running backfill from the schema change, so a deployment is not blocked by it.

## Automation

Fully automatable: migration runners in the pipeline, drift detection against each
environment, and CI checks that flag a destructive statement.

## Signals & Metrics

Share of schema changes applied by migration rather than by hand, migration failure and
rollback count, drift detected per environment, and migration duration on production-sized
data.

## Anti-Patterns

- Applying DDL by hand in production, so no two environments match.
- A breaking schema change shipped with its code change, which makes rollback impossible.
- Editing a migration that has already been applied somewhere.
- Backfilling millions of rows inside the deployment step.

## Tooling

Flyway, Liquibase, Alembic, Prisma Migrate, `golang-migrate`, Rails Active Record migrations;
`gh-ost` or `pt-online-schema-change` for large MySQL tables; Atlas for drift detection.

## Getting Started

Put your current schema under a migration tool as a baseline, require every future schema
change to arrive as a migration file in the same pull request as its code, and apply
migrations from the pipeline.

## References

Rendered from `sources` at build time.
