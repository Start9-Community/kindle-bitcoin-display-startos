import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  CHF: 'CHF',
  CAD: 'CAD',
  AUD: 'AUD',
  JPY: 'JPY',
}

const inputSpec = InputSpec.of({
  theme: Value.select({
    name: i18n('Display Theme'),
    description: i18n(
      "- Plain: block height, two exchange rates and a quote fetched from bitcoin-quotes.com\n- Onchain: the latest block, fee estimates and the next mempool blocks\n- Lightning: Lightning network capacity, nodes and channels, which need Mempool's Lightning explorer enabled\n- Mining: the latest block, unconfirmed transactions, the next difficulty adjustment and the week's top mining pools\n- Random: one of the four, picked at random on every refresh",
    ),
    default: 'plain',
    values: {
      plain: i18n('Plain'),
      onchain: i18n('Onchain'),
      lightning: i18n('Lightning'),
      mining: i18n('Mining'),
      random: i18n('Random'),
    },
  }),
  rate1: Value.select({
    name: i18n('Primary Exchange Rate'),
    description: i18n(
      'The first Bitcoin price shown on the display.\n- USD: US dollar\n- EUR: euro\n- GBP: British pound\n- CHF: Swiss franc\n- CAD: Canadian dollar\n- AUD: Australian dollar\n- JPY: Japanese yen',
    ),
    default: 'USD',
    values: CURRENCIES,
  }),
  rate2: Value.select({
    name: i18n('Secondary Exchange Rate'),
    description: i18n(
      'The second Bitcoin price shown on the display.\n- USD: US dollar\n- EUR: euro\n- GBP: British pound\n- CHF: Swiss franc\n- CAD: Canadian dollar\n- AUD: Australian dollar\n- JPY: Japanese yen',
    ),
    default: 'EUR',
    values: CURRENCIES,
  }),
  updateInterval: Value.number({
    name: i18n('Update Interval'),
    description: i18n(
      "How often fresh data is fetched from Mempool and a new display image rendered. The Kindle downloads the image on its own schedule, every five minutes with the upstream update script's default, so an interval longer than the Kindle's leaves it showing the same image more than once.",
    ),
    required: false,
    default: 300,
    min: 60,
    max: 3600,
    step: 60,
    integer: true,
    units: 'seconds',
  }),
})

export const configure = sdk.Action.withInput(
  'configure',
  {
    name: i18n('Configure'),
    description: i18n(
      'Adjust display theme, exchange rates, and update interval',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  inputSpec,
  async ({ effects }) => {
    const current = await storeJson.read().once()
    return {
      theme: current?.theme ?? 'plain',
      rate1: current?.rate1 ?? 'USD',
      rate2: current?.rate2 ?? 'EUR',
      updateInterval: current?.updateInterval ?? undefined,
    }
  },
  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      theme: input.theme,
      rate1: input.rate1 ?? 'USD',
      rate2: input.rate2 ?? 'EUR',
      updateInterval: input.updateInterval ?? 300,
    })
  },
)
