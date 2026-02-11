# Secrets and CI configuration

This document explains which repository secrets are required for CI and deploy workflows, what they mean, and how to configure them for local development.

> Important: Keep all secrets out of source control. Use GitHub Repository secrets (Settings → Secrets & variables → Actions) or Organization/Environment secrets as appropriate.

## Required secrets

- `SANITY_AUTH_TOKEN` (required for deployment)
  - Description: Sanity CLI token used to authenticate deploys. Must have write access to the target project/dataset.
  - Recommended scope: project write / deploy permissions only. Avoid granting wider access than necessary.

- `SANITY_STUDIO_PROJECT_ID` (required)
  - Description: Sanity project ID used by the Studio build and CLI.
  - Example: `u1jpe37y` (this value is considered metadata but should still be stored consistently in secrets or environment variables).

- `SANITY_STUDIO_DATASET` (required)
  - Description: Target dataset name (e.g., `production` or `staging`).

- `SANITY_STUDIO_API_VERSION` (optional)
  - Description: Sanity API version string used in the Studio build. If omitted, workflows may fallback to a default value.
  - Example: `2023-10-17`

- `SANITY_STUDIO_BASE_PATH` (optional)
  - Description: Base path where the Studio is served. Useful when deploying to subpaths.

## Update Dependencies workflow (update-deps)

The `update-deps` workflow uses the following. **No values are hardcoded in the workflow; configure them in Settings → Secrets and variables → Actions.**

- **OPENAI_API_KEY** (Secret, required for AI assessment)
  - Description: OpenAI API key used for dependency risk assessment (e.g. gpt-4o).
  - Create at: Settings → Secrets and variables → Actions → New repository secret.

- **SLACK_WEBHOOK** (Secret, optional)
  - Description: Slack webhook URL for notifications when a dependency update PR is created. If not set, the notification step is skipped.

- **SANITY_STUDIO_PROJECT_ID**, **SANITY_STUDIO_DATASET**, **SANITY_STUDIO_API_VERSION**
  - Description: Used when running `pnpm build` in the workflow. Can be stored as repository **Variables** (or Secrets).
  - Ensure these are set so the workflow does not rely on hardcoded values.

For local consistency, the same keys are documented in `.env.example` (for local or script use). For GitHub Actions, only Secrets and Variables in the repository settings are used.

## Where to store them

- Repository-level secrets: Settings → Secrets & variables → Actions → New repository secret.
- For stricter control, use Environment-level secrets and require approvals for deployments.

## Local development

- Keep a `.env` file locally (add `.env` to `.gitignore`). Use a `.env.example` committed with placeholders to document required keys.
- Example `.env.example`:

```
SANITY_AUTH_TOKEN=REPLACE_ME
SANITY_STUDIO_PROJECT_ID=REPLACE_ME
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2023-10-17
SANITY_STUDIO_BASE_PATH=/
```

- To run the Studio locally with your env file, use a tool such as `direnv` or `dotenv` to load the variables into your shell.

## CI notes and best practices

- Secrets are not available to workflows triggered from forks; do not rely on secrets in PR checks from external contributors.
- Composite actions and reusable workflows do not automatically receive secrets — they must be passed explicitly by the caller.
- Avoid printing environment variables in logs. GitHub redacts secrets printed directly, but transformations (encoding, hashing) may bypass redaction.

## Troubleshooting

- "Authentication failed": Check `SANITY_AUTH_TOKEN` exists and has the correct scopes.
- "Project not found": Check `SANITY_STUDIO_PROJECT_ID` matches the Sanity project id and `SANITY_STUDIO_DATASET` is correct.
- If workflows use different values in CI and deploy, align them to avoid inconsistencies.

## Rotation & security

- Rotate deploy tokens periodically and after personnel changes.
- Use minimal required scopes for tokens.
- Consider using Environment protection rules to require approvals before exposing deployment secrets.
