import { createSectionBlock } from '@schema/creators'
import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Program',
  type: 'document',
  groups: [
    {
      title: 'Sekcja Odbiorców',
      name: 'beneficiaries_section',
    },
    {
      title: 'Sekcja Korzyści',
      name: 'benefits_section',
    },
    {
      title: 'Sekcja Zaufania',
      name: 'trust_section',
    },
    {
      title: 'Sekcja Końcowa',
      name: 'final_section',
    },
    {
      title: 'Sekcja FAQ',
      name: 'faq_section',
    },
    {
      title: 'Sekcja Hero',
      name: 'hero_section',
    },
    {
      title: 'Sekcja Wprowadzająca',
      name: 'intro_section',
    },
    {
      title: 'Sekcja Procesu',
      name: 'process_section',
    },
    {
      title: 'Sekcja Cena',
      name: 'price_section',
    },
    {
      title: 'Sekcja SEO',
      name: 'seo_section',
    },
  ],
  fields: [
    defineFieldWithDescription({
      name: 'course_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego kursu.',
    }),
    defineFieldWithDescription({
      name: 'course_name',
      title: 'Nazwa programu',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz nazwę programu/kursu. Ta nazwa będzie widoczna jako główny tytuł na stronie kursu oraz w liście programów.',
    }),
    defineFieldWithDescription({
      name: 'course_thumbnail',
      title: 'Miniatura kursu',
      type: 'image_block',
      description:
        'Dodaj miniaturkę kursu, która wyświetli się na liście programów. To zdjęcie nie będzie widoczne na stronie szczegółów kursu.',
      validation: (Rule) => Rule.required(),
    }),
    defineFieldWithDescription({
      name: 'course_slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'course_name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description:
        'Kliknij "Generate" aby automatycznie utworzyć adres URL na podstawie nazwy kursu. To będzie końcówka adresu strony (np. moj-kurs).',
      group: 'seo_section',
    }),
    defineFieldWithDescription({
      name: 'course_hero',
      title: 'Hero kursu',
      type: 'reference',
      to: [{ type: 'hero' }],
      description:
        'Wybierz sekcję hero dla strony kursu. Jeśli chcesz stworzyć nowe hero, najpierw dodaj je w sekcji "Hero".',
      group: 'hero_section',
    }),
    defineFieldWithDescription({
      name: 'course_intro_section',
      title: 'Sekcja wprowadzająca',
      type: 'object',
      description:
        'Dodaj sekcję wprowadzającą z nagłówkiem i opisem. To pierwsze informacje, które zobaczą odwiedzający na stronie kursu.',
      fields: createSectionBlock({
        hasDescription: true,
      }),
      group: 'intro_section',
    }),
    defineFieldWithDescription({
      name: 'course_price',
      title: 'Cena',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description:
        'Wpisz cenę kursu jako liczbę (np. 299). Walutę wybierzesz w następnym polu.',
      group: 'price_section',
    }),
    defineFieldWithDescription({
      name: 'course_price_currency',
      title: 'Waluta',
      type: 'string',
      initialValue: 'PLN',
      options: {
        list: [
          { title: 'PLN', value: 'PLN' },
          { title: 'EUR', value: 'EUR' },
          { title: 'USD', value: 'USD' },
        ],
      },
      description:
        'Wybierz walutę dla ceny kursu. Domyślnie ustawione są polskie złote (PLN).',
    }),
    defineFieldWithDescription({
      name: 'course_beneficiaries',
      title: 'Odbiorcy',
      type: 'object',
      description:
        'Dodaj sekcję z odbiorcami kursu. Każdy odbiorca ma nazwę, tekst i obraz SVG.',
      fields: createSectionBlock({
        referencesType: 'BENEFICIARY',
      }),
      group: 'beneficiaries_section',
    }),
    defineFieldWithDescription({
      name: 'course_process_points',
      title: 'Punkty procesu',
      type: 'object',
      description:
        'Dodaj sekcję z punktami procesu kursu. Każdy punkt to krok w procesie z tytułem i opisem.',
      fields: createSectionBlock({
        hasExcerpt: true,
        blocks: ['LINK_BLOCK'],
        items: ['PROCESS_POINT'],
      }),
      group: 'process_section',
    }),
    defineFieldWithDescription({
      name: 'course_trust_section',
      title: 'Sekcja korzyści',
      type: 'object',
      description:
        'Dodaj sekcję z zaufaniem do kursu. Wybierz nagłówek i które zaufania mają być widoczne na stronie kursu.',
      fields: createSectionBlock({
        hasExcerpt: true,
        hasDescription: true,
        items: ['TRUST_POINT'],
      }),
      group: 'trust_section',
    }),
    defineFieldWithDescription({
      name: 'course_final_section',
      title: 'Sekcja końcowa',
      type: 'object',
      description:
        'Dodaj sekcję końcową kursu. Wybierz nagłówek i które elementy mają być widoczne na stronie kursu.',
      fields: createSectionBlock({
        hasExcerpt: true,
        hasDescription: true,
        items: ['STRING'],
        blocks: ['LINK_BLOCK'],
      }),
      group: 'final_section',
    }),
    defineFieldWithDescription({
      name: 'course_benefits',
      title: 'Korzyści',
      type: 'reference',
      to: [{ type: 'benefits_block' }],
      description: 'Wybierz szablon sekcji z korzyściami kursu.',
      group: 'benefits_section',
    }),
    defineFieldWithDescription({
      name: 'course_faq_section',
      title: 'Sekcja FAQ',
      type: 'object',
      description:
        'Dodaj sekcję z najczęściej zadawanymi pytaniami o kurs. Pytania i odpowiedzi wybierzesz z listy FAQ.',
      fields: createSectionBlock({
        hasDescription: true,
        referencesType: 'FAQ',
      }),
      group: 'faq_section',
    }),
    defineFieldWithDescription({
      name: 'course_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak ten kurs będzie wyglądał w Google i mediach społecznościowych. To opcjonalne, ale polecane.',
      group: 'seo_section',
    }),
  ],
  preview: {
    select: {
      title: 'course_name',
      language: 'course_language',
      price: 'course_price',
      currency: 'course_price_currency',
    },
    prepare(selection) {
      const { title, language, price, currency } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''
      const formattedPrice =
        price !== undefined && currency ? `${price} ${currency}` : 'Brak ceny'

      return {
        title: `${langPrefix}${title || 'Bez nazwy'}`,
        subtitle: formattedPrice,
      }
    },
  },
})
