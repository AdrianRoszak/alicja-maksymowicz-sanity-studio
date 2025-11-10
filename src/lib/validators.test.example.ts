/**
 * Example usage and test cases for social media validators
 * This file demonstrates how the validation works
 */

import { validateSocialMediaUrl } from './validators'

// ✅ Valid URLs - These will pass validation
const _validExamples = {
  facebook: [
    'https://facebook.com/mypage',
    'https://www.facebook.com/mypage',
    'https://fb.com/mypage',
    'http://facebook.com/mypage',
  ],
  instagram: [
    'https://instagram.com/myprofile',
    'https://www.instagram.com/myprofile',
    'https://instagr.am/myprofile',
  ],
  linkedin: [
    'https://linkedin.com/in/myprofile',
    'https://www.linkedin.com/company/mycompany',
    'https://lnkd.in/xyz123',
  ],
  youtube: [
    'https://youtube.com/c/mychannel',
    'https://www.youtube.com/user/myuser',
    'https://youtu.be/videoid',
  ],
  tiktok: [
    'https://tiktok.com/@username',
    'https://www.tiktok.com/@username',
    'https://vm.tiktok.com/xyz123',
  ],
}

// ❌ Invalid URLs - These will fail validation

// Wrong platform
validateSocialMediaUrl('https://instagram.com/mypage', 'facebook')
// Returns: "To pole wymaga linku do Facebook, ale podano link do Instagram"

validateSocialMediaUrl('https://facebook.com/mypage', 'instagram')
// Returns: "To pole wymaga linku do Instagram, ale podano link do Facebook"

// Typos
validateSocialMediaUrl('https://facebok.com/mypage', 'facebook')
// Returns: "Znaleziono błąd w pisowni: 'facebok'. Prawidłowa domena to: facebook.com"

validateSocialMediaUrl('https://facbook.com/mypage', 'facebook')
// Returns: "Znaleziono błąd w pisowni: 'facbook'. Prawidłowa domena to: facebook.com"

validateSocialMediaUrl('https://instgram.com/mypage', 'instagram')
// Returns: "Znaleziono błąd w pisowni: 'instgram'. Prawidłowa domena to: instagram.com"

// Invalid URL
validateSocialMediaUrl('https://example.com/page', 'facebook')
// Returns: "Proszę podać poprawny link do Facebook (np. https://facebook.com/...)"

// Empty/undefined - These are valid (fields are optional)
validateSocialMediaUrl('', 'facebook')
// Returns: true

validateSocialMediaUrl(undefined, 'facebook')
// Returns: true

/**
 * Usage in Sanity schema:
 */
/*
defineFieldWithDescription({
  name: 'social_media_facebook',
  title: 'Facebook',
  type: 'url',
  validation: (Rule) =>
    Rule.custom((url: string | undefined) =>
      validateSocialMediaUrl(url, 'facebook')
    ),
  description: 'Link do profilu Facebook.',
})
*/
