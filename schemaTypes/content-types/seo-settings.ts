import {defineField, defineType} from 'sanity'

export const seoSettings = defineType({
  name: 'seo_settings',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text'}),
    defineField({name: 'ogTitle', title: 'Open Graph title', type: 'string'}),
    defineField({name: 'ogDescription', title: 'Open Graph description', type: 'text'}),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card',
      type: 'string',
      options: {
        list: [
          {title: 'summary', value: 'summary'},
          {title: 'summary_large_image', value: 'summary_large_image'},
        ],
      },
    }),
    defineField({name: 'noIndex', title: 'No index', type: 'boolean'}),
  ],
})
