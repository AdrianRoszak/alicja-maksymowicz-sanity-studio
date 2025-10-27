import type { FieldDefinition } from 'sanity'
import { defineField } from 'sanity'

export type RequiredDescriptionField = FieldDefinition & {
  description: string
}

/**
 * A wrapper for defineField that strictly enforces the presence of the 'description' field.
 *
 * @param field The field definition object, which must include 'description: string'.
 * @returns The result of the original defineField function.
 */
export const defineFieldWithDescription = <T extends RequiredDescriptionField>(field: T) => {
  // We pass the field object to the original Sanity function.
  // TypeScript has already ensured the object T contains the required 'description'.
  return defineField(field) as FieldDefinition
}
