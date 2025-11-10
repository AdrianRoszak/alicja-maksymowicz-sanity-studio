import { defineFieldWithDescription } from '@src/lib/types'
import { validateSocialMediaUrl } from '@src/lib/validators'
import { defineType } from 'sanity'

export const companyData = defineType({
  name: 'company_data',
  title: 'Dane firmy',
  type: 'document',
  fields: [
    defineFieldWithDescription({
      name: 'company_data_language',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Język danych firmy.',
    }),
    defineFieldWithDescription({
      name: 'company_data_name',
      title: 'Nazwa firmy',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Wpisz pełną nazwę Twojej firmy. Będzie ona wyświetlana w stopce strony i dokumentach.',
    }),
    defineFieldWithDescription({
      name: 'company_data_email',
      title: 'Email główny',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Proszę podać poprawny adres email'),
      description:
        'Wpisz główny adres e-mail kontaktowy firmy. Ten adres będzie widoczny dla odwiedzających.',
    }),
    defineFieldWithDescription({
      name: 'company_data_social_media',
      title: 'Social media',
      type: 'object',
      description:
        'Dodaj linki do profili firmy w mediach społecznościowych. Wszystkie pola są opcjonalne.',
      fields: [
        defineFieldWithDescription({
          name: 'company_data_social_media_facebook',
          title: 'Facebook',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'facebook'),
            ),
          description:
            'Wklej link do profilu na Facebooku (np. https://facebook.com/twoja-firma).',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_instagram',
          title: 'Instagram',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'instagram'),
            ),
          description:
            'Wklej link do profilu na Instagramie (np. https://instagram.com/twoja-firma).',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_linkedin',
          title: 'LinkedIn',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'linkedin'),
            ),
          description:
            'Wklej link do profilu firmowego na LinkedIn (np. https://linkedin.com/company/twoja-firma).',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_youtube',
          title: 'YouTube',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'youtube'),
            ),
          description:
            'Wklej link do kanału na YouTube (np. https://youtube.com/@twoja-firma).',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_tiktok',
          title: 'TikTok',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'tiktok'),
            ),
          description:
            'Wklej link do profilu na TikToku (np. https://tiktok.com/@twoja-firma).',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'company_data_name',
      email: 'company_data_email',
      language: 'company_data_language',
    },
    prepare(selection) {
      const { name, email, language } = selection
      const langPrefix = language ? `[${String(language).toUpperCase()}] ` : ''

      return {
        title: `${langPrefix}${name || 'Dane firmy'}`,
        subtitle: email || '',
      }
    },
  },
})
