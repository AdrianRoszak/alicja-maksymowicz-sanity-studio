import { describe, it } from 'vitest'
import * as schemas from '../schemaTypes/content-types'

interface Field {
  name?: string
  fields?: unknown
  of?: unknown
  [key: string]: unknown
}

function isFieldArray(fields: unknown): fields is Field[] {
  return (
    Array.isArray(fields) && fields.every((f) => typeof f === 'object' && f !== null && 'name' in f)
  )
}

function checkNameRecursive(fields: Field[], path: string[] = []) {
  for (const field of fields) {
    const fieldPath = [...path, field.name || '[unnamed]']
    if (typeof field.name !== 'string' || !/^([a-z0-9]+_)*[a-z0-9]+$/.test(field.name)) {
      throw new Error(`Invalid name at: ${fieldPath.join(' > ')}. Name must be snake_case.`)
    }
    if (isFieldArray(field.fields)) {
      checkNameRecursive(field.fields, fieldPath)
    }
    if (isFieldArray(field.of)) {
      for (const ofItem of field.of) {
        if (isFieldArray(ofItem.fields)) {
          checkNameRecursive(ofItem.fields, [...fieldPath, ofItem.name || '[unnamed]'])
        }
      }
    }
  }
}

describe('Sanity schema name enforcement', () => {
  for (const [schemaKey, schema] of Object.entries(schemas)) {
    const fields = (schema as { fields?: unknown }).fields
    if (!isFieldArray(fields)) continue
    it(`${schemaKey}: all fields must have snake_case names`, () => {
      checkNameRecursive(fields)
    })
  }
})

function checkPrefix(fields: Field[], parentPrefix: string | null, schemaName: string) {
  for (const field of fields) {
    if (!field.name) continue
    if (!parentPrefix) {
      if (!field.name.startsWith(`${schemaName}_`)) {
        throw new Error(`Top-level field '${field.name}' must start with '${schemaName}_'`)
      }
    } else {
      if (!field.name.startsWith(`${parentPrefix}_`)) {
        throw new Error(`Nested field '${field.name}' must start with '${parentPrefix}_'`)
      }
    }
    if (isFieldArray(field.fields)) {
      checkPrefix(field.fields, field.name, schemaName)
    }
    if (isFieldArray(field.of)) {
      for (const ofItem of field.of) {
        if (isFieldArray(ofItem.fields)) {
          checkPrefix(ofItem.fields, ofItem.name || field.name, schemaName)
        }
      }
    }
  }
}

describe('Sanity schema name prefix enforcement', () => {
  for (const [schemaKey, schema] of Object.entries(schemas)) {
    const fields = (schema as { fields?: unknown }).fields
    const schemaName = (schema as { name?: string }).name ?? ''
    if (!isFieldArray(fields) || !schemaName) continue
    it(`${schemaKey}: all fields must have correct name prefixes`, () => {
      checkPrefix(fields, null, schemaName)
    })
  }
})
