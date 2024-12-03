import type { PreviewConfig, ObjectDefinition } from 'sanity'

interface SectionPreviewProps {
  title?: string
  subtitle?: string
  enabled?: boolean
}

export const sectionPreviewMixin: Partial<ObjectDefinition> = {
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, enabled = true }: SectionPreviewProps) {
      return {
        title: title || 'Untitled Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || ''}`.trim(),
      }
    }
  },
  fields: [
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Controls whether this section is visible on the website',
      initialValue: true,
    }
  ]
}
