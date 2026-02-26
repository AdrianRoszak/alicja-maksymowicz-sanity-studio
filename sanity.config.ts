import { DEFAULT_LANGUAGE_IDS, LANGUAGES } from '@config/i18n'
import { apiVersion, dataset, projectId, validateEnvironment } from '@lib/env'
import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schema/index'
import { FormInputWrapper, StudioLayout } from '@src/components'
import { structure } from '@src/structure'
import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { structureTool } from 'sanity/structure'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

// Validate environment variables on startup
validateEnvironment()

export default defineConfig({
  name: 'am',
  title: 'AlicjaMaksymowicz',
  studioHost: 'alicja-maksymowicz',
  projectId: projectId ?? '',
  dataset: dataset ?? '',
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
    internationalizedArray({
      languages: [...LANGUAGES],
      defaultLanguages: [...DEFAULT_LANGUAGE_IDS],
      fieldTypes: ['string', 'text'],
      buttonLocations: ['field'],
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'pl', title: 'Polski' },
        { id: 'en', title: 'Angielski' },
      ],
      schemaTypes: [
        'benefit',
        'blog_post',
        'course',
        'page_home',
        'page_about_me',
        'page_contact',
        'page_blog',
        'testimonial',
        'hero',
        'faq',
        'company_data',
        'competency',
        'trust_point',
        'benefits_block',
      ],
    }),
  ],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  apiVersion,
  studio: {
    components: {
      layout: StudioLayout,
    },
  },
  form: {
    components: {
      input: FormInputWrapper,
    },
  },
})
