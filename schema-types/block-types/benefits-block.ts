import { createSectionBlock } from '@schema/creators/create-section-block'
import { defineFieldWithDescription } from '@src/lib'
import { defineType } from 'sanity'

export const benefitsBlock = defineType({
  name: 'benefits_block',
  title: 'Korzyści',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'benefits_block_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tej sekcji.',
    }),
    defineFieldWithDescription({
      name: 'benefits_block_benefits',
      title: 'Korzyści',
      type: 'object',
      description: 'Dodaj sekcję z korzyściami kursu.',
      fields: createSectionBlock({
        hasDescription: true,
        referencesType: 'BENEFIT',
      }),
    }),
  ],
  preview: {
    select: {
      title: 'benefits_block_benefits.section_block_title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Korzyści',
      }
    },
  },
})
