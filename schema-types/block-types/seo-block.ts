import { defineField, defineType } from 'sanity'

export const seoBlock = defineType({
  name: 'seo_block',
  title: 'Ustawienia SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'seo_block_meta_title',
      title: 'Tytuł meta',
      type: 'string',
      description: 'Tytuł wyświetlany w wynikach wyszukiwania',
    }),
    defineField({
      name: 'seo_block_meta_description',
      title: 'Opis meta',
      type: 'text',
      description: 'Opis wyświetlany w wynikach wyszukiwania (max ~160 znaków)',
    }),
    defineField({
      name: 'seo_block_og_title',
      title: 'Tytuł Open Graph',
      type: 'string',
      description: 'Tytuł używany w udostępnianiu w mediach społecznościowych',
    }),
    defineField({
      name: 'seo_block_og_description',
      title: 'Opis Open Graph',
      type: 'text',
      description: 'Opis używany w udostępnianiu w mediach społecznościowych',
    }),
    defineField({
      name: 'seo_block_og_image',
      title: 'Obraz Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Obraz używany podczas udostępniania w mediach społecznościowych',
    }),
    defineField({
      name: 'seo_block_twitter_card',
      title: 'Twitter Card',
      type: 'string',
      description: 'Typ karty Twitter (np. summary, summary_large_image)',
      options: {
        list: [
          { title: 'Podsumowanie', value: 'summary' },
          { title: 'Duże zdjęcie (podsumowanie)', value: 'summary_large_image' },
        ],
      },
    }),
    defineField({
      name: 'seo_block_no_index',
      title: 'Nie indeksować',
      type: 'boolean',
      description:
        'Zaznacz, aby zapobiec indeksowaniu tej strony przez wyszukiwarki. Użyteczne dla stron tymczasowych lub roboczych.',
    }),
  ],
})
