import {defineField, defineType} from 'sanity'
import { getSectionArray } from '../utils/getSectionTypes'
import { SectionArrayInput } from '../../components/SectionArrayInput'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'frontpage',
  title: 'Startseite',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'content',
      title: 'Seitenaufbau',
      default: true
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Seitentitel',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    }),
    defineField({
      ...getSectionArray(),
      group: 'content',
      components: {
        input: SectionArrayInput
      },
      validation: Rule => Rule.required().min(1).error('Mindestens eine Sektion ist erforderlich'),
      description: 'Hier können Sie die Sektionen der Startseite verwalten. Ziehen Sie die Sektionen per Drag & Drop, um die Reihenfolge anzupassen.'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Einstellungen',
      type: 'seo',
      group: 'seo',
      description: 'Suchmaschinenoptimierung für die Startseite'
    })
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections'
    },
    prepare({ title, sections = [] }) {
      const enabledSections = sections.filter((section: any) => section.enabled !== false);
      const sectionTypes = enabledSections.map((section: any) => section._type);
      
      return {
        title: title || 'Startseite',
        subtitle: `${enabledSections.length} aktive Sektionen`,
        media: HomeIcon,
        description: sectionTypes.join(', ')
      }
    }
  }
})
