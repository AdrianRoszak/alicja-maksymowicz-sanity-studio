import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, basePath, dataset, projectId, validateEnvironment} from './lib/env'
import {schemaTypes} from './schemaTypes'

// Validate environment variables on startup
validateEnvironment()

export default defineConfig({
  name: 'default',
  title: 'AlicjaMaksymowicz',

  projectId: projectId!,
  dataset: dataset!,

  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // API configuration
  apiVersion,

  // Base path for the studio (useful for deployment)
  basePath,
})
