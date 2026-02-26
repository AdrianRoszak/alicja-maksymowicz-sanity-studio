import {
  InternationalizedArrayInput,
  InternationalizedArrayTextInput,
} from '@src/components'
import { defineFieldWithDescription } from '@src/lib/types'
import {
  getPreviewTitleFromI18n,
  validateRequiredLanguages,
} from '@utils/index'
import { defineField, defineType } from 'sanity'

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
      title: 'Tytuł (deprecated)',
      type: 'string',
      description: 'DEPRECATED',
    }),
    defineField({
      name: 'hero_title_intl',
      title: 'Tytuł',
      type: 'internationalizedArrayString',
      description:
        'Wpisz główny tytuł sekcji hero (międzynarodowy) (max 60 znaków). To pierwsza rzecz, którą zobaczą odwiedzający - powinien być chwytliwy!',
      validation: (rule) => validateRequiredLanguages(rule).max(60),
      components: {
        input: InternationalizedArrayInput,
      },
    }),
    defineFieldWithDescription({
      name: 'hero_excerpt',
      title: 'Excerpt (deprecated)',
      type: 'text',
      description: 'DEPRECATED',
    }),
    defineField({
      name: 'hero_excerpt_intl',
      title: 'Excerpt',
      type: 'internationalizedArrayText',
      description:
        'Wpisz krótki opis lub podtytuł (max 150 znaków), który uzupełni główny tytuł i zachęci do zapoznania się z ofertą.',
      validation: (rule) => validateRequiredLanguages(rule).max(150),
      components: {
        input: InternationalizedArrayTextInput,
      },
    }),
    defineFieldWithDescription({
      name: 'hero_image',
      title: 'Zdjęcie',
      type: 'image_block',
      validation: (Rule) => Rule.required(),
      description:
        'Dodaj główne zdjęcie dla sekcji hero. To duże, widoczne zdjęcie na górze strony - wybierz coś atrakcyjnego wizualnie.',
    }),
    defineFieldWithDescription({
      name: 'hero_image_mobile',
      title: 'Zdjęcie na małych ekranach (opcjonalne)',
      type: 'image_block',
      description:
        'Opcjonalnie dodaj zdjęcie na małych ekranach dla sekcji hero. To zdjęcie będzie widoczne na małych ekranach.',
    }),
    defineFieldWithDescription({
      name: 'hero_link',
      title: 'Link w sekcji hero',
      type: 'link_block',
      description:
        'Dodaj przycisk/link w sekcji hero. Wybierz wariant zewnętrzny (https://) lub wewnętrzny do strony w CMS.',
    }),
  ],
  preview: {
    select: {
      title: 'hero_title_intl',
      media: 'hero_image.image_block_image',
    },
    prepare(selection) {
      const { title, media } = selection

      return {
        title: getPreviewTitleFromI18n(
          title as Array<{ _key: string; value?: string }>,
        ),
        media,
      }
    },
  },
})
