import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blog_post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for list views and meta description fallback (max ~160 chars)',
      validation: (Rule) => Rule.max(160).warning('Keep excerpt under ~160 characters for SEO'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Alternative text for the image for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [defineField({name: 'href', type: 'url', title: 'Href'})],
              },
            ],
          },
        }),
        defineArrayMember({type: 'image', options: {hotspot: true}}),
      ],
      description:
        'Portable Text content. Use H2/H3/H4 and lists to structure content for AI-readiness.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    }),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seo_settings'}),
    defineField({
      name: 'schemaType',
      title: 'Schema type',
      type: 'string',
      options: {
        list: [
          {title: 'BlogPosting', value: 'BlogPosting'},
          {title: 'Article', value: 'Article'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'title', author: 'author.name', media: 'mainImage'},
    prepare(selection: any) {
      const {title, author} = selection
      return {title, subtitle: author ? `by ${author}` : ''}
    },
  },
})
