import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const pageBlog = defineType({
  name: 'page_blog',
  title: 'Blog',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    defineFieldWithDescription({
      name: 'blog_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO dla strony bloga.',
      group: 'seo',
    }),
  ],
})
