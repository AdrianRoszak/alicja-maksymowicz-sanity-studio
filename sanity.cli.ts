import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId, validateEnvironment } from './lib/env'

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
