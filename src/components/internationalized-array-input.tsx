import { Box, Stack, TextInput } from '@sanity/ui'
import { useCallback } from 'react'
import { type ArrayOfObjectsInputProps, set } from 'sanity'
import { LANGUAGES } from '../../config/i18n'
import { useActiveLanguage } from './language-context'
import { LanguageTabs } from './language-tabs'

type LanguageValue = {
  _key: string
  _type?: string
  value?: string
}

/**
 * Custom input component for internationalized array fields.
 * Displays a language tab switcher and renders only the active language's input field.
 *
 * Features:
 * - Language tabs with country flags (synced with global context)
 * - Single text input for the active language (no stacked fields)
 * - Visual indicator for languages with filled values
 * - Active language synced across all fields and document banner
 */
export function InternationalizedArrayInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange } = props

  const arrayValue = (value as LanguageValue[] | undefined) ?? []

  const { activeLanguage } = useActiveLanguage()

  const isLanguageFilled = useCallback(
    (languageId: string): boolean => {
      const langItem = arrayValue.find((item) => item._key === languageId)
      return Boolean(langItem?.value && langItem.value.trim().length > 0)
    },
    [arrayValue],
  )

  const handleValueChange = useCallback(
    (languageId: string, newValue: string) => {
      const currentArray = arrayValue
      const existingIndex = currentArray.findIndex(
        (item) => item._key === languageId,
      )

      let updatedArray: LanguageValue[]

      if (existingIndex >= 0) {
        updatedArray = currentArray.map((item, idx) =>
          idx === existingIndex ? { ...item, value: newValue } : item,
        )
      } else {
        updatedArray = [
          ...currentArray,
          {
            _key: languageId,
            _type: 'internationalizedArrayStringValue',
            value: newValue,
          },
        ]
      }

      onChange(set(updatedArray))
    },
    [arrayValue, onChange],
  )

  const activeLanguageValue =
    arrayValue.find((item) => item._key === activeLanguage)?.value ?? ''

  return (
    <Stack space={3}>
      <LanguageTabs isFilled={isLanguageFilled} />

      <Box>
        <TextInput
          value={activeLanguageValue}
          onChange={(e) =>
            handleValueChange(activeLanguage, e.currentTarget.value)
          }
          placeholder={`Enter ${LANGUAGES.find((l) => l.id === activeLanguage)?.title.toLowerCase()} text...`}
          aria-label={`${LANGUAGES.find((l) => l.id === activeLanguage)?.title} input`}
        />
      </Box>
    </Stack>
  )
}
