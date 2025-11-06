import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const pageContact = defineType({
  name: 'page_contact',
  title: 'Kontakt',
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
      name: 'contact_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język strony kontaktowej.',
    }),
    defineFieldWithDescription({
      name: 'contact_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Tytuł strony kontaktowej.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'contact_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO dla strony kontaktowej.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'contact_title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Kontakt',
      }
    },
  },
})
