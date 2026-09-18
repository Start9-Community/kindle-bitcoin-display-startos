import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async () => ({
  mempool: {
    kind: 'running',
    versionRange: '>=3.3.0:0',
    healthChecks: ['webui'],
  },
}))
