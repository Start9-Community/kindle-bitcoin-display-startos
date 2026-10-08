import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  theme: z
    .enum(['plain', 'onchain', 'lightning', 'mining', 'random'])
    .catch('plain'),
  rate1: z.enum(['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']).catch('USD'),
  rate2: z.enum(['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']).catch('EUR'),
  updateInterval: z.number().catch(300),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'store.json' },
  shape,
)
