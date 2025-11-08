/**
 * Configuration for section block types
 * Centralized place to manage all available section block items and references
 */

export type SectionItemConfig = {
  schemaType: string
  title: string
  description: string
}

export type SectionReferenceConfig = {
  schemaType: string
  title: string
  description: string
}

/**
 * Available item types for section blocks
 * Items are embedded objects (not references)
 */
export const SECTION_ITEMS = {
  VALUE: {
    schemaType: 'value',
    title: 'Wartości',
    description: 'Dodaj wartości',
  },
  PROCESS_POINT: {
    schemaType: 'process_point',
    title: 'Punkty procesu',
    description: 'Dodaj punkty procesu',
  },
} as const satisfies Record<string, SectionItemConfig>

/**
 * Available reference types for section blocks
 * References point to standalone documents
 */
export const SECTION_REFERENCES = {
  COURSE: {
    schemaType: 'course',
    title: 'Programy',
    description: 'Dodaj programy',
  },
  TESTIMONIAL: {
    schemaType: 'testimonial',
    title: 'Opinie klientów',
    description: 'Dodaj opinie klientów',
  },
  GALLERY_BLOCK: {
    schemaType: 'gallery_block',
    title: 'Galeria zdjęć',
    description: 'Dodaj galerię zdjęć',
  },
} as const satisfies Record<string, SectionReferenceConfig>

// Type helpers for better autocomplete
export type SectionItemType = keyof typeof SECTION_ITEMS
export type SectionReferenceType = keyof typeof SECTION_REFERENCES
