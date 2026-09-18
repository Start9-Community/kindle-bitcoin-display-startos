# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **The application is the `upstream/` submodule and is never edited here.** The `Dockerfile`
  copies `upstream/server/` in; fixes to the server go to
  <https://github.com/dennisreimann/kindle-display>, and this repo moves the pin. Bumps go through
  `UPDATING.md`.
- **The `ui` interface must stay plain HTTP and `type: 'api'`** — `protocol: null`,
  `secure: { ssl: false }`, `addSsl: null` in `startos/interfaces.ts`. The Kindle fetches
  `display.png` with BusyBox `wget`, which has no TLS; switching to `protocol: 'http'` publishes an
  HTTPS-only address the device cannot use, and `type: 'ui'` adds a launch button for a page nobody
  is meant to open.
- **`docker/entrypoint.sh` truncates the image's `.env` on every start.** Upstream's `cron.sh`
  `source`s that file, so a value left in it overrides the daemon environment; settings reach the
  app only as `DISPLAY_*`, `MEMPOOL_BASE_URL` and `UPDATE_INTERVAL` from `main.ts`.
- **The theme list is duplicated from upstream's `helpers.mjs` `THEMES`** in
  `startos/fileModels/store.json.ts` and `startos/actions/configure.ts`; a submodule bump that
  adds or renames a theme has to land in both.
- **The `.dockerignore` keeps the build context to `Dockerfile`, `docker/` and the submodule**,
  and excludes `upstream/server/.env` so no local configuration is baked into the image.
