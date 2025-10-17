# Deployment Guide

This guide covers deploying the Alicja Maksymowicz Sanity Studio to production environments.

## 🎯 Deployment Overview

The project uses GitHub Actions for automated deployment with the following pipeline:
- **Develop branch**: Continuous integration testing
- **Main branch**: Automated production deployment to Sanity

## 🔧 Prerequisites

### Sanity Studio Setup
1. **Project Access**: Admin access to Sanity project `u1jpe37y`
2. **Deployment Token**: Robot token with deployment permissions
3. **GitHub Repository**: Admin access for secrets configuration

### Required Credentials
- Sanity authentication token
- GitHub repository secrets/variables access

## 🚀 Production Deployment

### Automated Deployment (Recommended)
The project deploys automatically when code is merged to the `main` branch.

#### Workflow:
1. **Development**: Work on `develop` branch
2. **Testing**: CI runs on `develop` pushes and PRs
3. **Release**: Merge PR from `develop` to `main`
4. **Deploy**: GitHub Actions automatically deploys to Sanity

### Manual Deployment
For emergency deployments or initial setup:

```bash
# Ensure you're on the main branch
git checkout main
git pull origin main

# Set environment variables
export SANITY_AUTH_TOKEN="your_deployment_token"

# Deploy to Sanity
pnpm deploy
```

## ⚙️ GitHub Actions Configuration

### Repository Secrets
Set these secrets in GitHub repository settings:

#### Required Secrets
```
SANITY_AUTH_TOKEN
```

**How to create:**
1. Visit [Sanity Manage](https://sanity.io/manage)
2. Select project: `AlicjaMaksymowicz (u1jpe37y)`
3. Navigate to: **API** → **Tokens**
4. Create new token:
   - **Name**: `GitHub Actions Deploy`
   - **Permissions**: `Deployer` or `Editor`
   - **Token type**: `Robot token`
5. Copy token and add as GitHub secret

### Repository Variables
Set these variables in GitHub repository settings:

```
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2023-10-17
SANITY_STUDIO_BASE_PATH=/
```

### Setting Secrets and Variables
1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add secrets in the **Secrets** tab
3. Add variables in the **Variables** tab

## 📋 Deployment Workflows

### Deploy Workflow
**File**: `.github/workflows/deploy.yml`
**Triggers**: 
- Push to `main` branch
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Node.js and pnpm
3. Install dependencies with caching
4. Run quality checks (lint, type check)
5. Build Studio
6. Deploy to Sanity

### CI Workflow
**File**: `.github/workflows/ci.yml`
**Triggers**:
- Push to `develop` branch
- Pull requests to `main` or `develop`

**Steps**:
1. Multi-node testing (Node.js 20 & 22)
2. Code quality validation
3. Build verification
4. Security audit

## 🌍 Environment Management

### Production Environment
- **Sanity Dataset**: `production`
- **API Version**: `2023-10-17`
- **Base Path**: `/`
- **Node Environment**: `production`

### Staging Environment (Optional)
To set up staging deployment:

1. **Create staging dataset** in Sanity project
2. **Add staging secrets**:
   ```
   SANITY_STUDIO_DATASET_STAGING=staging
   ```
3. **Create staging workflow** (copy deploy.yml)
4. **Deploy to staging** on develop branch

## 🔍 Monitoring and Verification

### Deployment Verification
After deployment, verify:

1. **GitHub Actions**: Check workflow completed successfully
2. **Sanity Studio**: Visit production URL and test functionality
3. **Console**: Check browser console for errors
4. **Content**: Verify content loads and editing works

### Monitoring
- **GitHub Actions**: Monitor workflow runs and failures
- **Sanity Logs**: Check Sanity project logs for issues
- **Error Tracking**: Browser console and network tab

## 🐛 Troubleshooting Deployment

### Common Issues

#### Authentication Failures
```
Error: You must login first - run "sanity login"
```

**Solutions**:
1. Verify `SANITY_AUTH_TOKEN` secret is set correctly
2. Check token permissions (needs Deployer/Editor role)
3. Regenerate token if expired
4. Ensure token is for the correct project

#### Build Failures
```
Error: Process completed with exit code 1
```

**Solutions**:
1. Check GitHub Actions logs for specific error
2. Verify all environment variables are set
3. Test build locally: `pnpm build`
4. Check for TypeScript errors: `pnpm tsc --noEmit`

#### Dependency Issues
```
Dependencies lock file is not found
```

**Solutions**:
1. This was resolved by proper pnpm configuration
2. Verify workflows use pnpm caching, not npm
3. Check `pnpm-lock.yaml` exists in repository

#### Environment Variable Issues
```
Missing required environment variables
```

**Solutions**:
1. Verify all required secrets/variables are set in GitHub
2. Check variable names match exactly (case-sensitive)
3. Ensure variables are available to the workflow

### Manual Debug Steps

#### Local Build Test
```bash
# Test the exact build process used in CI
export SANITY_STUDIO_PROJECT_ID=u1jpe37y
export SANITY_STUDIO_DATASET=production
export SANITY_STUDIO_API_VERSION=2023-10-17

pnpm install --frozen-lockfile
pnpm lint
pnpm tsc --noEmit
pnpm build
```

#### Deployment Test
```bash
# Test deployment locally (requires auth token)
export SANITY_AUTH_TOKEN="your_token_here"
pnpm deploy
```

## 📊 Performance Considerations

### Build Optimization
- **Caching**: pnpm store cache reduces build time
- **Parallel jobs**: Multiple workflows can run simultaneously
- **Incremental builds**: Only changed files are processed

### Deployment Speed
- **Sanity CDN**: Studio deploys to global CDN
- **Asset optimization**: Sanity optimizes studio assets
- **Source maps**: Included for debugging (can be disabled)

## 🔄 Rollback Procedures

### Emergency Rollback
If deployment causes issues:

1. **Revert commit**: 
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Manual deploy previous version**:
   ```bash
   git checkout <previous-commit>
   pnpm deploy
   ```

3. **Disable auto-deployment**: Comment out deploy workflow if needed

### Rollback Verification
After rollback:
1. Verify Studio functionality
2. Test content editing
3. Check for any data consistency issues

## 📈 Deployment Best Practices

1. **Test thoroughly**: Always test on develop branch first
2. **Small deployments**: Deploy small, incremental changes
3. **Monitor deployments**: Watch for errors after deployment
4. **Backup strategy**: Sanity handles content backups automatically
5. **Documentation**: Keep deployment notes for major changes

## 🔗 Related Documentation

- [ADR-005: GitHub Actions CI/CD Pipeline](./adr/005-github-actions-ci-cd-pipeline.md)
- [GitHub Actions Setup Guide](../.github/GITHUB_ACTIONS.md)
- [Development Setup Guide](./development-setup.md)
- [Troubleshooting Guide](./troubleshooting.md)