import { defineType } from 'sanity'
import { defineFieldWithDescription } from '../../src/lib/types'

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
      description:
        'Dodaj zdjęcie klikając w obszar powyżej lub przeciągnij plik. Akceptowane formaty: PNG, JPEG, WEBP.',
      validation: (Rule) => Rule.required(),
    }),
    defineFieldWithDescription({
      name: 'image_block_alt',
      title: 'Tekst alternatywny',
      type: 'string',
      description:
        'Opisz co znajduje się na zdjęciu w 5-150 znakach. Ten opis pomoże osobom niedowidzącym oraz poprawi SEO strony.',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(150)
          .warning(
            'Zalecane: tekst alternatywny powinien mieć od 5 do 150 znaków.',
          ),
    }),
  ],
})
