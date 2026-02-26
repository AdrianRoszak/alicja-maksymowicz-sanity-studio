import type { LayoutProps } from 'sanity'
import { LanguageProvider } from './language-context'

export function StudioLayout(props: LayoutProps) {
  return <LanguageProvider>{props.renderDefault(props)}</LanguageProvider>
}
