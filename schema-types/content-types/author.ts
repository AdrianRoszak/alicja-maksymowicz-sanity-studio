import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'author_name',
      title: 'Imię i nazwisko',
      type: 'string',
      description: 'Pełne imię i nazwisko autora',
    }),
  ],
})
