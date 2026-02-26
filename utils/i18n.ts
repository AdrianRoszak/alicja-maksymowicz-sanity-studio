import { REQUIRED_LANGUAGE_IDS } from '../config/i18n'

type I18nTitleItem = { _key: string; value?: string }

/**
 * First non-empty title from required languages order. Use for document preview.
 */
export function getPreviewTitleFromI18n(
  titleArray: I18nTitleItem[] | undefined,
  fallback = 'Untitled',
): string {
  const value = REQUIRED_LANGUAGE_IDS.map(
    (id) => titleArray?.find((item) => item._key === id)?.value,
  ).find(Boolean)
  return value?.trim() || fallback
}
