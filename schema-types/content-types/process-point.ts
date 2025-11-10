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
      description:
        'Wpisz nazwę kroku/etapu procesu (np. "Konsultacja", "Realizacja"). Powinien być krótki i zwięzły.',
    }),
    defineFieldWithDescription({
      name: 'process_point_description',
      title: 'Opis',
      type: 'text',
      description:
        'Opisz szczegółowo co dzieje się w tym etapie. Wyjaśnij czego mogą spodziewać się klienci.',
    }),
  ],
})
