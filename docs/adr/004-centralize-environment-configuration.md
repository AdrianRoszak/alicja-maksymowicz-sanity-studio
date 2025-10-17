# ADR-004: Centralize Environment Configuration

## Status
Accepted

## Context
The Sanity Studio configuration was hardcoded with project ID, dataset, and other settings directly in the configuration files. This approach made it difficult to deploy to different environments (development, staging, production) and created security risks by potentially exposing sensitive configuration in the codebase.

## Decision
Centralize all environment-specific configuration using environment variables with a dedicated configuration module that provides validation and fallback values.

## Alternatives Considered
1. **Hardcoded configuration**: Keep configuration values directly in files
   - Pro: Simple, no additional setup required
   - Con: Inflexible, security risks, difficult multi-environment deployment

2. **dotenv with inline usage**: Use environment variables directly in config files
   - Pro: Environment-specific configuration
   - Con: Scattered configuration, no validation, potential runtime errors

3. **Configuration service**: Create a complex configuration management service
   - Pro: Advanced features, validation
   - Con: Overkill for this project size, added complexity

4. **Build-time configuration**: Use build tools to inject configuration
   - Pro: No runtime environment dependency
   - Con: Requires rebuild for different environments, less flexible

## Consequences

### Positive
- **Environment flexibility**: Easy deployment to different environments
- **Security**: Sensitive data not committed to repository
- **Validation**: Centralized validation prevents runtime errors
- **Type safety**: TypeScript types for configuration values
- **Fallback values**: Default values for development
- **Single source of truth**: All configuration in one place

### Negative
- **Setup complexity**: Requires environment variable setup
- **Runtime dependency**: Application depends on environment configuration
- **Documentation overhead**: Need to document required variables

### Neutral
- **Environment files**: Requires `.env` management
- **Deployment considerations**: CI/CD needs environment configuration

## Implementation
1. **Created centralized configuration** (`lib/env.ts`):
   ```typescript
   export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'u1jpe37y'
   export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
   export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2023-10-17'
   export const basePath = process.env.SANITY_STUDIO_BASE_PATH || '/'
   
   export function validateEnvironment() {
     const required = {
       SANITY_STUDIO_PROJECT_ID: projectId,
       SANITY_STUDIO_DATASET: dataset,
     }
     
     const missing = Object.entries(required)
       .filter(([_, value]) => !value)
       .map(([key]) => key)
     
     if (missing.length > 0) {
       throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
     }
   }
   ```

2. **Updated Sanity configuration files**:
   - `sanity.cli.ts`: Import and use environment variables
   - `sanity.config.ts`: Import and use environment variables
   - Added validation calls on startup

3. **Created environment files**:
   - `.env`: Actual environment variables (git-ignored)
   - `.env.example`: Template for team members

4. **Updated .gitignore**:
   ```gitignore
   # Environment variables
   .env
   .env.*
   !.env.example
   ```

5. **Added documentation**:
   - README section explaining environment setup
   - List of required and optional variables
   - Setup instructions for different environments

## Environment Variables
### Required
- `SANITY_STUDIO_PROJECT_ID`: Sanity project identifier
- `SANITY_STUDIO_DATASET`: Target dataset (production, staging, etc.)

### Optional
- `SANITY_STUDIO_API_VERSION`: API version (default: 2023-10-17)
- `SANITY_STUDIO_BASE_PATH`: Deployment base path (default: /)
- `SANITY_AUTH_TOKEN`: Authentication token for CLI operations
- `NODE_ENV`: Environment mode (development, production)
- `DEBUG`: Debug mode flag

## References
- [Twelve-Factor App - Config](https://12factor.net/config)
- [Sanity Environment Variables](https://www.sanity.io/docs/environment-variables)
- [dotenv Documentation](https://github.com/motdotla/dotenv)