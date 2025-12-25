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
        'Wpisz nazwę wartości, którą się kierujesz (np. "Uczciwość", "Innowacyjność"). Każda wartość to osobny element.',
    }),
    defineFieldWithDescription({
      name: 'value_description',
      title: 'Opis wartości',
      type: 'text',
      description:
        'Opisz wartość, którą się kierujesz w kilku zdaniach. Wyjaśnij, dlaczego jest ważna dla Twojej oferty.',
    }),
  ],
})
