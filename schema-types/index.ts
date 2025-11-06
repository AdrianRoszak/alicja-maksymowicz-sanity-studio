import * as blockTypes from './block-types'
import * as contentTypes from './content-types'
import * as pages from './page-types'

export const schemaTypes = [
  ...Object.values(pages),
  ...Object.values(contentTypes),
  ...Object.values(blockTypes),
]
