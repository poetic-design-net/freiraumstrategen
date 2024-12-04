import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export default defineType({
  name: 'salesHeroSection',
  title: 'Sales Hero Section',
  type: 'object',
  icon: PresentationIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'cta',
      title: 'Call to Actions',
    },
    {
      name: 'stats',
      title: 'Statistics',
    },
    {
      name: 'styles',
      title: 'Styles',
    }
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'styles',
      title: 'Section Styles',
      type: 'sectionStyles',
      group: 'styles',
      description: 'Customize the appearance of this section',
      initialValue: {
        theme: 'light',
        overflow: true,
        customClasses: 'w-full min-h-screen flex flex-col'
      }
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main headline of the hero section',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      description: 'The secondary headline below the main headline',
      group: 'content'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The background image for the hero section',
      group: 'media',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Key statistics to display in the hero section',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The statistic value (e.g., "12", "100%")',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the statistic',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description or tagline',
      group: 'content'
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary Call to Action',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary Call to Action',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'videoButton',
      title: 'Video Button',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Winter Academy Insights',
        }),
        defineField({
          name: 'duration',
          title: 'Video Duration',
          type: 'string',
          initialValue: '2:30 min',
        }),
        defineField({
          name: 'videoId',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'The ID of the YouTube video to play',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'backgroundImage',
      enabled: 'enabled',
      styles: 'styles'
    },
    prepare({ title, subtitle, media, enabled, styles }) {
      return {
        title: title || 'Sales Hero Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subheadline'} | Theme: ${styles?.theme || 'default'}`,
        media: media || PresentationIcon,
      }
    },
  },
})
