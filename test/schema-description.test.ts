import { describe, it } from 'vitest'
import * as schemas from '../schema-types/content-types'

// biome-ignore lint/suspicious/noExplicitAny: TODO - Replace 'any' with proper Sanity field type for stricter type safety
function checkDescriptionRecursive(fields: any[], path: string[] = []) {
  for (const field of fields) {
    const fieldPath = [...path, field.name || '[unnamed]']
    if (
      !field.description ||
      typeof field.description !== 'string' ||
      field.description.trim() === ''
    ) {
      throw new Error(
        `Missing or empty description at: ${fieldPath.join(' > ')}`,
      )
    }
    // Check nested fields (e.g., for objects, images, arrays)
    if (Array.isArray(field.fields)) {
      checkDescriptionRecursive(field.fields, fieldPath)
    }
    if (Array.isArray(field.of)) {
      for (const ofItem of field.of) {
        if (ofItem.fields) {
          checkDescriptionRecursive(ofItem.fields, [
            ...fieldPath,
            ofItem.name || '[unnamed]',
          ])
        }
      }
    }
  }
}

describe('Sanity schema description enforcement', () => {
  for (const [schemaKey, schema] of Object.entries(schemas)) {
    const fields = (schema as { fields?: unknown }).fields
    if (!Array.isArray(fields)) continue
    it(`${schemaKey}: all fields must have non-empty description`, () => {
      checkDescriptionRecursive(fields)
    })
  }
})
