import type { FieldDefinition } from 'sanity'
import { describe, it } from 'vitest'
import * as schemas from '../schemaTypes/content-types'

function isFieldDefinitionArray(fields: unknown): fields is FieldDefinition[] {
  return (
    Array.isArray(fields) && fields.every((f) => typeof f === 'object' && f !== null && 'name' in f)
  )
}

function checkNameRecursive(fields: FieldDefinition[], path: string[] = []) {
  for (const field of fields) {
    const fieldPath = [...path, field.name || '[unnamed]']
    if (typeof field.name !== 'string' || !/^([a-z0-9]+_)*[a-z0-9]+$/.test(field.name)) {
      throw new Error(`Invalid name at: ${fieldPath.join(' > ')}. Name must be snake_case.`)
    }
    if (isFieldDefinitionArray((field as { fields?: unknown }).fields)) {
      checkNameRecursive((field as { fields: FieldDefinition[] }).fields, fieldPath)
    }
    if (isFieldDefinitionArray((field as { of?: unknown }).of)) {
      for (const ofItem of (field as { of: FieldDefinition[] }).of) {
        if (isFieldDefinitionArray((ofItem as { fields?: unknown }).fields)) {
          checkNameRecursive((ofItem as { fields: FieldDefinition[] }).fields, [
            ...fieldPath,
            ofItem.name || '[unnamed]',
          ])
        }
      }
    }
  }
}

describe('Sanity schema name enforcement', () => {
  for (const [schemaKey, schema] of Object.entries(schemas)) {
    const fields = (schema as { fields?: unknown }).fields
    if (!isFieldDefinitionArray(fields)) continue
    it(`${schemaKey}: all fields must have snake_case names`, () => {
      checkNameRecursive(fields)
    })
  }
})

function checkPrefix(fields: FieldDefinition[], parentPrefix: string | null, schemaName: string) {
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
    if (isFieldDefinitionArray((field as { fields?: unknown }).fields)) {
      checkPrefix((field as { fields: FieldDefinition[] }).fields, field.name, schemaName)
    }
    if (isFieldDefinitionArray((field as { of?: unknown }).of)) {
      for (const ofItem of (field as { of: FieldDefinition[] }).of) {
        if (isFieldDefinitionArray((ofItem as { fields?: unknown }).fields)) {
          checkPrefix(
            (ofItem as { fields: FieldDefinition[] }).fields,
            ofItem.name || field.name,
            schemaName,
          )
        }
      }
    }
  }
}

describe('Sanity schema name prefix enforcement', () => {
  for (const [schemaKey, schema] of Object.entries(schemas)) {
    const fields = (schema as { fields?: unknown }).fields
    const schemaName = (schema as { name?: string }).name ?? ''
    if (!isFieldDefinitionArray(fields) || !schemaName) continue
    it(`${schemaKey}: all fields must have correct name prefixes`, () => {
      checkPrefix(fields, null, schemaName)
    })
  }
})
