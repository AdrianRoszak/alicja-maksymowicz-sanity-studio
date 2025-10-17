# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Alicja Maksymowicz Sanity Studio project. 

ADRs document the architectural decisions made during the development of this project, including the context, decision, and consequences of each choice.

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./001-replace-eslint-with-biome.md) | Replace ESLint with Biome for Linting and Formatting | Accepted | 2025-10-17 |
| [ADR-002](./002-adopt-lefthook-for-git-hooks.md) | Adopt Lefthook for Git Hooks Management | Accepted | 2025-10-17 |
| [ADR-003](./003-implement-conventional-commits.md) | Implement Conventional Commits Standard | Accepted | 2025-10-17 |
| [ADR-004](./004-centralize-environment-configuration.md) | Centralize Environment Configuration | Accepted | 2025-10-17 |
| [ADR-005](./005-github-actions-ci-cd-pipeline.md) | GitHub Actions CI/CD Pipeline Implementation | Accepted | 2025-10-17 |
| [ADR-006](./006-pnpm-as-package-manager.md) | Use pnpm as Package Manager | Accepted | 2025-10-17 |

## ADR Template

When creating a new ADR, use the following template:

```markdown
# ADR-XXX: [Title]

## Status
[Proposed | Accepted | Rejected | Deprecated | Superseded]

## Context
[Describe the context and problem statement]

## Decision
[Describe the decision that was made]

## Alternatives Considered
[List alternative solutions that were considered]

## Consequences
### Positive
- [List positive consequences]

### Negative
- [List negative consequences]

### Neutral
- [List neutral consequences]

## Implementation
[Describe how the decision was implemented]

## References
- [Links to relevant documentation, discussions, etc.]
```