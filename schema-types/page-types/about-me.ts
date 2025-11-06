import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const pageAboutMe = defineType({
  name: 'page_about_me',
  title: 'O mnie',
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
      name: 'about_me_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język strony o mnie.',
    }),
    defineFieldWithDescription({
      name: 'about_me_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Tytuł strony o mnie.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'about_me_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO dla strony o mnie.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'about_me_title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'O mnie',
      }
    },
  },
})
