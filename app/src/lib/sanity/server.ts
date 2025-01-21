import { createClient } from '@sanity/client'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } from '$env/static/public'
import { SANITY_API_READ_TOKEN } from '$env/static/private'

// Client für server-seitige Operationen (mit auth token)
export const serverClient = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: PUBLIC_SANITY_API_VERSION || '2024-01-20',
  token: SANITY_API_READ_TOKEN,
  useCdn: false // Deaktiviere CDN für server-seitige Operationen
})