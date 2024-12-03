import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'The smaller text that sits above the title to provide context',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({
          name: 'thin',
          title: 'Thin Text',
          type: 'string',
          description: 'The part of the title that should appear in a thinner font weight',
        }),
        defineField({
          name: 'regular',
          title: 'Regular Text',
          type: 'string',
          description: 'The part of the title that should appear in a regular font weight',
        }),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A brief description below the title',
    }),
    defineField({
      name: 'selectedTestimonials',
      title: 'Selected Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title.regular',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Testimonial Section',
        subtitle: subtitle,
        media: UsersIcon,
      }
    },
  },
})
