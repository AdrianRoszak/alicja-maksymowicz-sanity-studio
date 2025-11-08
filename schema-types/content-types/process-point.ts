import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const processPoint = defineType({
  name: 'process_point',
  title: 'Punkt procesu',
  type: 'object',
  fields: [
    defineFieldWithDescription({
      name: 'process_point_header',
      title: 'Tytuł',
      type: 'string',
      description: 'Tytuł punktu procesu.',
    }),
    defineFieldWithDescription({
      name: 'process_point_description',
      title: 'Opis',
      type: 'text',
      description: 'Opis punktu procesu.',
    }),
  ],
})
