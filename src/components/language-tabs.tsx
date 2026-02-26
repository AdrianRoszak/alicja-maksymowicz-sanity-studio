import { Box, Flex } from '@sanity/ui'
import { GB, PL } from 'country-flag-icons/react/3x2'
import type { ComponentType } from 'react'
import { LANGUAGES, REQUIRED_LANGUAGE_IDS } from '../../config/i18n'
import { useActiveLanguage } from './language-context'

// biome-ignore lint/suspicious/noExplicitAny: Flag components have complex types from country-flag-icons
const FLAGS: Record<string, ComponentType<any>> = {
  GB,
  PL,
}

interface LanguageTabsProps {
  isFilled: (langId: string) => boolean
}

export function LanguageTabs({ isFilled }: LanguageTabsProps) {
  const { activeLanguage, setActiveLanguage } = useActiveLanguage()

  return (
    <Box marginBottom={1}>
      <Flex gap={1}>
        {LANGUAGES.map((lang) => {
          const filled = isFilled(lang.id)
          const isActive = activeLanguage === lang.id
          const isRequired = (
            REQUIRED_LANGUAGE_IDS as readonly string[]
          ).includes(lang.id)
          const hasError = isRequired && !filled
          const Flag = FLAGS[lang.countryCode]

          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => setActiveLanguage(lang.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 3,
                border: hasError
                  ? '2px solid #f03e2f'
                  : '2px solid transparent',
                borderRadius: 4,
                cursor: 'pointer',
                background: isActive
                  ? 'var(--card-border-color)'
                  : 'transparent',
                opacity: isActive ? 1 : 0.35,
                filter: isActive ? 'none' : 'grayscale(0.7)',
                transition: 'opacity 0.15s, filter 0.15s',
              }}
            >
              {Flag && (
                <Flag
                  style={{
                    width: 18,
                    height: 12,
                    display: 'block',
                    borderRadius: 1,
                  }}
                />
              )}
            </button>
          )
        })}
      </Flex>
    </Box>
  )
}
