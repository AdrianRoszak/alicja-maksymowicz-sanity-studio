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
    }),
    defineField({
      name: 'author_slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author_image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author_bio',
      title: 'Biografia',
      type: 'array',
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
