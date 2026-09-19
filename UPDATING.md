# Updating the upstream version

Upstream is the `upstream/` git submodule (<https://github.com/dennisreimann/kindle-display>),
built by this repo's `Dockerfile` from `upstream/server/`; there is no `dockerTag`. The upstream
version is the `version` field of `upstream/server/package.json`, which matches the release tag.

## Determining the upstream version

```sh
gh release view -R dennisreimann/kindle-display --json tagName -q .tagName
git -C upstream fetch --tags && git -C upstream tag --sort=-v:refname | head -5
```

The pin is the submodule's recorded commit in this repo's tree.

## Applying the bump

1. Move the submodule to the new tag and stage the pointer:

   ```sh
   git -C upstream fetch --tags
   git -C upstream checkout vX.Y.Z
   git add upstream
   ```

2. Set `version` in `startos/versions/current.ts` to `X.Y.Z:0` and rewrite `releaseNotes` in all
   five locales. A packaging-only change keeps the upstream half and bumps the revision instead.
3. Diff `upstream/server` between the two tags for what the package relies on: the `THEMES`
   list in `helpers.mjs` (mirrored in `startos/fileModels/store.json.ts` and
   `startos/actions/configure.ts`), the variables `data.mjs` and `cron.sh` read
   (`MEMPOOL_BASE_URL`, `DISPLAY_THEME`, `DISPLAY_RATE1`, `DISPLAY_RATE2`,
   `DISPLAY_SERVER_PORT`), the Mempool endpoints `data.mjs` calls (the dependency's
   `versionRange` in `startos/dependencies.ts` must cover them), the `data/` paths `cron.sh`
   writes, and `Dockerfile`'s apt packages against upstream's own `Dockerfile`.
4. Rebuild and install on a StartOS box with Mempool running; confirm both health checks go green,
   `display.png` renders, and **Configure** still restarts the daemons with the new settings.
