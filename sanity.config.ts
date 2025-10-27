import { apiVersion, dataset, projectId, validateEnvironment } from '@lib/env'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schema/index'
import { structure } from '@src/structure'
import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { structureTool } from 'sanity/structure'

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
