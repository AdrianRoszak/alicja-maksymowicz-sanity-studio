import { createSectionBlock } from '@schema/creators'
import {
  ItemsType,
  ReferencesType,
} from '@schema/creators/create-section-block'
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
      name: 'home_hero',
      title: 'Hero',
      type: 'reference',
      to: [{ type: 'hero' }],
      description: 'Hero wyświetlane na stronie głównej.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_about_me_section',
      title: 'Sekcja o mnie',
      type: 'object',
      description: 'Sekcja o mnie wyświetlana na stronie głównej.',
      fields: createSectionBlock({
        hasDescription: true,
        itemsType: ItemsType.VALUE,
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_courses_section',
      title: 'Sekcja programów',
      type: 'object',
      description: 'Sekcja programów wyświetlana na stronie głównej.',
      fields: createSectionBlock({
        referencesType: ReferencesType.COURSE,
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_process_section',
      title: 'Sekcja procesu',
      type: 'object',
      description: 'Sekcja opisująca proces wyświetlana na stronie głównej.',
      fields: createSectionBlock({
        hasDescription: true,
        itemsType: ItemsType.PROCESS_POINT,
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_social_proof_section',
      title: 'Sekcja dowodów społeczności',
      type: 'object',
      description: 'Sekcja społeczności wyświetlana na stronie głównej.',
      fields: createSectionBlock({
        hasExcerpt: true,
        referencesType: ReferencesType.GALLERY_BLOCK,
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_testimonials',
      title: 'Opinie klientów',
      type: 'object',
      fields: createSectionBlock({
        referencesType: ReferencesType.TESTIMONIAL,
      }),
      description: 'Sekcja opinii klientów wyświetlana na stronie głównej.',
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
  preview: {
    select: {
      title: 'home_title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Strona główna',
      }
    },
  },
})
