# ADR-003: Implement Conventional Commits Standard

## Status
Accepted

## Context
The project needed a standardized way to write commit messages that would enable automatic versioning, changelog generation, and better collaboration between team members. Without a standard format, commit messages were inconsistent and didn't provide enough context for understanding changes.

## Decision
Implement the Conventional Commits specification with commitlint for automated validation.

## Alternatives Considered
1. **No standardization**: Continue with freestyle commit messages
   - Pro: No restrictions, developers can write anything
   - Con: Inconsistent history, difficult to understand changes, no automation possible

2. **Custom commit format**: Create project-specific commit message format
   - Pro: Tailored to project needs
   - Con: Not industry standard, requires documentation, no tooling support

3. **Angular commit format**: Use Angular's commit message format
   - Pro: Well-established, good tooling
   - Con: More complex than Conventional Commits, Angular-specific

4. **Gitmoji**: Use emoji-based commit format
   - Pro: Visual, fun to use
   - Con: Not suitable for professional projects, accessibility issues

## Consequences

### Positive
- **Automated versioning**: Enables semantic versioning automation
- **Changelog generation**: Can automatically generate changelogs
- **Better collaboration**: Clear communication of change types
- **Searchable history**: Easy to find specific types of changes
- **Industry standard**: Widely adopted format
- **Tooling support**: Extensive ecosystem of tools

### Negative
- **Learning curve**: Team needs to learn the format
- **Rigid structure**: Less flexibility in commit messages
- **Enforcement overhead**: Requires validation tooling

### Neutral
- **Message length**: Encourages concise, descriptive messages
- **Breaking changes**: Clear way to mark breaking changes

## Implementation
1. **Installed commitlint**:
   ```bash
   pnpm add -D @commitlint/cli @commitlint/config-conventional
   ```

2. **Created configuration** (`commitlint.config.js`):
   ```javascript
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [2, 'always', [
         'build', 'chore', 'ci', 'docs', 'feat', 
         'fix', 'perf', 'refactor', 'revert', 'style', 'test'
       ]],
       'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
       'subject-empty': [2, 'never'],
       'subject-full-stop': [2, 'never', '.'],
       'type-case': [2, 'always', 'lower-case'],
       'type-empty': [2, 'never']
     }
   }
   ```

3. **Integrated with Lefthook** for commit-msg validation

4. **Added package.json script**:
   ```json
   {
     "scripts": {
       "commitlint": "commitlint"
     }
   }
   ```

5. **Created documentation** (`COMMIT_CONVENTION.md`) with:
   - Format explanation
   - Type definitions
   - Examples for each type
   - Scope usage guidelines
   - Breaking changes notation

## Supported Commit Types
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Other changes
- **revert**: Reverting previous commits

## References
- [Conventional Commits Specification](https://conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Semantic Versioning](https://semver.org/)