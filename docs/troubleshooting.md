# Troubleshooting Guide

This guide helps resolve common issues encountered during development and deployment of the Alicja Maksymowicz Sanity Studio.

## 🚨 Quick Diagnosis

### Check These First
1. **Environment Variables**: Verify `.env` file exists and has correct values
2. **Dependencies**: Run `pnpm install` to ensure all packages are installed
3. **Git Hooks**: Check if Lefthook is installed: `lefthook version`
4. **Node Version**: Ensure Node.js 18+ is installed: `node --version`
5. **Sanity Auth**: Verify you can access Sanity Studio in browser

## 🛠️ Development Issues

### pnpm Installation Problems

#### Issue: pnpm command not found
```bash
pnpm: command not found
```

**Solution:**
```bash
# Install pnpm globally
npm install -g pnpm

# Or install via specific method
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Restart terminal and verify
pnpm --version
```

#### Issue: Dependency installation fails
```bash
ERR_PNPM_PEER_DEP_ISSUES
```

**Solution:**
```bash
# Clear pnpm cache and reinstall
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install

# If issues persist, use legacy peer deps
pnpm install --legacy-peer-deps
```

### Git Hooks Issues

#### Issue: Git hooks not running
```bash
# Commits succeed without running hooks
```

**Solution:**
```bash
# Reinstall Lefthook hooks
pnpm lefthook install

# Verify hooks are installed
ls -la .git/hooks/

# Check Lefthook configuration
lefthook version
cat lefthook.yml
```

#### Issue: Pre-commit hook fails
```bash
✖ lint-biome failed
```

**Solution:**
```bash
# Run lint manually to see errors
pnpm lint

# Fix automatically if possible
pnpm lint:fix

# Check specific files
pnpm biome check path/to/file.ts

# Skip hooks temporarily (not recommended)
git commit --no-verify -m "message"
```

### Environment Configuration Issues

#### Issue: Environment variables not loading
```bash
Missing required environment variables: SANITY_STUDIO_PROJECT_ID
```

**Solution:**
```bash
# Check if .env file exists
ls -la .env

# Create from template if missing
cp .env.example .env

# Edit with correct values
# Required: SANITY_STUDIO_PROJECT_ID=u1jpe37y
#          SANITY_STUDIO_DATASET=production

# Restart development server
pnpm dev
```

#### Issue: Sanity Studio not loading
```bash
# Browser shows loading screen or errors
```

**Solution:**
```bash
# Check console for errors
# Open browser dev tools → Console

# Verify environment variables in lib/env.ts
cat lib/env.ts

# Check Sanity configuration
cat sanity.config.ts
cat sanity.cli.ts

# Restart with clean cache
rm -rf .sanity
pnpm dev
```

## 🔧 Code Quality Issues

### Biome Linting Problems

#### Issue: Biome configuration errors
```bash
✖ Some errors were emitted while running checks
```

**Solution:**
```bash
# Check Biome configuration
cat biome.json

# Validate configuration
pnpm biome check --config-path biome.json

# Reset to default configuration
pnpm biome init

# Migrate from Prettier if needed
pnpm biome migrate prettier --write
```

#### Issue: Import organization conflicts
```bash
✖ The imports and exports are not sorted
```

**Solution:**
```bash
# Fix imports automatically
pnpm biome check --write --unsafe

# Fix specific file
pnpm biome format --write path/to/file.ts

# Configure import sorting in biome.json
```

### TypeScript Issues

#### Issue: Type checking errors
```bash
error TS2304: Cannot find name 'process'
```

**Solution:**
```bash
# Install Node types if missing
pnpm add -D @types/node

# Check TypeScript configuration
cat tsconfig.json

# Run type check manually
pnpm tsc --noEmit

# Update TypeScript version
pnpm update typescript
```

#### Issue: Module resolution problems
```bash
Cannot find module './lib/env' or its corresponding type declarations
```

**Solution:**
```bash
# Check file exists
ls -la lib/env.ts

# Verify import path is correct
# Use relative path: import { config } from './lib/env'
# Not absolute: import { config } from 'lib/env'

# Clear TypeScript cache
rm -rf .tsbuildinfo
pnpm tsc --noEmit
```

## 🚀 Deployment Issues

### GitHub Actions Failures

#### Issue: Deploy workflow authentication error
```bash
Error: You must login first - run "sanity login"
```

**Solution:**
1. **Check GitHub Secrets**:
   - Go to repository → Settings → Secrets and variables → Actions
   - Verify `SANITY_AUTH_TOKEN` secret exists

2. **Regenerate Sanity Token**:
   - Visit [Sanity Manage](https://sanity.io/manage)
   - Go to API → Tokens
   - Create new **Robot token** with **Deployer** permissions
   - Update GitHub secret

3. **Test token locally**:
   ```bash
   export SANITY_AUTH_TOKEN="your_token"
   npx sanity projects list
   ```

#### Issue: pnpm lock file not found
```bash
Dependencies lock file is not found
```

**Solution:**
```bash
# This was fixed in workflow configuration
# Check that workflows use proper pnpm setup, not npm caching

# Verify pnpm-lock.yaml exists
ls -la pnpm-lock.yaml

# Regenerate if corrupted
rm pnpm-lock.yaml
pnpm install
```

#### Issue: Build failures in CI
```bash
Process completed with exit code 1
```

**Solution:**
1. **Check workflow logs** in GitHub Actions tab
2. **Test build locally**:
   ```bash
   pnpm install --frozen-lockfile
   pnpm lint
   pnpm tsc --noEmit
   pnpm build
   ```
3. **Verify environment variables** in GitHub repository settings

### Sanity Studio Issues

#### Issue: Studio not accessible after deployment
```bash
# Studio URL returns 404 or loading errors
```

**Solution:**
```bash
# Check deployment status in Sanity
# Visit: https://sanity.io/manage/project/u1jpe37y/studios

# Verify deployment in CLI
npx sanity projects list
npx sanity deploy --dry-run

# Check for deployment errors in logs
```

#### Issue: Content not loading in Studio
```bash
# Studio loads but content/schemas missing
```

**Solution:**
```bash
# Check schema configuration
cat schemaTypes/index.ts

# Verify schema export in sanity.config.ts
cat sanity.config.ts

# Test schema locally
pnpm dev
# Check browser console for schema errors
```

## 🔍 Debugging Techniques

### Local Development Debugging

#### Enable Debug Mode
```bash
# Add to .env file
DEBUG=true
NODE_ENV=development

# Restart development server
pnpm dev
```

#### Check Network Requests
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Look for failed requests to Sanity API
4. Check request headers and response errors

#### Inspect Sanity Configuration
```bash
# Check resolved configuration
cat .sanity/runtime/app.js

# Verify project connection
npx sanity debug --secrets
```

### CI/CD Debugging

#### GitHub Actions Logs
1. Go to repository → Actions tab
2. Click on failed workflow run
3. Expand failed job steps
4. Look for error messages and stack traces

#### Local CI Simulation
```bash
# Run the same commands as CI
export NODE_ENV=production
export SANITY_STUDIO_PROJECT_ID=u1jpe37y
export SANITY_STUDIO_DATASET=production

pnpm install --frozen-lockfile
pnpm lint
pnpm tsc --noEmit
pnpm build
```

## 📊 Performance Issues

### Slow Development Server

#### Issue: Long startup or slow reload times
**Solution:**
```bash
# Clear Sanity cache
rm -rf .sanity

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install

# Use faster terminal/shell
# Ensure adequate system resources (RAM, CPU)
```

### Large Bundle Size

#### Issue: Studio loads slowly in production
**Solution:**
```bash
# Analyze bundle size
pnpm build
# Check dist/ folder size

# Remove unused dependencies
pnpm depcheck

# Update to latest Sanity version
pnpm update sanity
```

## 🆘 Getting Help

### Self-Diagnosis Checklist
- [ ] Environment variables configured correctly
- [ ] Dependencies installed (`pnpm install`)
- [ ] Git hooks working (`lefthook version`)
- [ ] TypeScript compiling (`pnpm tsc --noEmit`)
- [ ] Linting passing (`pnpm lint`)
- [ ] Build succeeding (`pnpm build`)

### Documentation Resources
1. **Project ADRs**: Check [docs/adr/](./adr/) for architectural context
2. **Development Setup**: [development-setup.md](./development-setup.md)
3. **Deployment Guide**: [deployment-guide.md](./deployment-guide.md)
4. **GitHub Actions**: [../.github/GITHUB_ACTIONS.md](../.github/GITHUB_ACTIONS.md)

### External Resources
- [Sanity Documentation](https://www.sanity.io/docs)
- [Biome Documentation](https://biomejs.dev/guides/getting-started/)
- [pnpm Troubleshooting](https://pnpm.io/troubleshooting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Community Support
- **Sanity Community**: [Sanity Slack](https://www.sanity.io/community/join)
- **GitHub Issues**: Check repository issues for similar problems
- **Stack Overflow**: Search for specific error messages

## 📝 Reporting Issues

When reporting issues, include:
1. **Error message**: Full error text and stack trace
2. **Environment**: OS, Node.js version, pnpm version
3. **Steps to reproduce**: Exact commands run
4. **Expected vs actual behavior**
5. **Relevant logs**: Console output, GitHub Actions logs

### Issue Template
```
**Environment:**
- OS: [macOS/Windows/Linux]
- Node.js: [version]
- pnpm: [version]

**Issue:**
[Description of the problem]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [Third step]

**Error Message:**
```
[Paste full error message here]
```

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]
```