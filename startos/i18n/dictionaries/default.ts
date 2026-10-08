export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Kindle Bitcoin Display!': 0,
  'Image Server': 1,
  'The image server is ready': 2,
  'The image server is not ready': 3,
  'Data Updater': 4,
  'Waiting for a fresh display image': 5,
  'The display image is up to date': 6,
  // interfaces.ts
  'Kindle Image URL': 7,
  'The address the Kindle fetches display.png from — set it as BASE in the Kindle update script': 24,
  // actions/configure.ts
  'Display Theme': 8,
  "- Plain: block height, two exchange rates and a quote fetched from bitcoin-quotes.com\n- Onchain: the latest block, fee estimates and the next mempool blocks\n- Lightning: Lightning network capacity, nodes and channels, which need Mempool's Lightning explorer enabled\n- Mining: the latest block, unconfirmed transactions, the next difficulty adjustment and the week's top mining pools\n- Random: one of the four, picked at random on every refresh": 9,
  Plain: 10,
  Onchain: 11,
  Lightning: 12,
  Random: 13,
  'Primary Exchange Rate': 14,
  'The first Bitcoin price shown on the display.\n- USD: US dollar\n- EUR: euro\n- GBP: British pound\n- CHF: Swiss franc\n- CAD: Canadian dollar\n- AUD: Australian dollar\n- JPY: Japanese yen': 15,
  'Secondary Exchange Rate': 16,
  'The second Bitcoin price shown on the display.\n- USD: US dollar\n- EUR: euro\n- GBP: British pound\n- CHF: Swiss franc\n- CAD: Canadian dollar\n- AUD: Australian dollar\n- JPY: Japanese yen': 17,
  'Update Interval': 18,
  "How often fresh data is fetched from Mempool and a new display image rendered. The Kindle downloads the image on its own schedule, every five minutes with the upstream update script's default, so an interval longer than the Kindle's leaves it showing the same image more than once.": 19,
  Configure: 20,
  'Adjust display theme, exchange rates, and update interval': 21,
  seconds: 22,
  Mining: 23,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
