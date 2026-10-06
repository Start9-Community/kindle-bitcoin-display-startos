import { sdk } from './sdk'

export const dependencies = sdk.Dependencies.of().addDependency(
  sdk.Dependency.required('mempool', {
    description:
      'Provides the block height, fees, mempool blocks, Lightning statistics, and exchange rates displayed on the Kindle',
    metadata: {
      title: 'Mempool',
      icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/refs/heads/master/icon.svg',
    },
    versionRange: '>=3.3.0:0',
    kind: 'running',
    healthChecks: ['webui'],
  }),
)
