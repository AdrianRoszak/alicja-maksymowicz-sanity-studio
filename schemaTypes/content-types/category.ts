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
      description: 'Nazwa kategorii',
    }),
    defineField({
      name: 'category_description',
      title: 'Opis',
      type: 'text',
      description: 'Opis kategorii',
    }),
  ],
})
