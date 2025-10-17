import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId, validateEnvironment} from './lib/env'

// Validate environment variables on startup
validateEnvironment()

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
