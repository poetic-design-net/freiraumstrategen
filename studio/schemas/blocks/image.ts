import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'image',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility. Describe the image content.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional. Add a caption to be displayed below the image.',
    }),
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      title: 'alt',
    },
  },
});
