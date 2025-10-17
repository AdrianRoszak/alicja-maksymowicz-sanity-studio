/**
 * Environment configuration for Sanity Studio
 * This file centralizes all environment variable handling
 */

// Required environment variables
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'u1jpe37y'
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// API configuration
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2023-10-17'
export const basePath = process.env.SANITY_STUDIO_BASE_PATH || '/'

// Authentication tokens (optional, used for programmatic access)
export const authToken = process.env.SANITY_AUTH_TOKEN
export const readToken = process.env.SANITY_STUDIO_READ_TOKEN
export const writeToken = process.env.SANITY_STUDIO_WRITE_TOKEN

// Development settings
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
export const debugMode = process.env.DEBUG === 'true'

// Validation function to ensure required env vars are present
export function validateEnvironment() {
  const required = {
    SANITY_STUDIO_PROJECT_ID: projectId,
    SANITY_STUDIO_DATASET: dataset,
  }

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please copy .env.example to .env and fill in the required values.',
    )
  }
}

// Export all config as a single object for convenience
export const config = {
  projectId,
  dataset,
  apiVersion,
  basePath,
  authToken,
  readToken,
  writeToken,
  isDevelopment,
  isProduction,
  debugMode,
} as const
