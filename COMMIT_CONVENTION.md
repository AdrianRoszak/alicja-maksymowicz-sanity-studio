# Conventional Commits Guide

This project uses [Conventional Commits](https://conventionalcommits.org/) to standardize commit messages.

## Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Examples
```bash
feat: add user authentication
fix: resolve login validation issue
docs: update API documentation
style: format code with biome
refactor: extract user service
perf: optimize image loading
test: add unit tests for auth service
build: update dependencies
ci: add automated testing workflow
chore: update gitignore
```

## Scopes (optional)
You can add a scope to provide additional context:
```bash
feat(auth): add social login
fix(api): handle null response
docs(readme): add installation guide
```

## Breaking Changes
For breaking changes, add `!` after type/scope:
```bash
feat!: change API response format
refactor(auth)!: update user model
```