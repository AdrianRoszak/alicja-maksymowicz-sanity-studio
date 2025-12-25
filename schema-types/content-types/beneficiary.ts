import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const beneficiary = defineType({
  name: 'beneficiary',
  title: 'Odbiorca',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'beneficiary_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego odbiorcy.',
    }),
    defineFieldWithDescription({
      name: 'beneficiary_name',
      title: 'Nazwa odbiorcy',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz nazwę odbiorcy. To będzie nagłówek wyświetlany w sekcji.',
    }),
    defineFieldWithDescription({
      name: 'beneficiary_text',
      title: 'Opis odbiorcy',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description:
        'Opisz odbiorcę w kilku zdaniach. Wyjaśnij, dlaczego jest ważny dla Twojej oferty.',
    }),
    defineFieldWithDescription({
      name: 'beneficiary_image',
      title: 'Obraz SVG',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      description:
        'Dodaj obraz SVG ilustrujący tego odbiorcę. Akceptowane są tylko pliki SVG.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'beneficiary_name',
      media: 'beneficiary_image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Odbiorca',
        media,
      }
    },
  },
})
