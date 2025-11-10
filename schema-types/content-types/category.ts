import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Kategoria',
  type: 'document',
  fields: [
    defineField({
      name: 'category_title',
      title: 'Tytuł',
      type: 'string',
      description:
        'Wpisz nazwę kategorii (np. "Technologia", "Lifestyle"). Będzie ona używana do grupowania treści.',
    }),
    defineField({
      name: 'category_description',
      title: 'Opis',
      type: 'text',
      description:
        'Napisz krótki opis kategorii - czego mogą spodziewać się czytelnicy w tej sekcji.',
    }),
  ],
})
