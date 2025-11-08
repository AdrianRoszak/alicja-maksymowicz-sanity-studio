import { defineFieldWithDescription } from '@src/lib'

export type CreateSectionBlockOptions = {
  hasExcerpt?: boolean
  hasDescription?: boolean
  referencesType?: ReferencesType
  itemsType?: ItemsType
}

export enum ReferencesType {
  COURSE = 'COURSE',
  TESTIMONIAL = 'TESTIMONIAL',
  GALLERY_BLOCK = 'GALLERY_BLOCK',
}

export enum ItemsType {
  VALUE = 'VALUE',
  PROCESS_POINT = 'PROCESS_POINT',
}

export enum Titles {
  VALUE = 'Wartości',
  COURSE = 'Programy',
  PROCESS_POINT = 'Punkty procesu',
  TESTIMONIAL = 'Opinie klientów',
  GALLERY_BLOCK = 'Galeria zdjęć',
}

export function createSectionBlock(options?: CreateSectionBlockOptions) {
  const {
    hasExcerpt = false,
    hasDescription = false,
    itemsType = null,
    referencesType = null,
  } = options || {}
  const sectionBlock = [
    defineFieldWithDescription({
      name: 'section_block_header',
      title: 'Nagłówek sekcji',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Nagłówek sekcji (H2).',
    }),
    ...(hasExcerpt
      ? [
          defineFieldWithDescription({
            name: 'section_block_excerpt',
            title: 'Wprowadzenie do sekcji',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Wprowadzenie do sekcji.',
          }),
        ]
      : []),
    ...(hasDescription
      ? [
          defineFieldWithDescription({
            name: 'section_block_description',
            title: 'Opis sekcji',
            type: 'text',
            validation: (Rule) => Rule.required(),
            description: 'Opis sekcji.',
          }),
        ]
      : []),
    ...(itemsType
      ? [
          defineFieldWithDescription({
            name: 'section_block_items',
            title: Titles[itemsType],
            type: 'array',
            of: [{ type: itemsType.toLowerCase() }],
            description: `Dodaj ${Titles[itemsType]}`,
          }),
        ]
      : referencesType
        ? [
            defineFieldWithDescription({
              name: 'section_block_references',
              title: Titles[referencesType],
              type: 'reference',
              to: [{ type: referencesType.toLowerCase() }],
              description: `Dodaj ${Titles[referencesType]}`,
              options: {
                disableNew: true,
              },
            }),
          ]
        : []),
  ]
  return [...sectionBlock]
}
