import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const trustPoint = defineType({
  name: 'trust_point',
  title: 'Punkt zaufania',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'trust_point_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego punktu zaufania.',
    }),
    defineFieldWithDescription({
      name: 'trust_point_name',
      title: 'Nazwa',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz nazwę punktu zaufania. To będzie nagłówek wyświetlany w sekcji.',
    }),
    defineFieldWithDescription({
      name: 'trust_point_image',
      title: 'Obraz SVG',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      description:
        'Dodaj obraz SVG ilustrujący ten punkt zaufania. Akceptowane są tylko pliki SVG.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'trust_point_name',
      media: 'trust_point_image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Punkt zaufania',
        media,
      }
    },
  },
})
