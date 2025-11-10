/**
 * Social media URL validation utilities
 * Ensures URLs match the correct platform to prevent typos and mismatches
 */

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'

/**
 * Social media platform URL patterns
 * Used to validate that URLs belong to the correct platform
 */
const SOCIAL_PATTERNS: Record<SocialPlatform, RegExp[]> = {
  facebook: [
    /^https?:\/\/(www\.)?facebook\.com\//i,
    /^https?:\/\/(www\.)?fb\.com\//i,
    /^https?:\/\/(www\.)?fb\.me\//i,
  ],
  instagram: [
    /^https?:\/\/(www\.)?instagram\.com\//i,
    /^https?:\/\/(www\.)?instagr\.am\//i,
  ],
  linkedin: [
    /^https?:\/\/(www\.)?linkedin\.com\//i,
    /^https?:\/\/(www\.)?lnkd\.in\//i,
  ],
  youtube: [
    /^https?:\/\/(www\.)?youtube\.com\//i,
    /^https?:\/\/(www\.)?youtu\.be\//i,
    /^https?:\/\/(www\.)?m\.youtube\.com\//i,
  ],
  tiktok: [
    /^https?:\/\/(www\.)?tiktok\.com\//i,
    /^https?:\/\/(www\.)?vm\.tiktok\.com\//i,
  ],
}

/**
 * Common typos for each platform
 * Used to provide helpful error messages
 */
const COMMON_TYPOS: Record<SocialPlatform, string[]> = {
  facebook: ['facebok', 'facbook', 'faccebook', 'faceboook'],
  instagram: ['instagra', 'instgram', 'instagramm'],
  linkedin: ['linkdin', 'linkedn', 'linkin'],
  youtube: ['youtub', 'youtobe', 'youtue'],
  tiktok: ['tiktoc', 'ticktock', 'tictok'],
}

/**
 * Validates if a URL matches the expected social media platform
 *
 * @param url - The URL to validate
 * @param platform - The expected social media platform
 * @returns Error message if invalid, true if valid
 *
 * @example
 * validateSocialMediaUrl('https://facebook.com/mypage', 'facebook')
 * // Returns: true
 *
 * @example
 * validateSocialMediaUrl('https://instagram.com/mypage', 'facebook')
 * // Returns: "To pole wymaga linku do Facebook, ale podano link do Instagram"
 *
 * @example
 * validateSocialMediaUrl('https://facebok.com/mypage', 'facebook')
 * // Returns: "Znaleziono błąd w pisowni: 'facebok'. Prawidłowa domena to: facebook.com"
 */
export function validateSocialMediaUrl(
  url: string | undefined,
  platform: SocialPlatform,
): string | true {
  // If URL is empty, it's optional - return valid
  if (!url || url.trim() === '') {
    return true
  }

  const patterns = SOCIAL_PATTERNS[platform]
  const platformName = getPlatformDisplayName(platform)

  // Check if URL matches the expected platform
  const isValid = patterns.some((pattern) => pattern.test(url))

  if (isValid) {
    return true
  }

  // Check if it's a typo
  const typoError = checkForTypos(url, platform)
  if (typoError) {
    return typoError
  }

  // Check if it's a different platform
  const detectedPlatform = detectPlatform(url)
  if (detectedPlatform && detectedPlatform !== platform) {
    const detectedName = getPlatformDisplayName(detectedPlatform)
    return `To pole wymaga linku do ${platformName}, ale podano link do ${detectedName}`
  }

  // Generic error
  return `Proszę podać poprawny link do ${platformName} (np. https://${platform}.com/...)`
}

/**
 * Detects which social media platform a URL belongs to
 */
function detectPlatform(url: string): SocialPlatform | null {
  for (const [platform, patterns] of Object.entries(SOCIAL_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(url))) {
      return platform as SocialPlatform
    }
  }
  return null
}

/**
 * Checks for common typos in social media URLs
 */
function checkForTypos(url: string, platform: SocialPlatform): string | null {
  const typos = COMMON_TYPOS[platform]
  const lowerUrl = url.toLowerCase()

  for (const typo of typos) {
    if (lowerUrl.includes(typo)) {
      return `Znaleziono błąd w pisowni: '${typo}'. Prawidłowa domena to: ${platform}.com`
    }
  }

  return null
}

/**
 * Gets the display name for a platform
 */
function getPlatformDisplayName(platform: SocialPlatform): string {
  const names: Record<SocialPlatform, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  }
  return names[platform]
}
