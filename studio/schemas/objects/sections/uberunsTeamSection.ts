import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'uberunsTeamSection',
  title: 'Über uns Team Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'headline',
      title: 'Überschrift',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          description: 'The smaller text that sits above the title to provide context'
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The large text that is the primary focus of the block'
        })
      ]
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      description: 'Eine kurze Einleitung zum Team-Bereich'
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Mitglieder',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Profilbild',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Beschreibung des Bildes für Screenreader und SEO'
                })
              ],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'bio',
              title: 'Biografie',
              type: 'text',
              description: 'Kurze Beschreibung oder Biografie des Teammitglieds'
            }),
            defineField({
              name: 'socialLinks',
              title: 'Social Media Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'platform',
                      title: 'Plattform',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'LinkedIn', value: 'linkedin'},
                          {title: 'Twitter', value: 'twitter'},
                          {title: 'Xing', value: 'xing'}
                        ]
                      }
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      validation: Rule => Rule.required()
                    })
                  ]
                }
              ]
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'position',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text für den Call-to-Action Button'
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Link-Ziel für den Call-to-Action Button'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline.title',
      subtitle: 'headline.eyebrow',
      enabled: 'enabled'
    },
    prepare({title, subtitle, enabled}) {
      return {
        title: title || 'Über uns Team Section',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${subtitle || ''}`
      }
    }
  }
})
