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
      description:
        'Wpisz tytuł strony, który pojawi się w wynikach wyszukiwania Google. Powinien zachęcać do kliknięcia.',
    }),
    defineField({
      name: 'seo_block_meta_description',
      title: 'Opis meta',
      type: 'text',
      description:
        'Napisz krótki opis (max 160 znaków), który pojawi się pod tytułem w wynikach Google. Podsumuj najważniejsze informacje ze strony.',
    }),
    defineField({
      name: 'seo_block_og_title',
      title: 'Tytuł Open Graph',
      type: 'string',
      description:
        'Wpisz tytuł, który pojawi się gdy ktoś udostępni tę stronę na Facebooku, LinkedIn lub innych mediach społecznościowych.',
    }),
    defineField({
      name: 'seo_block_og_description',
      title: 'Opis Open Graph',
      type: 'text',
      description:
        'Napisz opis strony dla mediów społecznościowych. To będzie widoczne pod tytułem podczas udostępniania.',
    }),
    defineField({
      name: 'seo_block_og_image',
      title: 'Obraz Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Dodaj miniaturkę (zalecane: 1200x630 px), która pojawi się gdy ktoś udostępni tę stronę na Facebooku lub LinkedIn.',
    }),
    defineField({
      name: 'seo_block_index',
      title: 'Indeksowanie włączone',
      type: 'boolean',
      initialValue: true,
      description:
        'Pozostaw zaznaczone, aby strona była widoczna w Google. Odznacz tylko jeśli strona jest w trakcie tworzenia lub ma być ukryta przed wyszukiwarkami.',
    }),
  ],
})
