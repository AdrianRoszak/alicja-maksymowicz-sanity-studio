# Testing & Schema Validation

This document describes the automated tests and conventions used to ensure schema quality in this project.

## Test File Naming Convention
- All test files with multiple words use hyphens as separators (e.g., `schema-names.test.ts`, `schema-description.test.ts`).

## Schema Validation Tests

### `test/schema-names.test.ts`
- Ensures all Sanity schema field names are snake_case.
- Enforces that top-level field names are prefixed with the schema name, and one-level nested fields are prefixed with their parent field's name.
- Uses Sanity's `FieldDefinition` type for strict type safety.

### `test/schema-description.test.ts`
- Ensures every field in the `blogPost` schema has a non-empty `description` property.
- Recursively checks nested fields for documentation completeness.

## Running Tests
To run all tests:
```bash
pnpm test
```

## Why These Tests?
- **Consistency:** Enforces naming conventions for easier maintenance and integration.
- **Documentation:** Ensures all fields are described, improving developer experience and API clarity.
- **Type Safety:** Uses Sanity's official types for validation, ensuring tests match real schema usage.

See the test files in `/test/` for implementation details and extend as needed for new schemas.
