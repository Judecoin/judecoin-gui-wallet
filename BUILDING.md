# Building

Set up the supported versions of npm/node/etc.:

    nvm use

## Install dependencies

    pnpm install --frozen-lockfile

The GitHub web-upload source package excludes backend executables. Before
running release checks or building an installer, restore the four verified
files described in `BACKEND-PLACEMENT.md`.

## Check Linux release inputs

    pnpm test:linux

## Linux x86_64

Build on Linux:

    pnpm exec quasar build -m electron -T linux -s
    cd dist/electron/UnPackaged
    pnpm install --prod --ignore-scripts --ignore-workspace
    cd ../../..
    pnpm exec electron-builder --config electron-builder-final-linux.yml --linux --x64 --publish never

The release outputs AppImage and deb packages. The packaged runtime contains
only the official v4.0.0 Linux `judecoind` and `judecoin-wallet-rpc` binaries.

## Windows x64

See `FINAL-BUILD.md` for the existing Windows release process.
