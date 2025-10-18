# Git Flow Guide

This repository follows the Git Flow branching model with a few small adaptations to suit a content-studio deployment workflow.

## Branches

- `main` - Production-ready branch. Only merged and deployable code lives here.
- `develop` - Integration branch for ongoing development. Feature branches are merged here.
- `feature/*` - Short-lived branches for new features. Branch off from `develop`.
- `hotfix/*` - Urgent fixes that must go to `main` immediately. Branch off from `main`.
- `release/*` (optional) - Used for preparing a release when you need a QA/pre-release stage.

## Workflow

1. Create a feature branch off `develop`:

```bash
git checkout develop
git pull
git checkout -b feature/my-feature
```

2. Work on your changes locally. Commit using Conventional Commits (see `docs/conventional-commits.md`).

3. Push the feature branch and open a Pull Request to `develop`.

4. CI runs tests and checks. Once approved and green, merge into `develop`.

5. When `develop` is stable and ready for release, create a `release/*` branch (optional) or open a PR to `main`.

6. Merge `release/*` or `develop` into `main`. CI will run the `deploy` workflow and publish the Studio.

7. For hotfixes: create `hotfix/*` from `main`, apply the fix, open a PR to `main`, and merge. Then merge `main` back into `develop`.

## Branch protection

Recommended rules for `main`:
- Require pull request reviews before merging
- Require status checks to pass (CI workflows)
- Require branch to be up to date before merging

Recommended rules for `develop`:
- Require status checks to pass
- Optional: require at least one reviewer

## Release process

- Tag releases on `main` using semantic versioning (e.g., `v1.2.0`).
- Optionally create a `release/*` branch to stabilize and test before merging to `main`.

## Notes

- Use `pnpm` scripts to run local checks before opening PRs:
  - `pnpm lint`
  - `pnpm tsc --noEmit`
  - `pnpm build`
- Follow Conventional Commits to keep changelog and release automation usable.

## Configured git-flow (this repository)

The repository git-flow settings were initialized with the following values:

- Production branch: `main`
- Development branch: `develop`
- Feature prefix: `feature/`
- Release prefix: `release/`
- Hotfix prefix: `hotfix/`
- Support prefix: `support/`

Use these names when running `git flow` commands locally.
