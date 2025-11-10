import { createSectionBlock } from '@schema/creators'
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
      description:
        'Wpisz tytuł strony głównej. Jest używany wewnętrznie do identyfikacji - odwiedzający go nie zobaczą.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_hero',
      title: 'Hero',
      type: 'reference',
      to: [{ type: 'hero' }],
      description:
        'Wybierz hero dla strony głównej. To pierwsza sekcja, którą zobaczą odwiedzający.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_about_me_section',
      title: 'Sekcja o mnie',
      type: 'object',
      description:
        'Opowiedz o sobie i swoich wartościach. Dodaj nagłówek, opis i listę wartości, którymi się kierujesz.',
      fields: createSectionBlock({
        hasDescription: true,
        itemsType: 'VALUE',
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_courses_section',
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
      name: 'home_process_section',
      title: 'Sekcja procesu',
      type: 'object',
      description:
        'Opisz jak przebiega współpraca z Tobą krok po kroku. Dodaj nagłówek, opis i poszczególne etapy procesu.',
      fields: createSectionBlock({
        hasDescription: true,
        itemsType: 'PROCESS_POINT',
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_social_proof_section',
      title: 'Sekcja dowodów społeczności',
      type: 'object',
      description:
        'Pokaż zdjęcia realizacji lub happy clients. Dodaj nagłówek, krótkie wprowadzenie i wybierz galerie do wyświetlenia.',
      fields: createSectionBlock({
        hasExcerpt: true,
        referencesType: 'GALLERY_BLOCK',
      }),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_testimonials',
      title: 'Opinie klientów',
      type: 'object',
      fields: createSectionBlock({
        referencesType: 'TESTIMONIAL',
      }),
      description:
        'Pokaż opinie zadowolonych klientów. Wybierz nagłówek sekcji i które opinie mają być widoczne.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'home_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak strona główna będzie wyglądać w Google i mediach społecznościowych.',
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
