import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'kindle-bitcoin-display',
  title: 'Kindle Bitcoin Display',
  license: 'MIT',
  packageRepo:
    'https://github.com/Start9-Community/kindle-bitcoin-display-startos',
  upstreamRepo: 'https://github.com/dennisreimann/kindle-display',
  marketingUrl: 'https://d11n.net/kindle-status-display.html',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    'kindle-bitcoin-display': {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
