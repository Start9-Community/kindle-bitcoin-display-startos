import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { uiPort, mempoolBridge } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Kindle Bitcoin Display!'))

  const store = await storeJson.read().const(effects)

  // Mempool is a required dependency: data.mjs fetches the block height, fees,
  // mempool blocks, Lightning statistics and exchange rates from it. The bridge
  // resolves to host:port, so prefix it with http:// for the Mempool base URL.
  const mempoolAddr = await mempoolBridge(effects).const()

  const sharedEnv: Record<string, string> = {
    DISPLAY_SERVER_PORT: String(uiPort),
    DISPLAY_THEME: store?.theme ?? 'plain',
    DISPLAY_RATE1: store?.rate1 ?? 'USD',
    DISPLAY_RATE2: store?.rate2 ?? 'EUR',
    MEMPOOL_BASE_URL: `http://${mempoolAddr}`,
  }

  const mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/app/data',
    readonly: false,
  })

  const sub = sdk.SubContainer.of(
    effects,
    { imageId: 'kindle-bitcoin-display' },
    mounts,
    'main',
  )

  return sdk.Daemons.of(effects)
    .addDaemon('web', {
      subcontainer: sub,
      exec: {
        command: sdk.useEntrypoint(),
        env: sharedEnv,
      },
      ready: {
        display: i18n('Image Server'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The image server is ready'),
            errorMessage: i18n('The image server is not ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('updater', {
      subcontainer: sub,
      exec: {
        command: sdk.useEntrypoint(['/app/updater-loop.sh']),
        env: {
          ...sharedEnv,
          UPDATE_INTERVAL: String(store?.updateInterval ?? 300),
        },
      },
      ready: {
        display: i18n('Data Updater'),
        // cron.sh keeps the previous display.png when the screenshot fails, so
        // the image's age is what the Kindle actually sees.
        fn: async () => {
          const result = await sub.exec([
            'sh',
            '-c',
            `test -f /app/data/display.png && find /app/data/display.png -mmin -${Math.ceil(
              ((store?.updateInterval ?? 300) * 2) / 60,
            )} | grep -q .`,
          ])
          if (result.exitCode !== 0) {
            return {
              result: 'loading',
              message: i18n('Waiting for a fresh display image'),
            }
          }
          return {
            result: 'success',
            message: i18n('The display image is up to date'),
          }
        },
      },
      requires: ['web'],
    })
})
