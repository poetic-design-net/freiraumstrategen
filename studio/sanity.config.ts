import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemas'
import {deskStructure} from './deskStructure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

const config = defineConfig({
  name: 'project-name',
  title: 'Freiraumstrategen.com',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: deskStructure
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable'
        }
      }
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: (schemaTypes as any[]).map(type => ({...type}))
  }
})

export default config
