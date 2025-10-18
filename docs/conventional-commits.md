# Conventional Commits Guide

This project uses the Conventional Commits specification to standardize commit messages.

## Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types
- `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

## Examples
```
feat: add user authentication
fix: resolve login validation issue
docs: update API documentation
```

## Breaking changes
Use `!` after type/scope for breaking changes, e.g. `feat!: change API`.

For more details, see the ADR (`docs/adr/003-implement-conventional-commits.md`).
