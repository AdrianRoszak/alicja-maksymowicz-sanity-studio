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
      description:
        'Wpisz tytuł dla strony z listą wpisów (np. "Blog", "Artykuły"). Będzie widoczny na górze strony.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'blog_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak strona bloga będzie wyglądać w Google i mediach społecznościowych.',
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
