# Kindle Bitcoin Display

## Documentation

- [Kindle Status Display README](https://github.com/dennisreimann/kindle-display) — the upstream guide: jailbreaking the Kindle, installing the update script on it, and the themes.

## What you get on StartOS

A web server that renders a Bitcoin status page — block height, exchange rates, fees, mempool
blocks, mining pools, Lightning statistics, a quote — to a grayscale image your Kindle fetches
and shows. Everything on it comes from the **Mempool** service on this server, so the display
never talks to a public explorer; the quote on the plain theme is the one thing fetched from the
internet.

The **Kindle Image URL** interface is served over plain `http://`. That is deliberate: the
Kindle's `wget` cannot use HTTPS, so an encrypted address would leave it with nothing to show.
Keep it on your LAN. There is nothing to log in to and no app to open — the interface exists for
the Kindle.

## Getting set up

1. Make sure **Mempool** is installed and running — Kindle Bitcoin Display starts only while it is.
2. Start Kindle Bitcoin Display. The first image is ready about fifteen seconds later. To preview
   it, open the **Kindle Image URL** address in a browser with `/display.png` added.
3. Run **Configure** if you want a different theme, other currencies, or a different refresh
   interval.
4. On the Kindle, follow the upstream README to install `update.sh`, and set its `BASE` to the
   **Kindle Image URL** address shown on this service's page.

## Using Kindle Bitcoin Display

### Themes

- **Plain** — block height, two exchange rates and a quote.
- **Onchain** — block height, the latest block, fee estimates and the next mempool blocks.
- **Lightning** — Lightning network statistics. These appear only if Mempool's own Lightning
  explorer is enabled (**Enable Lightning** on the Mempool service); otherwise the theme shows
  the block height and rates alone.
- **Mining** — the latest block, unconfirmed transactions, the next difficulty adjustment and
  the top mining pools of the week.
- **Random** — a different one of the four on every refresh.

### Actions

- **Configure** — choose the theme, the two currencies shown as exchange rates (USD, EUR, GBP,
  CHF, CAD, AUD or JPY), and how many seconds pass between refreshes (60 to 3600). The display
  re-renders right away.
