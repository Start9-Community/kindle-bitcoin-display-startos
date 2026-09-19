<p align="center">
  <img src="icon.svg" alt="Kindle Bitcoin Display Logo" width="21%">
</p>

# Kindle Bitcoin Display on StartOS

> Everything not listed in this document should behave the same as upstream
> Kindle Status Display. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

Kindle Bitcoin Display renders a Bitcoin status page — block height, exchange rates,
fees, mempool blocks, mining pools, Lightning statistics — to a grayscale PNG
that a jailbroken Kindle fetches and shows. This package builds the upstream
server, points it at the Mempool service on the same box, replaces its cron
job with a daemon, and exposes its settings as an action. See
[the upstream project](https://github.com/dennisreimann/kindle-display) for the
application itself.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The image is built by this repo's `Dockerfile` from `upstream/server/` — a git
submodule pinned to the upstream release — on a `node:24-slim` base with
`firefox-esr`, `pngcrush` and `psmisc`, for x86_64 and aarch64. The upstream
Express server, Pug views and `cron.sh` screenshot pipeline run unmodified;
`docker/` adds the two scripts the package needs.

One subcontainer, `main`, runs two daemons:

| Daemon    | Command                                | Purpose                                                                                          |
| --------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `web`     | `docker/entrypoint.sh` → `npm start`   | The Express server on 3030: `display.png` for the Kindle, and the page it is rendered from.       |
| `updater` | `docker/entrypoint.sh` → `updater-loop.sh` | Runs upstream `cron.sh` — fetch data from Mempool, screenshot the page with headless Firefox, grayscale it — once at start and then every update interval. Requires `web`. |

`docker/entrypoint.sh` seeds an empty `data.json` on the volume so the server
does not 500 before the first update, and truncates the image's `.env` so that
configuration comes only from the daemon environment.

## Volume and Data Layout

One volume, `main`, mounted at `/app/data` — upstream's `server/data/`
directory.

| File             | Contents                                                             |
| ---------------- | -------------------------------------------------------------------- |
| `store.json`     | This package's settings (below).                                     |
| `data.json`      | The last data fetched from Mempool, written by `data.mjs` each cycle. |
| `screenshot.png` | The last raw Firefox screenshot.                                     |
| `display.png`    | The grayscale image the Kindle fetches.                              |

## File Models

One model, `store.json`: the display theme, the two exchange-rate currencies
and the update interval. It is seeded with defaults at install and rewritten
only by **Configure**. Every key is re-asserted on every start as the daemons'
environment (`DISPLAY_THEME`, `DISPLAY_RATE1`, `DISPLAY_RATE2`,
`UPDATE_INTERVAL`), so a hand edit takes effect on the next start and survives
until the action is next run.

Upstream reads its settings from a `.env` file; the package empties that file
at every start and delivers the same variables through the environment, with
`MEMPOOL_BASE_URL` resolved from the Mempool dependency's bridge address and
`DISPLAY_SERVER_PORT` fixed at 3030.

## Dependencies

- **Mempool** (required, running, `webui` health check) — every figure on the
  display except the quote comes from its REST API over the container bridge:
  blocks, prices, fees, mempool blocks, mining pools, difficulty adjustment,
  Lightning statistics. The Lightning figures need Mempool's own Lightning
  explorer enabled; without it those requests 404 and the lightning theme
  renders without them.

## Network Access and Interfaces

| Interface id | Type  | Internal port | Protocol   | Serves                                                                     |
| ------------ | ----- | ------------- | ---------- | -------------------------------------------------------------------------- |
| `ui`         | `api` | 3030          | plain HTTP | `/display.png` for the Kindle; `/`, `/<theme>` and `/screenshot.png` are the page it is rendered from, viewable in a browser as a preview. |

Its consumer is the Kindle, not a browser, which is why it is an `api`
interface named **Kindle Image URL** rather than a `ui` with a launch button.
The binding is deliberately plain HTTP with no TLS variant (`protocol: null`,
`secure: { ssl: false }`, `addSsl: null`): the Kindle fetches the image with
BusyBox `wget`, which cannot speak TLS or validate the StartOS certificate, so
an HTTPS-only address would leave the device with nothing to show. The
Interfaces tab therefore lists `http://` addresses only, and nothing on this
interface is secret.

Outbound, the updater reaches Mempool over the bridge and, for the plain and
random themes, fetches a quote from `bitcoin-quotes.com` on the public
internet directly.

## Installation and First-Run Flow

Nothing is asked of the user. Install seeds `store.json` with the plain theme,
USD/EUR and a 300 s interval; the first start runs an update immediately, so
`display.png` exists within about fifteen seconds of Mempool being reachable.
The Kindle-side setup — jailbreak, `update.sh` pointed at this interface's
address — is upstream's and is not automated.

## Actions

### `configure` — Configure

- **When to run it:** to change the theme (plain, onchain, lightning, mining, random), either exchange-rate currency, or how often the display refreshes.
- **What it changes:** `store.json`, then the daemons' environment.
- **Cost:** both daemons restart, and the updater runs a fresh cycle at once, so the new display is ready within about fifteen seconds.
- **Repeat safety:** idempotent.
- **Outputs:** none.

## Tasks

None. The service is never held on a prompt.

## Health Checks

- **`web` — Image Server.** Port 3030 listening. Not listening past the first few seconds means `npm start` died; read the log.
- **`updater` — Data Updater.** `success` while `display.png` is newer than twice the update interval; `loading` ("Waiting for a fresh display image") otherwise. Stuck on `loading` means the update cycle is failing: `data.mjs` cannot reach Mempool (the daemon log shows `Fetched data for block height unknown`) or Firefox is failing to screenshot (`Screenshot failed - keeping previous display`). The check watches the image, not the data, because `cron.sh` keeps the previous image on a screenshot failure — which is exactly what the Kindle would keep showing.

## Backups and Restore

Strategy: the `main` volume copied wholesale — settings, last data and last
images, a few hundred kilobytes. A restored instance comes back stopped with
its settings intact and needs Mempool running before it starts; nothing has to
be re-entered.

## Limitations and Differences

1. **The interface is plain HTTP only**, for the Kindle's sake (see Network Access and Interfaces), and there is no browser UI to launch — the page behind it is a preview at most. Use it on the LAN.
2. **Cron is replaced by the `updater` daemon**, so the interval is a setting rather than a crontab line, and the first update runs at start instead of at the next minute.
3. **Mempool is required rather than optional.** Upstream falls back to the public `mempool.space` when no local instance is configured; this package always uses the local service.
4. **The quote for the plain and random themes is fetched from `bitcoin-quotes.com`** over the clearnet, as upstream does; there is no proxy option.
5. **The Lightning figures depend on Mempool's Lightning explorer** being enabled there; the package cannot enable it.

---

## Quick Reference for AI Consumers

```yaml
package_id: 'kindle-bitcoin-display'
image: built from ./Dockerfile
architectures: [x86_64, aarch64]
subcontainers: [main]
volumes:
  main: /app/data
file_models:
  - store.json
startos_managed_env_vars:
  - DISPLAY_SERVER_PORT
  - DISPLAY_THEME
  - DISPLAY_RATE1
  - DISPLAY_RATE2
  - MEMPOOL_BASE_URL
  - UPDATE_INTERVAL
dependencies: [mempool]
interfaces:
  ui: { type: api, port: 3030 }
actions:
  - configure
tasks: []
health_checks:
  - web
  - updater
```
