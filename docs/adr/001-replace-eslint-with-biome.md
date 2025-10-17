# ADR-001: Replace ESLint with Biome for Linting and Formatting

## Status
Accepted

## Context
The project initially used ESLint with Prettier for code linting and formatting. However, we needed a faster, more modern toolchain that could handle both linting and formatting in a single tool while providing better performance and TypeScript support.

## Decision
Replace ESLint and Prettier with Biome as the primary linting and formatting tool.

## Alternatives Considered
1. **Keep ESLint + Prettier**: Maintain the existing setup
   - Pro: Familiar toolchain, extensive ecosystem
   - Con: Slower performance, two separate tools, configuration complexity

2. **Rome (predecessor to Biome)**: Use Rome as the unified toolchain
   - Pro: Fast, unified tooling
   - Con: Project was discontinued and succeeded by Biome

3. **SWC + ESLint**: Use SWC for faster parsing with ESLint
   - Pro: Faster than standard ESLint
   - Con: Still requires separate formatting tool, added complexity

## Consequences

### Positive
- **Significant performance improvement**: Biome is 10-100x faster than ESLint
- **Unified toolchain**: Single tool for linting, formatting, and import organization
- **Better TypeScript support**: Native TypeScript support without additional configuration
- **Consistent formatting**: No conflicts between linter and formatter
- **Modern rule set**: Built-in recommended rules optimized for modern JavaScript/TypeScript

### Negative
- **Smaller ecosystem**: Fewer plugins compared to ESLint
- **Learning curve**: Team needs to familiarize with new tool
- **Migration effort**: Required updating configuration and CI/CD pipelines

### Neutral
- **Configuration format**: Uses JSON instead of JavaScript for configuration
- **Rule compatibility**: Most important ESLint rules are available in Biome

## Implementation
1. **Removed ESLint dependencies**:
   - `eslint`
   - `@sanity/eslint-config-studio`
   - Deleted `eslint.config.mjs`

2. **Installed Biome**:
   ```bash
   pnpm add -D @biomejs/biome
   ```

3. **Initialized Biome configuration**:
   ```bash
   pnpm biome init
   ```

4. **Migrated Prettier settings**:
   ```bash
   pnpm biome migrate prettier --write
   ```

5. **Updated package.json scripts**:
   ```json
   {
     "lint": "biome check",
     "lint:fix": "biome check --write",
     "format": "biome format --write"
   }
   ```

6. **Configured Biome** (`biome.json`):
   - Enabled VCS integration to respect `.gitignore`
   - Configured formatting rules to match previous Prettier settings
   - Set up import organization and linting rules
   - Configured file patterns and exclusions

## References
- [Biome Documentation](https://biomejs.dev/)
- [ESLint to Biome Migration Guide](https://biomejs.dev/guides/migrate-eslint/)
- [Performance Comparison](https://biomejs.dev/blog/biome-wins-prettier-challenge/)