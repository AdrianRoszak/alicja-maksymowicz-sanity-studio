import { defineFieldWithDescription } from '@src/lib/types'
import { defineArrayMember, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blog_post',
  title: 'Wpis na blogu',
  type: 'document',
  groups: [
    {
      title: 'Treść',
      name: 'content',
    },
    {
      title: 'Zdjęcia',
      name: 'images',
    },
    {
      title: 'Szczegóły',
      name: 'details',
    },
    {
      title: 'Powiązane wpisy',
      name: 'related_posts',
    },
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    defineFieldWithDescription({
      name: 'blog_post_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego wpisu na blogu.',
    }),
    defineFieldWithDescription({
      name: 'blog_post_title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz tytuł artykułu. Ten tytuł będzie widoczny jako główny nagłówek na stronie wpisu oraz w liście artykułów na blogu.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'blog_post_published_at',
      title: 'Data publikacji',
      type: 'datetime',
      description:
        'Wybierz datę i godzinę publikacji wpisu. Domyślnie ustawiona jest bieżąca data.',
      initialValue: () => new Date().toISOString(),
      group: 'details',
    }),
    defineFieldWithDescription({
      name: 'blog_post_excerpt',
      title: 'Streszczenie',
      type: 'text',
      description:
        'Napisz krótkie streszczenie wpisu (max 160 znaków). Tekst pojawi się na liście artykułów i w wynikach wyszukiwania Google.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Zalecane: streszczenie nie powinno przekraczać ~160 znaków ze względu na SEO',
        ),
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'blog_post_thumbnail',
      title: 'Miniatura',
      type: 'image_block',
      description:
        'Dodaj miniaturkę artykułu. Będzie ona wyświetlana na liście artykułów.',
      validation: (Rule) => Rule.required(),
      group: 'images',
    }),
    defineFieldWithDescription({
      name: 'blog_post_main_image',
      title: 'Zdjęcie główne',
      type: 'image_block',
      description:
        'Dodaj zdjęcie główne artykułu. Będzie ono wyświetlane na górze strony wpisu oraz jako miniaturka na liście artykułów.',
      validation: (Rule) => Rule.required(),
      group: 'images',
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
                    description:
                      'Wklej pełny adres URL (np. https://example.com) do którego ma prowadzić link.',
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
      description:
        'Napisz treść artykułu. Użyj nagłówków H2/H3/H4 aby podzielić tekst na sekcje - to ułatwi czytanie i poprawi SEO.',
      group: 'content',
    }),
    defineFieldWithDescription({
      name: 'blog_post_reading_time',
      title: 'Czas czytania (minuty)',
      type: 'number',
      description:
        'Wpisz szacowany czas potrzebny na przeczytanie artykułu (np. 5 oznacza "5 minut czytania").',
      group: 'details',
    }),
    defineFieldWithDescription({
      name: 'blog_post_slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'blog_post_title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description:
        'Kliknij "Generate" aby automatycznie utworzyć adres URL na podstawie tytułu. To będzie końcówka adresu strony (np. moj-artykul).',
      group: 'seo',
    }),
    defineFieldWithDescription({
      name: 'blog_post_related_posts',
      title: 'Powiązane wpisy',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blog_post' }] }],
      description:
        'Wybierz maksymalnie 3 wpisy, które mają być widoczne jako powiązane z tym wpisem. To pole jest opcjonalne.',
      validation: (Rule) => Rule.max(3),
      group: 'related_posts',
    }),
    defineFieldWithDescription({
      name: 'blog_post_seo',
      title: 'Ustawienia SEO',
      type: 'seo_block',
      description:
        'Skonfiguruj jak ten wpis będzie wyglądał w Google i mediach społecznościowych. To opcjonalne, ale polecane dla lepszej widoczności.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'blog_post_title',
      language: 'block_post_language',
      publishedAt: 'blog_post_published_at',
      author: 'blog_post_author.author_block_name',
      media: 'blog_post_main_image.image_block_image',
    },
    prepare(selection) {
      const { title, language, publishedAt, author, media } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''
      const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : null

      const subtitle = formattedDate
        ? formattedDate + (author ? ` — by ${author}` : '')
        : author
          ? `by ${author}`
          : ''

      return {
        title: `${langPrefix}${title || ''}`,
        subtitle,
        media,
      }
    },
  },
})
