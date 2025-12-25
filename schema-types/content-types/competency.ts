import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const competency = defineType({
  name: 'competency',
  title: 'Kompetencja',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'competency_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tej kompetencji.',
    }),
    defineFieldWithDescription({
      name: 'competency_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
      description:
        'Wpisz nazwę kompetencji (max 120 znaków). To będzie nagłówek wyświetlany w sekcji.',
    }),
    defineFieldWithDescription({
      name: 'competency_text',
      title: 'Opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description:
        'Opisz kompetencję w kilku zdaniach. Wyjaśnij, dlaczego jest ważna dla Twojej oferty.',
    }),
  ],
  preview: {
    select: {
      title: 'competency_title',
      media: 'competency_image.image_block_image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Kompetencja',
        media,
      }
    },
  },
})
