import { createSectionBlock } from '@schema/creators/create-section-block'
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
      description:
        'Wpisz tytuł strony "O mnie". Jest używany wewnętrznie do identyfikacji.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'about_me_hero',
      title: 'Hero',
      type: 'reference',
      to: [{ type: 'hero' }],
      description:
        'Wybierz hero dla strony "O mnie". To główna sekcja na górze strony z Twoim zdjęciem i opisem.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'about_me_intro_section',
      title: 'Wprowadzenie',
      type: 'object',
      description:
        'Dodaj wprowadzenie do strony "O mnie". To pierwsze informacje, które zobaczą odwiedzający na stronie.',
      fields: createSectionBlock({
        hasDescription: true,
        blocks: ['IMAGE_BLOCK', 'LINK_BLOCK'],
      }),
    }),
    defineFieldWithDescription({
      name: 'about_me_why_me_section',
      title: 'Dlaczego ja?',
      type: 'object',
      description:
        'Dodaj sekcję z informacjami o tym, dlaczego warto Cię wybrać. To pierwsze informacje, które zobaczą odwiedzający na stronie.',
      fields: createSectionBlock({
        hasDescription: true,
      }),
    }),
    defineFieldWithDescription({
      name: 'about_me_courses_section',
      title: 'Sekcja programów',
      type: 'object',
      description:
        'Pokaż swoją ofertę programów/kursów. Wybierz nagłówek i które programy mają być widoczne na stronie głównej.',
      fields: createSectionBlock({
        referencesType: 'COURSE',
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'about_me_competencies_section',
      title: 'Sekcja kompetencji',
      type: 'object',
      description:
        'Pokaż swoje umiejętności i doświadczenie. Wybierz nagłówek i które umiejętności mają być widoczne na stronie głównej.',
      fields: createSectionBlock({
        referencesType: 'COMPETENCY',
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'about_me_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak strona "O mnie" będzie wyglądać w Google i mediach społecznościowych.',
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
