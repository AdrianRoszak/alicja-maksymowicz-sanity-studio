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
    defineField({
      name: 'author_slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unikalny identyfikator autora w adresie URL',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author_image',
      title: 'Zdjęcie',
      type: 'image',
      description: 'Portret autora',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author_bio',
      title: 'Biografia',
      type: 'array',
      description: 'Krótka biografia autora',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normalny', value: 'normal' }],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'author_name',
      media: 'author_image',
    },
  },
})
