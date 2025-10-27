import { dataset, projectId, validateEnvironment } from '@lib/env'
import { defineCliConfig } from 'sanity/cli'

// Validate environment variables on startup
validateEnvironment()

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: 'l0kd0ljigtkem6hzi7pmj72n',
    autoUpdates: true,
  },
})
