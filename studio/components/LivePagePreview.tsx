import React from 'react'
import { Card, Stack, Text, Box } from '@sanity/ui'
import { useFormValue } from 'sanity'

export function LivePagePreview() {
  const sections = useFormValue(['sections']) as any[]
  const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL

  if (!previewUrl) {
    return (
      <Card padding={4} tone="caution">
        <Text>Preview URL not configured. Set SANITY_STUDIO_PREVIEW_URL in your environment.</Text>
      </Card>
    )
  }

  return (
    <Stack space={4}>
      <Card padding={4} radius={2}>
        <Stack space={3}>
          <Text weight="semibold">Live Preview</Text>
          <Box style={{ aspectRatio: '16/9', position: 'relative' }}>
            <iframe
              src={previewUrl}
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid var(--card-border-color)',
                borderRadius: 'var(--border-radius-2)',
              }}
            />
          </Box>
        </Stack>
      </Card>

      {/* Section Overview */}
      <Card padding={4} radius={2} tone="primary">
        <Stack space={3}>
          <Text weight="semibold">Aktive Sektionen</Text>
          {sections?.filter((section: any) => section.enabled !== false).map((section: any, index: number) => (
            <Card key={section._key} padding={3} radius={2} tone="default">
              <Text size={1}>
                {index + 1}. {section._type}
              </Text>
            </Card>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
