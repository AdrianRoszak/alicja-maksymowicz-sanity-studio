import { InternationalizedArrayInput } from '@src/components'
import { defineFieldWithDescription } from '@src/lib/types'
import { validateRequiredLanguages } from '@utils/index'
import { defineField, defineType } from 'sanity'

const pageReferenceTypes = [
  'page_home',
  'page_about_me',
  'page_blog',
  'page_contact',
]

export const linkBlock = defineType({
  name: 'link_block',
  title: 'Link',
  type: 'object',
  fields: [
    defineFieldWithDescription({
      name: 'link_block_label',
      title: 'Etykieta linku (deprecated)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'DEPRECATED',
    }),
    defineField({
      name: 'link_block_label_intl',
      title: 'Etykieta linku',
      type: 'internationalizedArrayString',
      description:
        'Wpisz tekst, który pojawi się na przycisku lub linku (np. „Zobacz więcej”).',
      validation: (rule) => validateRequiredLanguages(rule),
      components: {
        input: InternationalizedArrayInput,
      },
    }),
    defineFieldWithDescription({
      name: 'link_block_variant',
      title: 'Typ linku',
      type: 'string',
      options: {
        list: [
          { title: 'Zewnętrzny', value: 'external' },
          { title: 'Wewnętrzny', value: 'internal' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description:
        'Wybierz, czy link prowadzi do zewnętrznej strony czy do strony w tym CMS.',
    }),
    defineFieldWithDescription({
      name: 'link_block_external_url',
      title: 'Adres URL (zewnętrzny)',
      type: 'url',
      hidden: ({ parent }) => parent?.link_block_variant !== 'external',
      validation: (Rule) =>
        Rule.custom((url) => {
          if (!url) return true
          return String(url).startsWith('https://')
            ? true
            : 'Podaj pełny adres zaczynający się od https://'
        }),
      description:
        'Wklej pełny adres z "https://". Pole widoczne tylko dla linków zewnętrznych.',
    }),
    defineFieldWithDescription({
      name: 'link_block_internal_reference',
      title: 'Strona w CMS',
      type: 'reference',
      to: pageReferenceTypes.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.link_block_variant !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            link_block_variant?: 'internal' | 'external'
          }
          if (parent?.link_block_variant === 'internal') {
            return value ? true : 'Wybierz stronę w CMS dla linku wewnętrznego'
          }
          return true
        }),
      description:
        'Wybierz stronę z CMS, do której ma prowadzić link. Pole widoczne tylko dla linków wewnętrznych.',
    }),
  ],
})
