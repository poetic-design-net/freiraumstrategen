import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Unterüberschrift',
      type: 'text',
    }),
    defineField({
      name: 'form',
      title: 'Formular',
      type: 'object',
      fields: [
        {
          name: 'submitButton',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Senden'
        },
        {
          name: 'successMessage',
          title: 'Erfolgs-Nachricht',
          type: 'string',
          initialValue: 'Vielen Dank für Ihre Nachricht!'
        },
        {
          name: 'errorMessage',
          title: 'Fehler-Nachricht',
          type: 'string',
          initialValue: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading',
      enabled: 'enabled',
      id: 'id'
    },
    prepare({title, enabled, id}) {
      return {
        title: title || 'Contact Form Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''}`.trim(),
        media: BlockElementIcon
      }
    }
  }
})
