import { defineFieldWithDescription } from '@src/lib'
import {
  SECTION_ITEMS,
  SECTION_REFERENCES,
  type SectionItemType,
  type SectionReferenceType,
} from './section-block-config'

export type CreateSectionBlockOptions = {
  /** Include excerpt field in the section */
  hasExcerpt?: boolean
  /** Include description field in the section */
  hasDescription?: boolean
  /** Add an array of embedded items (e.g., values, process points) */
  itemsType?: SectionItemType
  /** Add an array of references to documents (e.g., courses, testimonials) */
  referencesType?: SectionReferenceType
}

/**
 * Creates a dynamic section block with configurable fields
 *
 * @example
 * // Basic section with just header
 * createSectionBlock()
 *
 * @example
 * // Section with excerpt and testimonials
 * createSectionBlock({
 *   hasExcerpt: true,
 *   referencesType: 'TESTIMONIAL'
 * })
 *
 * @example
 * // Section with description and process points
 * createSectionBlock({
 *   hasDescription: true,
 *   itemsType: 'PROCESS_POINT'
 * })
 */
export function createSectionBlock(options?: CreateSectionBlockOptions) {
  const {
    hasExcerpt = false,
    hasDescription = false,
    itemsType,
    referencesType,
  } = options || {}

  const fields = [
    // Always include header
    defineFieldWithDescription({
      name: 'section_block_header',
      title: 'Nagłówek sekcji',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz nagłówek tej sekcji. To tytuł, który pojawi się nad zawartością sekcji.',
    }),

    // Conditionally include excerpt
    ...(hasExcerpt
      ? [
          defineFieldWithDescription({
            name: 'section_block_excerpt',
            title: 'Wprowadzenie do sekcji',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description:
              'Napisz krótkie wprowadzenie do sekcji (1-2 zdania). Tekst pojawi się pod nagłówkiem.',
          }),
        ]
      : []),

    // Conditionally include description
    ...(hasDescription
      ? [
          defineFieldWithDescription({
            name: 'section_block_description',
            title: 'Opis sekcji',
            type: 'text',
            validation: (Rule) => Rule.required(),
            description:
              'Napisz dłuższy opis sekcji. Możesz użyć kilku zdań aby szczegółowo opisać tę część strony.',
          }),
        ]
      : []),

    // Conditionally include items array
    ...(itemsType
      ? [
          defineFieldWithDescription({
            name: 'section_block_items',
            title: SECTION_ITEMS[itemsType].title,
            type: 'array',
            of: [{ type: SECTION_ITEMS[itemsType].schemaType }],
            description: SECTION_ITEMS[itemsType].description,
          }),
        ]
      : []),

    // Conditionally include references array
    ...(referencesType
      ? [
          defineFieldWithDescription({
            name: 'section_block_references',
            title: SECTION_REFERENCES[referencesType].title,
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [{ type: SECTION_REFERENCES[referencesType].schemaType }],
                options: {
                  disableNew: true,
                },
              },
            ],
            description: SECTION_REFERENCES[referencesType].description,
          }),
        ]
      : []),
  ]

  return fields
}
