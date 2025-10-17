# ADR-006: Use pnpm as Package Manager

## Status
Accepted

## Context
The project was initially created with npm as the package manager, but we needed a more efficient and reliable package manager that would provide better performance, disk space efficiency, and dependency management. The choice of package manager significantly impacts development experience, CI/CD performance, and project maintenance.

## Decision
Adopt pnpm as the primary package manager for the project, replacing npm.

## Alternatives Considered
1. **npm**: Continue using the default package manager
   - Pro: Default with Node.js, widely supported, simple
   - Con: Slower installation, larger node_modules, potential dependency issues

2. **Yarn Classic**: Use Yarn v1
   - Pro: Faster than npm, lockfile, offline support
   - Con: Maintenance mode, larger node_modules, complex resolution

3. **Yarn Berry (v2+)**: Use modern Yarn with PnP
   - Pro: Advanced features, Plug'n'Play, very fast
   - Con: Complex setup, compatibility issues, steep learning curve

4. **Bun**: Use Bun's package manager
   - Pro: Extremely fast, modern tooling
   - Con: New and unstable, limited ecosystem support

## Consequences

### Positive
- **Performance**: 2x faster installation compared to npm
- **Disk efficiency**: Shared dependency store, smaller node_modules
- **Monorepo support**: Excellent workspace management
- **Strict dependency resolution**: Prevents phantom dependencies
- **Better caching**: Global store with content-addressable storage
- **Security**: Built-in support for .npmrc and dependency verification
- **CI/CD optimization**: Faster builds and deployments

### Negative
- **Learning curve**: Different commands and concepts
- **Ecosystem compatibility**: Some tools assume npm/yarn
- **Additional setup**: Requires pnpm installation in CI/CD

### Neutral
- **Lockfile format**: Uses pnpm-lock.yaml instead of package-lock.json
- **Command differences**: Slightly different CLI commands
- **Configuration**: Uses .npmrc for configuration

## Implementation
1. **Project initialization**: Created with pnpm during Sanity setup
   ```bash
   pnpm create sanity@latest
   ```

2. **Updated package.json scripts** to use pnpm:
   ```json
   {
     "scripts": {
       "dev": "sanity dev",
       "build": "sanity build",
       "lint": "biome check",
       "lint:fix": "biome check --write"
     }
   }
   ```

3. **Configured GitHub Actions** for pnpm:
   ```yaml
   - name: Setup pnpm
     uses: pnpm/action-setup@v4
     with:
       version: 'latest'
       run_install: false
   
   - name: Get pnpm store directory
     shell: bash
     run: |
       echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
   
   - name: Setup pnpm cache
     uses: actions/cache@v4
     with:
       path: ${{ env.STORE_PATH }}
       key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
   ```

4. **Added pnpm configuration** for package publishing control:
   ```json
   {
     "pnpm": {
       "ignoredBuiltDependencies": ["lefthook"]
     }
   }
   ```

5. **Updated documentation** with pnpm-specific commands and setup instructions

## Commands Comparison
| Task | npm | pnpm |
|------|-----|------|
| Install | `npm install` | `pnpm install` |
| Add dependency | `npm install package` | `pnpm add package` |
| Add dev dependency | `npm install -D package` | `pnpm add -D package` |
| Remove package | `npm uninstall package` | `pnpm remove package` |
| Run script | `npm run script` | `pnpm script` |
| Update dependencies | `npm update` | `pnpm update` |

## Performance Benefits
- **Installation speed**: ~2x faster than npm, ~30% faster than Yarn
- **Disk usage**: ~50% less disk space usage
- **Network efficiency**: Better caching reduces redundant downloads
- **CI/CD time**: Significant reduction in build times

## References
- [pnpm Documentation](https://pnpm.io/)
- [pnpm vs npm vs Yarn Benchmarks](https://pnpm.io/benchmarks)
- [pnpm Feature Comparison](https://pnpm.io/feature-comparison)