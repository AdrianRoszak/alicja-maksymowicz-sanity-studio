import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const benefit = defineType({
  name: 'benefit',
  title: 'Korzyść',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'benefit_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tej korzyści.',
    }),
    defineFieldWithDescription({
      name: 'benefit_name',
      title: 'Nazwa',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz nazwę korzyści. To będzie nagłówek wyświetlany w sekcji.',
    }),
    defineFieldWithDescription({
      name: 'benefit_text',
      title: 'Tekst',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description:
        'Opisz korzyść w kilku zdaniach. Wyjaśnij, dlaczego jest ważna dla Twojej oferty.',
    }),
    defineFieldWithDescription({
      name: 'benefit_image',
      title: 'Obraz SVG',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      description:
        'Dodaj obraz SVG ilustrujący tę korzyść. Akceptowane są tylko pliki SVG.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'benefit_name',
      media: 'benefit_image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Korzyść',
        media,
      }
    },
  },
})
