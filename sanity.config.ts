import { apiVersion, dataset, projectId, validateEnvironment } from '@lib/env'
import { documentInternationalization } from '@sanity/document-internationalization'
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
    documentInternationalization({
      supportedLanguages: [
        { id: 'pl', title: 'Polish' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: [
        'blog_post',
        'course',
        'page_home',
        'page_about_me',
        'page_contact',
        'page_blog',
      ],
    }),
  ],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  apiVersion,
})
