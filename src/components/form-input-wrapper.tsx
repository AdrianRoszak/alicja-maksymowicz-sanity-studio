import { type InputProps, isObjectInputProps } from 'sanity'
import { DocumentLanguageBanner } from './document-language-banner'

export function FormInputWrapper(props: InputProps) {
  if (props.id === 'root' && isObjectInputProps(props)) {
    return <DocumentLanguageBanner {...props} />
  }
  return props.renderDefault(props)
}
