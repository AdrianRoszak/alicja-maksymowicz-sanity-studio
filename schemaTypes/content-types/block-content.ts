import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'block-content',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Blok',
      type: 'block',
      styles: [
        {title: 'Normalny', value: 'normal'},
        {title: 'Nagłówek 1', value: 'h1'},
        {title: 'Nagłówek 2', value: 'h2'},
        {title: 'Nagłówek 3', value: 'h3'},
        {title: 'Nagłówek 4', value: 'h4'},
        {title: 'Cytat', value: 'blockquote'},
      ],
      lists: [{title: 'Wypunktowana', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Pogrubienie', value: 'strong'},
          {title: 'Kursywa', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
