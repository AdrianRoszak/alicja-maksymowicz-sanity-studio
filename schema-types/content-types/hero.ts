import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'hero_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego hero.',
    }),
    defineFieldWithDescription({
      name: 'hero_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
      description: 'Tytuł sekcji hero (maksymalnie 60 znaków).',
    }),
    defineFieldWithDescription({
      name: 'hero_excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.required().max(150),
      description: 'Krótki opis sekcji hero (maksymalnie 150 znaków).',
    }),
    defineFieldWithDescription({
      name: 'hero_image',
      title: 'Zdjęcie',
      type: 'image_block',
      validation: (Rule) => Rule.required(),
      description: 'Główne zdjęcie sekcji hero.',
    }),
  ],
  preview: {
    select: {
      title: 'hero_title',
      language: 'hero_language',
      media: 'hero_image.image_block_image',
    },
    prepare(selection) {
      const { title, language, media } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''

      return {
        title: `${langPrefix}${title || 'Bez tytułu'}`,
        media,
      }
    },
  },
})
