# GitHub Actions Setup Guide

This project uses GitHub Actions for continuous integration, deployment, and automation.

## 🔧 Initial Setup

### 1. Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

**Required Secrets:**
```
SANITY_AUTH_TOKEN
```
Get this token from: https://sanity.io/manage → Your Project → API → Tokens

### 2. Repository Variables

**Required Variables:**
```
SANITY_STUDIO_DATASET=production
```

**Optional Variables:**
```
SANITY_STUDIO_API_VERSION=2023-10-17
SANITY_STUDIO_BASE_PATH=/
```

### 3. Branch Protection Rules

Recommended branch protection for `main`:
- ✅ Require pull request reviews
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Required status checks:
  - `Test and Lint (20)`
  - `Test and Lint (22)`
  - `Security Analysis`

## 📋 Workflow Details

### Deploy Workflow (`deploy.yml`)
- **Purpose:** Production deployment to Sanity
- **Trigger:** Push to `main` branch
- **Steps:** Install → Lint → Type Check → Build → Deploy
- **Environment:** Uses production secrets and variables

### CI Workflow (`ci.yml`)
- **Purpose:** Continuous integration testing
- **Trigger:** Push to `develop`, PRs to `main`/`develop`
- **Matrix:** Tests on Node.js 20 & 22
- **Validation:** Linting, type checking, building, security audit

### Security Workflow (`security.yml`)
- **Purpose:** Security analysis and vulnerability scanning
- **Trigger:** Push, PRs, daily schedule (6 AM UTC)
- **Tools:** CodeQL, npm audit
- **Reports:** Security tab in GitHub repository

### Dependencies Workflow (`update-deps.yml`)
- **Purpose:** Automated dependency updates
- **Trigger:** Weekly schedule (Mondays, 9 AM UTC)
- **Process:** Update deps → Test → Create PR if changes
- **Review:** Manual review required before merge

## 🚨 Troubleshooting

### Common Issues

1. **Deploy fails with auth error:**
   - Check `SANITY_AUTH_TOKEN` secret is correctly set
   - Verify token has deployment permissions

2. **"Dependencies lock file is not found" error:**
   - This was fixed by removing npm caching and using proper pnpm setup
   - All workflows now use pnpm store caching instead of npm cache

3. **Build fails in CI:**
   - Check if all environment variables are set
   - Review build logs for specific errors

4. **Type checking fails:**
   - Ensure all TypeScript files are properly typed
   - Check for missing type definitions

5. **Security scan fails:**
   - Review vulnerability report in Security tab
   - Update vulnerable dependencies

### Debug Commands

Run locally to debug issues:
```bash
# Test linting
pnpm lint

# Test type checking  
pnpm tsc --noEmit

# Test build
pnpm build

# Test security audit
pnpm audit --audit-level moderate

# Test deploy (with auth token)
SANITY_AUTH_TOKEN=your_token pnpm deploy
```

## 🔄 Workflow Maintenance

### Regular Tasks

1. **Monthly:** Review and update Node.js versions in CI matrix
2. **Quarterly:** Update GitHub Actions versions (@v4 → @v5, etc.)
3. **As needed:** Adjust branch protection rules based on team needs

### Customization

To modify workflows:
1. Edit `.github/workflows/*.yml` files
2. Test changes on feature branches first
3. Update documentation accordingly
4. Consider team workflow preferences