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
      description:
        'Wpisz główny tytuł sekcji hero (max 60 znaków). To pierwsza rzecz, którą zobaczą odwiedzający - powinien być chwytliwy!',
    }),
    defineFieldWithDescription({
      name: 'hero_excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.required().max(150),
      description:
        'Napisz krótki opis lub podtytuł (max 150 znaków), który uzupełni główny tytuł i zachęci do zapoznania się z ofertą.',
    }),
    defineFieldWithDescription({
      name: 'hero_image',
      title: 'Zdjęcie',
      type: 'image_block',
      validation: (Rule) => Rule.required(),
      description:
        'Dodaj główne zdjęcie dla sekcji hero. To duże, widoczne zdjęcie na górze strony - wybierz coś atrakcyjnego wizualnie.',
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
