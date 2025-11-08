import { defineFieldWithDescription } from '@src/lib/types'
import { defineArrayMember, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Opinia',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'testimonial_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tej opinii.',
    }),
    defineFieldWithDescription({
      name: 'testimonial_author',
      title: 'Imię i nazwisko',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
      description: 'Imię i nazwisko autora opinii (maksymalnie 30 znaków).',
    }),
    defineFieldWithDescription({
      name: 'testimonial_body',
      title: 'Treść',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: 'Treść opinii (maksymalnie 400 znaków).',
    }),
    defineFieldWithDescription({
      name: 'testimonial_rating',
      title: 'Ocena',
      type: 'string',
      options: {
        list: [
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: '5', value: '5' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Ocena od 1 do 5.',
    }),
  ],
  preview: {
    select: {
      author: 'testimonial_author',
      rating: 'testimonial_rating',
      language: 'testimonial_language',
    },
    prepare(selection) {
      const { author, rating, language } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''
      const ratingNum = rating ? Number.parseInt(rating, 10) : 0
      const stars = ratingNum > 0 ? '⭐'.repeat(ratingNum) : ''

      return {
        title: `${langPrefix}${author || 'Bez autora'}`,
        subtitle: `${stars} (${rating})`,
      }
    },
  },
})
