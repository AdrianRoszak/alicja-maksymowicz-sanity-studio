import { defineField, defineType } from 'sanity'

export const authorBlock = defineType({
  name: 'author_block',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'author_block_name',
      title: 'Imię i nazwisko',
      type: 'string',
      description:
        'Wpisz pełne imię i nazwisko autora. To pole będzie wyświetlane przy wpisach na blogu.',
    }),
  ],
})
