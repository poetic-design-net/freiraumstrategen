import { createClient } from '@sanity/client'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } from '$env/static/public'

// Client für client-seitige Operationen (nur public env vars)
export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: PUBLIC_SANITY_API_VERSION || '2024-01-20',
  useCdn: true
})
