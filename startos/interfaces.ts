import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multi = sdk.MultiHost.of(effects, 'ui')
  // Plain HTTP by design: the Kindle fetches with BusyBox wget, which cannot
  // speak TLS or trust the StartOS certificate.
  const origin = await multi.bindPort(uiPort, {
    protocol: null,
    addSsl: null,
    preferredExternalPort: 80,
    secure: { ssl: false },
  })

  const ui = sdk.createInterface(effects, {
    name: i18n('Kindle Image URL'),
    id: 'ui',
    description: i18n(
      'The address the Kindle fetches display.png from — set it as BASE in the Kindle update script',
    ),
    type: 'api',
    masked: false,
    schemeOverride: { ssl: null, noSsl: 'http' },
    username: null,
    path: '',
    query: {},
  })

  return [await origin.export([ui])]
})
