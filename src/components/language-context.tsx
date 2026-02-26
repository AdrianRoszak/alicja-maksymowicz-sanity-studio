import { PRIMARY_LANGUAGE_ID } from '@config/i18n'
import { createContext, type ReactNode, useContext, useState } from 'react'

interface LanguageContextValue {
  activeLanguage: string
  setActiveLanguage: (id: string) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  activeLanguage: PRIMARY_LANGUAGE_ID,
  setActiveLanguage: () => {},
})

export const useActiveLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [activeLanguage, setActiveLanguage] =
    useState<string>(PRIMARY_LANGUAGE_ID)
  return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
