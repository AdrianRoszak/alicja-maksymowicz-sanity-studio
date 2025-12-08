import { createSectionBlock } from '@schema/creators'
import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Program',
  type: 'document',
  groups: [
    {
      title: 'Sekcja Korzyści',
      name: 'benefits_section',
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
      name: 'course_hero',
      title: 'Hero kursu',
      type: 'reference',
      to: [{ type: 'hero' }],
      description:
        'Wybierz sekcję hero dla strony kursu. Jeśli chcesz stworzyć nowe hero, najpierw dodaj je w sekcji "Hero".',
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
    }),
    defineFieldWithDescription({
      name: 'course_features',
      title: 'Cechy kursu',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Dodaj listę głównych cech i korzyści kursu. Każda cecha to osobny punkt - kliknij "Dodaj element" aby dodać kolejną.',
    }),
    defineFieldWithDescription({
      name: 'course_price',
      title: 'Cena',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description:
        'Wpisz cenę kursu jako liczbę (np. 299). Walutę wybierzesz w następnym polu.',
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
      name: 'course_faq_section',
      title: 'Sekcja FAQ',
      type: 'object',
      description:
        'Dodaj sekcję z najczęściej zadawanymi pytaniami o kurs. Pytania i odpowiedzi wybierzesz z listy FAQ.',
      fields: createSectionBlock({
        referencesType: 'FAQ',
      }),
    }),
    defineFieldWithDescription({
      name: 'course_benefits',
      title: 'Korzyści',
      type: 'object',
      description:
        'Dodaj sekcję z korzyściami kursu. Każda korzyść ma nazwę, tekst i obraz SVG.',
      fields: createSectionBlock({
        referencesType: 'BENEFIT',
      }),
      group: 'benefits_section',
    }),
    defineFieldWithDescription({
      name: 'course_slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'course_name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description:
        'Kliknij "Generate" aby automatycznie utworzyć adres URL na podstawie nazwy kursu. To będzie końcówka adresu strony (np. moj-kurs).',
    }),
    defineFieldWithDescription({
      name: 'course_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak ten kurs będzie wyglądał w Google i mediach społecznościowych. To opcjonalne, ale polecane.',
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
