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
      description: 'Pełna nazwa firmy.',
    }),
    defineFieldWithDescription({
      name: 'company_data_email',
      title: 'Email główny',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Proszę podać poprawny adres email'),
      description: 'Główny adres email firmy.',
    }),
    defineFieldWithDescription({
      name: 'company_data_social_media',
      title: 'Social media',
      type: 'object',
      description: 'Linki do profili w mediach społecznościowych.',
      fields: [
        defineFieldWithDescription({
          name: 'company_data_social_media_facebook',
          title: 'Facebook',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'facebook'),
            ),
          description: 'Link do profilu Facebook.',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_instagram',
          title: 'Instagram',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'instagram'),
            ),
          description: 'Link do profilu Instagram.',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_linkedin',
          title: 'LinkedIn',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'linkedin'),
            ),
          description: 'Link do profilu LinkedIn.',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_youtube',
          title: 'YouTube',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'youtube'),
            ),
          description: 'Link do kanału YouTube.',
        }),
        defineFieldWithDescription({
          name: 'company_data_social_media_tiktok',
          title: 'TikTok',
          type: 'url',
          validation: (Rule) =>
            Rule.custom((url: string | undefined) =>
              validateSocialMediaUrl(url, 'tiktok'),
            ),
          description: 'Link do profilu TikTok.',
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
