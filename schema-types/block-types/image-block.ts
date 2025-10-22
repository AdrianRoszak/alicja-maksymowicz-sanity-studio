import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const imageBlock = defineType({
  name: 'image_block',
  title: 'Obraz z tekstem alternatywnym',
  type: 'object',
  fields: [
    defineFieldWithDescription({
      name: 'image_block_image',
      title: 'Obraz',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/png,image/jpeg,image/webp',
      },
      description: 'Obraz do wyświetlenia',
      validation: (Rule) => Rule.required(),
    }),
    defineFieldWithDescription({
      name: 'image_block_alt',
      title: 'Tekst alternatywny',
      type: 'string',
      description: 'Tekst alternatywny obrazu dla dostępności i SEO',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(150)
          .warning('Zalecane: tekst alternatywny powinien mieć od 5 do 150 znaków.'),
    }),
  ],
})
