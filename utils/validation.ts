import { REQUIRED_LANGUAGE_IDS } from '@config/i18n'
import type { Rule } from 'sanity'

/**
 * Validates that the locale slug object has non-empty slug for all required languages.
 * Use for the slug field (object with per-language slug sub-fields).
 */
export function validateRequiredLocaleSlug<
  T extends { custom: (fn: (value: unknown) => string | true) => unknown },
>(rule: T): T {
  return rule.custom((value) => {
    if (!value || typeof value !== 'object')
      return 'Slug is required for required languages'
    const obj = value as Record<string, { current?: string }>
    const missing = REQUIRED_LANGUAGE_IDS.filter(
      (id) => !obj[id]?.current?.trim(),
    )
    if (missing.length > 0) return `Slug is required for: ${missing.join(', ')}`
    return true
  }) as T
}

/**
 * Sanity validation rule for internationalized array fields.
 * Ensures that required languages are present and have non-empty values.
 *
 * Use for fields that must have translations in all mandatory languages
 * (e.g. `internationalizedArrayString` title/lead on documents).
 *
 * @param rule - Sanity rule from `defineField({ validation: (rule) => ... })`
 * @param requiredLanguages - Language codes that must be present (default: from config/i18n)
 * @returns Rule that validates presence and non-empty value for each required language
 *
 * @example
 * defineField({
 *   name: 'title',
 *   type: 'internationalizedArrayString',
 *   validation: (rule) => validateRequiredLanguages(rule),
 * })
 */
export function validateRequiredLanguages(
  rule: Rule,
  requiredLanguages: readonly string[] = REQUIRED_LANGUAGE_IDS,
): Rule {
  return rule.custom((value) => {
    if (!value || !Array.isArray(value)) {
      return 'This field is required'
    }

    const providedLanguages = value.map(
      (item: { _key: string; value: string }) => ({
        key: item._key,
        value: item.value,
      }),
    )

    const missingLanguages = requiredLanguages.filter(
      (lang) => !providedLanguages.some((item) => item.key === lang),
    )

    if (missingLanguages.length > 0) {
      return `Missing required languages: ${missingLanguages.join(', ')}`
    }

    const emptyLanguages = requiredLanguages.filter((lang) => {
      const item = providedLanguages.find((p) => p.key === lang)
      return !item?.value || item.value.trim() === ''
    })

    if (emptyLanguages.length > 0) {
      return `Empty values for required languages: ${emptyLanguages.join(', ')}`
    }

    return true
  })
}

const I18N_MIN_ALT_LENGTH = 20

/**
 * Validates that each required language has alt text of at least I18N_MIN_ALT_LENGTH characters.
 * Use with rule.custom() for internationalizedArrayString alt fields on image blocks.
 */
export function validateI18nAltMinLength(value: unknown): string | true {
  if (!value || !Array.isArray(value)) return true
  const items = value as Array<{ _key: string; value?: string }>
  for (const langId of REQUIRED_LANGUAGE_IDS) {
    const item = items.find((i) => i._key === langId)
    const text = item?.value?.trim() ?? ''
    if (text.length < I18N_MIN_ALT_LENGTH) {
      return `Alt text for ${langId} must be at least ${I18N_MIN_ALT_LENGTH} characters (accessibility).`
    }
  }
  return true
}

/** SEO: meta title recommended length (Google typically displays ~50–60 chars). */
export const SEO_META_TITLE_MIN = 30
export const SEO_META_TITLE_MAX = 60

/** SEO: meta description recommended length (Google often truncates ~155–160 chars). */
export const SEO_META_DESCRIPTION_MIN = 120
export const SEO_META_DESCRIPTION_MAX = 160

/**
 * Validates that each required language has string length within [minLen, maxLen].
 * Use with rule.custom() for internationalizedArrayString SEO fields.
 */
export function validateI18nStringLength(
  value: unknown,
  minLen: number,
  maxLen: number,
  fieldLabel: string,
): string | true {
  if (!value || !Array.isArray(value)) return true
  const items = value as Array<{ _key: string; value?: string }>
  for (const langId of REQUIRED_LANGUAGE_IDS) {
    const item = items.find((i) => i._key === langId)
    const text = item?.value?.trim() ?? ''
    const len = text.length
    if (len > 0 && len < minLen) {
      return `${fieldLabel} for ${langId}: at least ${minLen} characters (${len}/${minLen}).`
    }
    if (len > maxLen) {
      return `${fieldLabel} for ${langId}: at most ${maxLen} characters (${len}/${maxLen}).`
    }
  }
  return true
}
