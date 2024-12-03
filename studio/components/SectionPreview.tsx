import React from 'react'
import { Box } from '@sanity/ui'
import { useClient } from 'sanity'

interface SectionPreviewProps {
  value: any
}

export function SectionPreview({ value }: SectionPreviewProps) {
  const client = useClient()
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Check common image fields
    const imageFields = ['previewImage', 'heroImage', 'image', 'backgroundImage']
    let imageRef: string | null = null

    for (const field of imageFields) {
      if (value[field]?.asset?._ref) {
        imageRef = value[field].asset._ref
        break
      }
    }

    if (imageRef) {
      client.getDocument(imageRef).then((imageAsset: any) => {
        if (imageAsset?.url) {
          setImageUrl(imageAsset.url)
        }
      })
    }
  }, [value, client])

  if (!imageUrl) {
    return null
  }

  return (
    <Box style={{ position: 'relative', width: '100%', height: '200px' }}>
      <img
        src={imageUrl}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'var(--border-radius-2)'
        }}
      />
    </Box>
  )
}
