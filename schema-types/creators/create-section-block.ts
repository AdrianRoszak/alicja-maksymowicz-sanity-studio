import { defineFieldWithDescription } from '@src/lib'
import {
  SECTION_BLOCKS,
  SECTION_ITEMS,
  SECTION_REFERENCES,
  type SectionBlockType,
  type SectionItemType,
  type SectionReferenceType,
} from './section-block-config'

export type CreateSectionBlockOptions = {
  /** Include excerpt field in the section */
  hasExcerpt?: boolean
  /** Include description field in the section */
  hasDescription?: boolean
  /**
   * Add embedded items (np. values, process points). Tworzy osobne pole typu array dla każdego itemu.
   * Możesz podać wiele typów naraz, np. ['VALUE', 'PROCESS_POINT'].
   */
  items?: SectionItemType | SectionItemType[]
  /**
   * Add single blocks (np. image_block, link_block). Każdy blok jest osobnym polem (nie array).
   * Możesz podać wiele typów naraz, np. ['IMAGE_BLOCK', 'LINK_BLOCK'].
   */
  blocks?: SectionBlockType | SectionBlockType[]
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
 * // Section z excerpt i referencjami
 * createSectionBlock({
 *   hasExcerpt: true,
 *   referencesType: 'TESTIMONIAL'
 * })
 *
 * @example
 * // Section z opisem i wieloma typami elementów
 * createSectionBlock({
 *   hasDescription: true,
 *   items: ['PROCESS_POINT'],
 *   blocks: ['IMAGE_BLOCK', 'LINK_BLOCK']
 * })
 */
export function createSectionBlock(options?: CreateSectionBlockOptions) {
  const {
    hasExcerpt = false,
    hasDescription = false,
    items,
    blocks,
    referencesType,
  } = options || {}

  const resolvedItems =
    items === undefined ? [] : Array.isArray(items) ? items : [items]

  const resolvedBlocks =
    blocks === undefined ? [] : Array.isArray(blocks) ? blocks : [blocks]

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

    // Conditionally include items arrays (one field per item type)
    ...resolvedItems.map((itemType) =>
      defineFieldWithDescription({
        name: `section_block_items_${SECTION_ITEMS[itemType].schemaType}`,
        title: SECTION_ITEMS[itemType].title,
        type: 'array',
        of: [{ type: SECTION_ITEMS[itemType].schemaType }],
        description: SECTION_ITEMS[itemType].description,
      }),
    ),

    // Conditionally include single blocks (one field per block type)
    ...resolvedBlocks.map((blockType) =>
      defineFieldWithDescription({
        name: `section_block_${SECTION_BLOCKS[blockType].schemaType}`,
        title: SECTION_BLOCKS[blockType].title,
        type: SECTION_BLOCKS[blockType].schemaType,
        description: SECTION_BLOCKS[blockType].description,
      }),
    ),

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
