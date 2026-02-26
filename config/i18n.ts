/**
 * Single source of truth for internationalization (i18n) configuration.
 * Used by Sanity Studio plugin, validation, and schema types (slug, preview).
 *
 * @see docs/spec/SPEC-i18n.md
 */

/** Language option for sanity-plugin-internationalized-array (id + display title + countryCode for flags). */
export const LANGUAGES = [
  { id: 'pl', title: 'Polish', countryCode: 'PL' },
  { id: 'en', title: 'English', countryCode: 'GB' },
] as const

/** Language codes that must be present and non-empty for required i18n fields. */
export const REQUIRED_LANGUAGE_IDS = ['pl', 'en'] as const

/** Primary language (used for slug source and preview title). */
export const PRIMARY_LANGUAGE_ID = REQUIRED_LANGUAGE_IDS[0]

/** Default languages selected in the Studio when editing i18n fields (plugin defaultLanguages). */
export const DEFAULT_LANGUAGE_IDS = REQUIRED_LANGUAGE_IDS

/** Max length for slug current value (locale slug fields). */
export const SLUG_MAX_LENGTH = 96
