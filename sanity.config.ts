import { apiVersion, dataset, projectId, validateEnvironment } from '@lib/env'
import { visionTool } from '@sanity/vision'
import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema-types'
import { structure } from './src/structure'

// Validate environment variables on startup
validateEnvironment()

export default defineConfig({
  name: 'am',
  title: 'AlicjaMaksymowicz',
  studioHost: 'alicja-maksymowicz',
  projectId: projectId!,
  dataset: dataset!,
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  apiVersion,
})
