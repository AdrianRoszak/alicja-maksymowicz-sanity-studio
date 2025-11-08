import * as blockTypes from './block-types'
import * as contentTypes from './content-types'
import * as pages from './page-types'

// Filter out utility functions (like createSectionBlock) from schema types
const blockTypeSchemas = Object.values(blockTypes).filter(
  (value) => typeof value !== 'function',
)

export const schemaTypes = [
  ...Object.values(pages),
  ...Object.values(contentTypes),
  ...blockTypeSchemas,
]
