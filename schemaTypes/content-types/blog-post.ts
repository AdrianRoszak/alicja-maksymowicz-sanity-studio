import { defineArrayMember, defineType } from 'sanity'
import { defineFieldWithDescription } from '../../src/lib/types'

export const blogPost = defineType({
  name: 'blog_post',
  title: 'Wpis na blogu',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Główny tytuł wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Unikalny identyfikator URL generowany na podstawie tytułu.',
    }),
    defineFieldWithDescription({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      description: 'Autor wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      description: 'Data publikacji wpisu.',
    }),
    defineFieldWithDescription({
      name: 'excerpt',
      title: 'Streszczenie',
      type: 'text',
      description: 'Krótki opis do widoków listy i jako zapasowy opis meta (max ~160 znaków)',
      validation: (Rule) => Rule.max(160).warning('Keep excerpt under ~160 characters for SEO'),
    }),
    defineFieldWithDescription({
      name: 'mainImage',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
      description: 'Główne zdjęcie wpisu na blogu, wyświetlane w nagłówku i podglądzie.',
      fields: [
        defineFieldWithDescription({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Tekst alternatywny obrazu dla dostępności i SEO',
        }),
      ],
    }),
    defineFieldWithDescription({
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
                fields: [
                  defineFieldWithDescription({
                    name: 'href',
                    type: 'url',
                    title: 'Href',
                    description: 'Adres URL do linku.',
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
      description:
        'Zawartość Portable Text. Użyj H2/H3/H4 oraz list, aby strukturyzować treść pod kątem czytelności i gotowości dla AI.',
    }),
    defineFieldWithDescription({
      name: 'readingTime',
      title: 'Czas czytania (minuty)',
      type: 'number',
      description: 'Szacowany czas czytania w minutach',
    }),
    defineFieldWithDescription({
      name: 'seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO specyficzne dla tego wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'schemaType',
      title: 'Typ schematu',
      type: 'string',
      description: 'Typ schematu dla tego wpisu na blogu.',
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
