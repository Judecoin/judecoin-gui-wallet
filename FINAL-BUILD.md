# Jude Wallet 4.0.0 final Windows build

The source archive intentionally excludes `node_modules`, `.quasar`, `dist`,
package-manager caches, logs, and generated installers.

## Requirements

- Node.js 20 or newer
- pnpm
- A Windows-capable Electron Builder environment

## Build

```sh
pnpm install --frozen-lockfile
pnpm exec quasar build -m electron --publish never
cd dist/electron/UnPackaged
pnpm install --prod --ignore-scripts --ignore-workspace
cd ../../..
pnpm exec electron-builder --config electron-builder-final.yml --win --x64 --publish never
```
