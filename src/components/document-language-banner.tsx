import { Box, Flex, Stack, Text } from '@sanity/ui'
import { GB, PL } from 'country-flag-icons/react/3x2'
import type { ComponentType } from 'react'
import type { ObjectInputProps } from 'sanity'
import { LANGUAGES } from '../../config/i18n'
import { useActiveLanguage } from './language-context'

// import {LanguageTabs} from './LanguageTabs'

// biome-ignore lint/suspicious/noExplicitAny: Flag components have complex types from country-flag-icons
const FLAGS: Record<string, ComponentType<any>> = {
  GB,
  PL,
}

type I18nItem = { _key: string; value?: string }

function isI18nArray(val: unknown): val is I18nItem[] {
  if (!Array.isArray(val) || val.length === 0) return false
  const first = val[0]
  return (
    first && typeof first === 'object' && '_key' in first && 'value' in first
  )
}

function findTitle(value: Record<string, unknown>, lang: string): string {
  for (const [key, val] of Object.entries(value)) {
    if (key.endsWith('_title') && isI18nArray(val)) {
      const item = val.find((i) => i._key === lang)
      if (item?.value?.trim()) return item.value
    }
  }
  return 'Untitled'
}

// TODO: Consider adding this back in
// function countTranslations(value: unknown): {filled: number; total: number} {
//   if (!value || typeof value !== 'object') return {filled: 0, total: 0}
//   let total = 0
//   let filled = 0
//   for (const val of Object.values(value as Record<string, unknown>)) {
//     if (isI18nArray(val)) {
//       total++
//       const ok = (REQUIRED_LANGUAGE_IDS as readonly string[]).every((id) =>
//         val.some((i) => i._key === id && Boolean(i.value?.trim())),
//       )
//       if (ok) filled++
//     } else if (val && typeof val === 'object' && !Array.isArray(val)) {
//       const nested = countTranslations(val)
//       total += nested.total
//       filled += nested.filled
//     }
//   }
//   return {filled, total}
// }

// TODO: Consider adding this back in
// function checkLanguageFilled(value: Record<string, unknown>, langId: string): boolean {
//   for (const val of Object.values(value)) {
//     if (isI18nArray(val)) {
//       const item = val.find((i) => i._key === langId)
//       if (item?.value?.trim()) return true
//     } else if (val && typeof val === 'object' && !Array.isArray(val)) {
//       if (checkLanguageFilled(val as Record<string, unknown>, langId)) return true
//     }
//   }
//   return false
// }

export function DocumentLanguageBanner(props: ObjectInputProps) {
  const { activeLanguage } = useActiveLanguage()
  const lang = LANGUAGES.find((l) => l.id === activeLanguage)
  const Flag = lang ? FLAGS[lang.countryCode] : null
  const value = (props.value as Record<string, unknown>) ?? {}
  const title = findTitle(value, activeLanguage)

  // TODO: Consider adding this back in
  // const {filled, total} = countTranslations(value)
  // if (total === 0) return props.renderDefault(props)

  // TODO: Consider adding this back in
  // const allComplete = filled === total
  // const isLanguageFilled = (langId: string) => checkLanguageFilled(value, langId)

  return (
    <>
      <style>{`[data-testid="document-panel-document-title"] { display: none !important; }`}</style>

      <Box
        paddingY={4}
        marginBottom={4}
        style={{ borderBottom: '1px solid var(--card-border-color)' }}
      >
        <Stack space={3}>
          <Flex align="center" gap={3}>
            <Box flex={1}>
              <Text size={4} weight="bold">
                {title}
              </Text>
            </Box>

            <Flex align="center" gap={2}>
              {Flag && (
                <Box
                  style={{
                    width: '24px',
                    height: '16px',
                    overflow: 'hidden',
                    borderRadius: '2px',
                  }}
                  title={lang?.title}
                >
                  <Flag />
                </Box>
              )}
              <Text size={1} muted>
                {lang?.title}
              </Text>
              {/* TODO: Consider adding this back in */}
              {/* <Box
                paddingX={2}
                paddingY={1}
                style={{
                  borderRadius: '4px',
                  backgroundColor: allComplete
                    ? 'var(--card-badge-success-bg-color)'
                    : 'var(--card-badge-caution-bg-color)',
                }}
              >
                <Text size={1} weight="medium" style={{display: 'none'}}>
                  {filled}/{total}
                </Text>
              </Box> */}
            </Flex>
          </Flex>

          {/* TODO: Consider adding this back in */}
          {/* <LanguageTabs isFilled={isLanguageFilled} /> */}
        </Stack>
      </Box>

      <Stack space={4}>{props.renderDefault(props)}</Stack>
    </>
  )
}
