# ADR-002: Adopt Lefthook for Git Hooks Management

## Status
Accepted

## Context
The project needed a robust git hooks management system to enforce code quality standards and conventional commit messages before code is committed or pushed. We needed a tool that could handle multiple hooks, run them in parallel, and integrate well with our modern development workflow.

## Decision
Adopt Lefthook as the git hooks management system to automate code quality checks and commit message validation.

## Alternatives Considered
1. **Husky**: Popular git hooks manager
   - Pro: Large community, extensive documentation
   - Con: Slower performance, JavaScript-based, more complex setup

2. **Simple-git-hooks**: Lightweight alternative to Husky
   - Pro: Lightweight, fast
   - Con: Limited features, no parallel execution

3. **Native Git Hooks**: Use git hooks directly
   - Pro: No additional dependencies
   - Con: Difficult to share and manage across team, no cross-platform support

4. **pre-commit (Python)**: Python-based hook framework
   - Pro: Extensive plugin ecosystem
   - Con: Requires Python, overkill for JavaScript projects

## Consequences

### Positive
- **High performance**: Written in Go, extremely fast execution
- **Parallel execution**: Can run multiple hooks simultaneously
- **Cross-platform**: Works on Windows, macOS, and Linux
- **YAML configuration**: Easy to read and modify
- **Conditional execution**: Can skip hooks based on file patterns
- **Integration with pnpm**: Works seamlessly with pnpm scripts

### Negative
- **Smaller community**: Less popular than Husky
- **Go dependency**: Requires Go binary (handled by pnpm)
- **Learning curve**: Different configuration syntax than alternatives

### Neutral
- **Configuration file**: Uses `lefthook.yml` instead of `package.json` scripts
- **Hook types**: Supports standard git hooks (pre-commit, commit-msg, pre-push)

## Implementation
1. **Installed Lefthook**:
   ```bash
   pnpm add -D lefthook
   ```

2. **Configured hooks** (`lefthook.yml`):
   ```yaml
   pre-commit:
     parallel: true
     commands:
       lint-biome:
         glob: "*.{js,jsx,ts,tsx,json}"
         run: pnpm biome check --write --unsafe {staged_files}
         stage_fixed: true
       type-check:
         glob: "*.{ts,tsx}"
         run: pnpm tsc --noEmit
   
   commit-msg:
     commands:
       commitlint:
         run: pnpm commitlint --edit {1}
   
   pre-push:
     commands:
       lint:
         run: pnpm lint
   ```

3. **Added installation script** to `package.json`:
   ```json
   {
     "scripts": {
       "prepare": "lefthook install"
     }
   }
   ```

4. **Configured hook behaviors**:
   - **Pre-commit**: Lint and format staged files, run type checking
   - **Commit-msg**: Validate commit message format
   - **Pre-push**: Final lint check before pushing

## References
- [Lefthook Documentation](https://lefthook.dev/)
- [Lefthook vs Husky Comparison](https://lefthook.dev/guide/alternatives.html)
- [Git Hooks Overview](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)