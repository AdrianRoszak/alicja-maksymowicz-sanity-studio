// `seo_settings` was moved to block-types and is exported as `seoBlock`.
// Re-export under the old name for compatibility with existing imports.
export { seoBlock as seoSettings } from '../block-types'
export { author } from './author'
export { blockContent } from './block-content'
export { blogPost } from './blog-post'
export { category } from './category'
