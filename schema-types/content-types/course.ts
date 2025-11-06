import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Program',
  type: 'document',
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
      description: 'Nazwa programu. Pełni także rolę nagłówka H1 na dedykowanej stronie kursu.',
    }),
    defineFieldWithDescription({
      name: 'course_features',
      title: 'Cechy kursu',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista głównych cech i korzyści kursu.',
    }),
    defineFieldWithDescription({
      name: 'course_price',
      title: 'Cena',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Cena kursu (w PLN).',
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
      description: 'Waluta ceny kursu.',
    }),
    defineFieldWithDescription({
      name: 'course_slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'course_name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description:
        'Unikalny identyfikator URL generowany na podstawie nazwy kursu. Przykład: https://moja-strona.com/kursy/nazwa-kursu',
    }),
    defineFieldWithDescription({
      name: 'course_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO specyficzne dla strony tego kursu.',
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
      const formattedPrice = price !== undefined && currency ? `${price} ${currency}` : 'Brak ceny'

      return {
        title: `${langPrefix}${title || 'Bez nazwy'}`,
        subtitle: formattedPrice,
      }
    },
  },
})
