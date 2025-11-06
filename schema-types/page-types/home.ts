import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const pageHome = defineType({
  name: 'page_home',
  title: 'Strona główna',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {
      title: 'Treść',
      name: 'content',
    },
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    defineFieldWithDescription({
      name: 'home_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język strony głównej.',
    }),
    defineFieldWithDescription({
      name: 'home_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Tytuł strony głównej.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO dla strony głównej.',
      group: 'seo',
    }),
  ],
})
