/**
 * Configuration for section block types
 * Centralized place to manage all available section block items and references
 */

export type SectionItemConfig = {
  schemaType: string
  title: string
  description: string
}

export type SectionBlockConfig = {
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
    description:
      'Dodaj wartości, którymi się kierujesz. Kliknij "Dodaj element" aby dodać każdą wartość osobno.',
  },
  PROCESS_POINT: {
    schemaType: 'process_point',
    title: 'Punkty procesu',
    description:
      'Dodaj kolejne kroki procesu współpracy. Każdy krok to osobny element z tytułem i opisem.',
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
    description:
      'Wybierz programy/kursy, które mają się pojawić w tej sekcji. Kliknij "Dodaj element" aby wybrać kolejne programy.',
  },
  TESTIMONIAL: {
    schemaType: 'testimonial',
    title: 'Opinie klientów',
    description:
      'Wybierz opinie klientów do wyświetlenia w tej sekcji. Najpierw musisz dodać opinie w sekcji "Opinie klientów".',
  },
  FAQ: {
    schemaType: 'faq',
    title: 'FAQ',
    description:
      'Wybierz pytania i odpowiedzi do wyświetlenia. Najpierw dodaj FAQ w sekcji "FAQ", a potem wybierz je tutaj.',
  },
  GALLERY_BLOCK: {
    schemaType: 'gallery_block',
    title: 'Galeria zdjęć',
    description:
      'Wybierz galerie zdjęć do wyświetlenia. Najpierw utwórz galerie w sekcji "Galerie zdjęć", potem dodaj je tutaj.',
  },
} as const satisfies Record<string, SectionReferenceConfig>

/**
 * Available single-block types for section blocks
 * These are added as individual fields (not arrays)
 */
export const SECTION_BLOCKS = {
  IMAGE_BLOCK: {
    schemaType: 'image_block',
    title: 'Zdjęcie',
    description:
      'Dodaj pojedyncze zdjęcie w tej sekcji. Użyj, gdy chcesz pokazać ilustrację lub element wizualny obok treści.',
  },
  LINK_BLOCK: {
    schemaType: 'link_block',
    title: 'Link',
    description:
      'Dodaj link z etykietą. Możesz wybrać wariant zewnętrzny (https://) lub wewnętrzny do strony w CMS.',
  },
} as const satisfies Record<string, SectionBlockConfig>

// Type helpers for better autocomplete
export type SectionItemType = keyof typeof SECTION_ITEMS
export type SectionReferenceType = keyof typeof SECTION_REFERENCES
export type SectionBlockType = keyof typeof SECTION_BLOCKS
