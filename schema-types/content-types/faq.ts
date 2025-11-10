import { defineFieldWithDescription } from '@src/lib/types'
import { defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'faq_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język tego FAQ.',
    }),
    defineFieldWithDescription({
      name: 'faq_question',
      title: 'Pytanie',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
      description:
        'Wpisz pytanie, które często zadają Twoi klienci (max 200 znaków). Staraj się formułować je tak, jak pytaliby odwiedzający.',
    }),
    defineFieldWithDescription({
      name: 'faq_answer',
      title: 'Odpowiedź',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description:
        'Napisz szczegółową odpowiedź na powyższe pytanie. Im bardziej konkretna, tym lepiej dla użytkowników.',
    }),
  ],
  preview: {
    select: {
      question: 'faq_question',
      answer: 'faq_answer',
      language: 'faq_language',
    },
    prepare(selection) {
      const { question, answer, language } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''
      const answerPreview = answer
        ? answer.substring(0, 80) + (answer.length > 80 ? '...' : '')
        : ''

      return {
        title: `${langPrefix}${question || 'Bez pytania'}`,
        subtitle: answerPreview,
      }
    },
  },
})
