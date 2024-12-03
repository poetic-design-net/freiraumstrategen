import {defineField, defineType} from 'sanity'
import {getSectionTypes} from '../utils/getSectionTypes'

export default defineType({
  name: 'landingPage',
  title: 'Landing Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Der Haupttitel der Landing Page',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Die URL der Landing Page (z.B. strategiegespraech)',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      description: 'Eine kurze Beschreibung der Landing Page für Vorschauen und SEO',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }),
    defineField({
      name: 'sections',
      title: 'Sektionen',
      description: 'Wählen und ordnen Sie die Sektionen der Landing Page',
      type: 'array',
      of: getSectionTypes(),
      validation: Rule => Rule.required().min(1),
      options: {
        modal: {
          type: 'dialog',
          width: 'auto'
        },
        // Use list layout for larger previews
        layout: 'list'
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Landing Page',
        subtitle: `/${slug || ''}`
      }
    }
  }
})
