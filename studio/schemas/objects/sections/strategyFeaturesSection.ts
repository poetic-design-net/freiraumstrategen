import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'strategyFeaturesSection',
  title: 'Strategy Features Section',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'previewImage',
      title: 'Vorschaubild',
      type: 'image',
      description: 'Ein Vorschaubild für diese Sektion in der Übersicht',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'The small badge text that appears above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      fields: [
        defineField({
          name: 'regular',
          title: 'Regular Text',
          type: 'string',
          description: 'The main heading text'
        }),
        defineField({
          name: 'highlighted',
          title: 'Highlighted Text',
          type: 'string',
          description: 'The bold part of the heading'
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        defineField({
          name: 'mainParagraph',
          title: 'Main Paragraph',
          type: 'text',
          description: 'The highlighted first paragraph'
        }),
        defineField({
          name: 'secondaryParagraph',
          title: 'Secondary Paragraph',
          type: 'text',
          description: 'The second, supporting paragraph'
        })
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      description: 'List of features with icons',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The feature title',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'The feature subtitle or description',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              description: 'Select the icon style for this feature',
              options: {
                list: [
                  {title: 'Time', value: 'time'},
                  {title: 'Chart', value: 'chart'},
                  {title: 'Team', value: 'team'},
                ],
              },
            }),
            defineField({
              name: 'iconColor',
              title: 'Icon Color Theme',
              type: 'string',
              description: 'Select the color theme for the icon',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Blue', value: 'blue'},
                  {title: 'Green', value: 'green'},
                ],
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      description: 'The testimonial card that appears in the section',
      fields: [
        defineField({
          name: 'image',
          title: 'Avatar Image',
          type: 'image',
          description: 'The avatar image for the testimonial',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for screen readers and SEO',
            },
          ],
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The main testimonial text',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'The supporting testimonial text',
        }),
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'The main image displayed in the section',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for screen readers and SEO',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading.regular',
      enabled: 'enabled',
      media: 'previewImage'
    },
    prepare({title, enabled, media}) {
      return {
        title: title || 'Strategy Features Section',
        subtitle: enabled ? 'Aktiviert' : 'Deaktiviert',
        media: media || ThListIcon
      }
    }
  },
})
