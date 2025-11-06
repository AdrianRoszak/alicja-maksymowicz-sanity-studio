import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const pageBlog = defineType({
  name: 'page_blog',
  title: 'Blog',
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
      name: 'blog_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język strony bloga.',
    }),
    defineFieldWithDescription({
      name: 'blog_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Tytuł strony bloga.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'blog_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO dla strony bloga.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'blog_title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Strona bloga',
      }
    },
  },
})
