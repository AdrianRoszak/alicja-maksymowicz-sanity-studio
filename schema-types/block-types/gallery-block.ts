import { defineField, defineType } from 'sanity'

export const galleryBlock = defineType({
  name: 'gallery_block',
  title: 'Galeria',
  type: 'object',
  fields: [
    defineField({
      name: 'gallery_block_images',
      title: 'Zdjęcia',
      type: 'array',
      of: [{ type: 'image_block' }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Zdjęcia w galerii.',
    }),
  ],
  preview: {
    select: {
      images: 'gallery_block_images',
    },
    prepare(selection) {
      const { images } = selection
      const imageCount = images?.length || 0
      const firstImage = images?.[0]?.image_block_image

      return {
        title: `Galeria (${imageCount} ${imageCount === 1 ? 'zdjęcie' : 'zdjęć'})`,
        media: firstImage,
      }
    },
  },
})
