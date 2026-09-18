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
      'Which layout to render on the Kindle: plain, onchain, lightning, mining, or a random pick each refresh',
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
    description: i18n('Currency for the primary rate. Fetched from Mempool.'),
    default: 'USD',
    values: CURRENCIES,
  }),
  rate2: Value.select({
    name: i18n('Secondary Exchange Rate'),
    description: i18n('Currency for the secondary rate.'),
    default: 'EUR',
    values: CURRENCIES,
  }),
  updateInterval: Value.number({
    name: i18n('Update Interval'),
    description: i18n('Seconds between scheduled data updates'),
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
