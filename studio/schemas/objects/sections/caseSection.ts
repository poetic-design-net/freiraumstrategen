import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'caseSection',
  title: 'Slider (Cards)',
  type: 'object',
  icon: StarIcon,
  fields: [
    anchorField,
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
      title: 'Badge Text',
      type: 'string',
      description: 'Der Text im Badge über der Überschrift',
      initialValue: 'Deine Story zum Erfolg'
    }),
    defineField({
      name: 'title',
      title: 'Überschrift',
      type: 'string',
      description: 'Die Hauptüberschrift der Sektion'
    }),
    defineField({
      name: 'subtitle',
      title: 'Untertitel',
      type: 'text',
      description: 'Ein kurzer erklärender Text unter der Überschrift'
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      description: 'Der erklärende Text neben der Überschrift',
      initialValue: 'Entdecken Sie unsere verschiedenen Angebote und finden Sie den perfekten Weg zu Ihrem Trading-Erfolg.'
    }),
    defineField({
      name: 'selectedPages',
      title: 'Ausgewählte Seiten',
      description: 'Wählen Sie spezifische Seiten oder Landing Pages aus, die in dieser Sektion angezeigt werden sollen',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'page' },
            { type: 'landingPage' }
          ]
        }
      ],
      validation: Rule => Rule.custom((selectedPages, context: any) => {
        const selectedPosts = context.parent?.selectedPosts || [];
        return selectedPages?.length || selectedPosts?.length 
          ? true 
          : 'Mindestens eine Seite oder ein Blog-Beitrag muss ausgewählt werden';
      })
    }),
    defineField({
      name: 'selectedPosts',
      title: 'Ausgewählte Blog Posts',
      description: 'Wählen Sie Blog-Beiträge aus, die in dieser Sektion angezeigt werden sollen',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }]
        }
      ],
      validation: Rule => Rule.custom((selectedPosts, context: any) => {
        const selectedPages = context.parent?.selectedPages || [];
        return selectedPages?.length || selectedPosts?.length 
          ? true 
          : 'Mindestens eine Seite oder ein Blog-Beitrag muss ausgewählt werden';
      })
    }),
    defineField({
      name: 'displaySettings',
      title: 'Anzeigeeinstellungen',
      type: 'object',
      fields: [
        {
          name: 'showHeroImage',
          title: 'Hero-Bild anzeigen',
          type: 'boolean',
          description: 'Zeigt das Hero-Bild der Seite als Vorschaubild an',
          initialValue: true
        },
        {
          name: 'customExcerptLength',
          title: 'Länge der Beschreibung',
          type: 'number',
          description: 'Maximale Anzahl der Zeichen für die Beschreibung',
          initialValue: 150
        }
      ]
    }),
    defineField({
      name: 'animation',
      title: 'Animation Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Animation aktivieren',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'duration',
          title: 'Animationsdauer (in Sekunden)',
          type: 'number',
          initialValue: 0.6
        }
      ]
    })
  ],
  preview: {
    select: {
      enabled: 'enabled',
      title: 'title',
      pagesCount: 'selectedPages.length',
      postsCount: 'selectedPosts.length',
      media: 'previewImage'
    },
    prepare({ enabled, title, pagesCount = 0, postsCount = 0, media }) {
      const itemCount = pagesCount + postsCount;
      return {
        title: title || 'Slider (Cards)',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`,
        media: media || StarIcon
      }
    }
  }
})
