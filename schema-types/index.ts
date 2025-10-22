import * as blockTypes from './block-types'
import * as contentTypes from './content-types'

export const schemaTypes = [...Object.values(contentTypes), ...Object.values(blockTypes)]
