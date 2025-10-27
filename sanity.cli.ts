import { dataset, projectId, validateEnvironment } from '@lib/env'
import { defineCliConfig } from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'

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
  vite: {
    plugins: [tsconfigPaths()],
  },
})
