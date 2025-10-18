import { defineField, defineType } from 'sanity'

export const seoBlock = defineType({
  name: 'seo_block',
  title: 'Ustawienia SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Tytuł meta',
      type: 'string',
      description: 'Tytuł wyświetlany w wynikach wyszukiwania',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Opis meta',
      type: 'text',
      description: 'Opis wyświetlany w wynikach wyszukiwania (max ~160 znaków)',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Tytuł Open Graph',
      type: 'string',
      description: 'Tytuł używany w udostępnianiu w mediach społecznościowych',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Opis Open Graph',
      type: 'text',
      description: 'Opis używany w udostępnianiu w mediach społecznościowych',
    }),
    defineField({
      name: 'ogImage',
      title: 'Obraz Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Obraz używany podczas udostępniania w mediach społecznościowych',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Karta na Twitterze',
      type: 'string',
      options: {
        list: [
          { title: 'Podsumowanie', value: 'summary' },
          { title: 'Duże zdjęcie (podsumowanie)', value: 'summary_large_image' },
        ],
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Nie indeksować',
      type: 'boolean',
      description:
        'Zaznacz, aby zapobiec indeksowaniu tej strony przez wyszukiwarki. Użyteczne dla stron tymczasowych lub roboczych.',
    }),
  ],
})
