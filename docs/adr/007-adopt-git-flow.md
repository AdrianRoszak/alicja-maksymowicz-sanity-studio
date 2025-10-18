# ADR-007: Adopt Git Flow branching model

## Status
Accepted

## Context

We need a repeatable branching and release strategy that fits both content changes and regular code work for the Sanity Studio. The team prefers a straightforward workflow for features, QA, releases and hotfixes.

## Decision

Adopt the Git Flow branching model with the following concrete configuration for this repository:

- Production branch: `main`
- Development branch: `develop`
- Feature prefix: `feature/`
- Release prefix: `release/`
- Hotfix prefix: `hotfix/`
- Support prefix: `support/`

This choice balances stability for `main` with an integration branch (`develop`) for continuous work and testing.

## Alternatives Considered

1. Trunk-based development (single long-lived branch)
   - Pro: Simpler branching model, faster merges
   - Con: Less separation for release stabilization and hotfixes

2. GitHub Flow (main + short-lived branches)
   - Pro: Lightweight, well-suited for continuous deployment
   - Con: Less structure for long-running release cycles and hotfix segregation

3. Custom branching scheme
   - Pro: Tailored to project needs
   - Con: Harder to teach and maintain; less tooling support

## Consequences

- Positive
  - Clear separation between production and development
  - Standardized workflow for features, releases and hotfixes
  - Works well with current CI and deployment gating (deploy only from `main`)

- Negative
  - Slightly more branching overhead than trunk-based development
  - Requires discipline to keep `develop` stable

## Implementation

1. Initialize git-flow configuration for this repository (production=main, develop=develop).
2. Document the configured branches and prefixes in `docs/git-flow.md`.
3. CI: Run integration tests on pushes to `develop` and on PRs from `feature/*` into `develop`.
4. Deployment: Deploy only from `main` (triggered by `push` to `main` or merge of a release/hotfix branch).

## References

- Git Flow: https://nvie.com/posts/a-successful-git-branching-model/
- Git Flow AVH implementation: https://github.com/petervanderdoes/gitflow-avh
