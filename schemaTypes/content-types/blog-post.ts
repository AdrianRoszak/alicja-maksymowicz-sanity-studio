import { defineArrayMember, defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blog_post',
  title: 'Wpis na blogu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Streszczenie',
      type: 'text',
      description: 'Krótki opis do widoków listy i jako zapasowy opis meta (max ~160 znaków)',
      validation: (Rule) => Rule.max(160).warning('Keep excerpt under ~160 characters for SEO'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Tekst alternatywny obrazu dla dostępności i SEO',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Treść',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [defineField({ name: 'href', type: 'url', title: 'Href' })],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
      description:
        'Zawartość Portable Text. Użyj H2/H3/H4 oraz list, aby strukturyzować treść pod kątem czytelności i gotowości dla AI.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Czas czytania (minuty)',
      type: 'number',
      description: 'Szacowany czas czytania w minutach',
    }),
    defineField({
      name: 'seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
    }),
    defineField({
      name: 'schemaType',
      title: 'Typ schematu',
      type: 'string',
      options: {
        list: [
          {
            title: 'BlogPosting',
            value: 'BlogPosting',
          },
          {
            title: 'Article',
            value: 'Article',
          },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, author } = selection
      return {
        title,
        subtitle: author ? `by ${author}` : '',
      }
    },
  },
})
