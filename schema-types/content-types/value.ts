import { defineFieldWithDescription } from '@src/lib'
import { defineType } from 'sanity'

export const value = defineType({
  name: 'value',
  title: 'Wartość',
  type: 'object',
  fields: [
    defineFieldWithDescription({
      name: 'value_name',
      title: 'Nazwa wartości',
      type: 'string',
      description:
        'Wpisz wartość lub zasadę, którą się kierujesz (np. "Uczciwość", "Innowacyjność"). Każda wartość to osobny element.',
    }),
  ],
})
