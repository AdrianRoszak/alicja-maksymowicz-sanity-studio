import { defineArrayMember, defineType } from 'sanity'
import { defineFieldWithDescription } from '../../src/lib/types'

export const blogPost = defineType({
  name: 'blog_post',
  title: 'Wpis na blogu',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'blog_post_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Główny tytuł wpisu na blogu. Pełni także rolę nagłówka H1 na dedykowanej podstronie wpisu.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      description: 'Autor wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_published_at',
      title: 'Data publikacji',
      type: 'datetime',
      description: 'Data publikacji wpisu.',
      initialValue: () => new Date().toISOString(),
    }),
    defineFieldWithDescription({
      name: 'blog_post_excerpt',
      title: 'Streszczenie',
      type: 'text',
      description: 'Krótki opis do widoków listy i jako zapasowy opis meta (max ~160 znaków)',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Zalecane: streszczenie nie powinno przekraczać ~160 znaków ze względu na SEO',
        ),
    }),
    defineFieldWithDescription({
      name: 'blog_post_main_image',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
      description:
        'Główne zdjęcie wpisu na blogu, wyświetlane w nagłówku i podglądzie na stronie jako miniaturka.',
      fields: [
        defineFieldWithDescription({
          name: 'blog_post_main_image_alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Tekst alternatywny obrazu dla dostępności i SEO',
        }),
      ],
    }),
    defineFieldWithDescription({
      name: 'blog_post_body',
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
                    name: 'link_href',
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
        'Główna treść wpisu na blogu. Użyj H2/H3/H4, aby strukturyzować treść pod kątem czytelności i gotowości dla AI.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_reading_time',
      title: 'Czas czytania (minuty)',
      type: 'number',
      description: 'Szacowany czas czytania w minutach.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'blog_post_title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description:
        'Unikalny identyfikator URL generowany na podstawie tytułu. Przykład: https://moja-strona.com/blog/moj-wpis-na-blogu',
    }),
    defineFieldWithDescription({
      name: 'blog_post_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description: 'Ustawienia SEO specyficzne dla tego wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_schema_type',
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
      title: 'blog_post_title',
      author: 'blog_post_author.name',
      media: 'blog_post_main_image',
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
