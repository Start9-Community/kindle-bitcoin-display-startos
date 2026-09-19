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
  'Which layout to render on the Kindle: plain, onchain, lightning, mining, or a random pick each refresh': 9,
  Plain: 10,
  Onchain: 11,
  Lightning: 12,
  Random: 13,
  'Primary Exchange Rate': 14,
  'Currency for the primary rate. Fetched from Mempool.': 15,
  'Secondary Exchange Rate': 16,
  'Currency for the secondary rate.': 17,
  'Update Interval': 18,
  'Seconds between scheduled data updates': 19,
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
