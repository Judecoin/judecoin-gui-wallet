# Judecoin Electron GUI Wallet

### Introduction

Judecoin is a private cryptocurrency based on Monero. Judecoin aims to provide a private data transmission layer using a second layer of Service Nodes.
More information on the project can be found on the [website](https://www.judecoin.info/). Judecoin is an open source project, and we encourage contributions from anyone with something to offer.

### About this project

This is the new Electron GUI for Judecoin. It is open source and completely free to use without restrictions, anyone may create an alternative implementation of the Judecoin Electron GUI that uses the protocol and network in a compatible manner.

Please submit changes as pull requests to the `main` branch. Release tags are
considered stable GUI builds.

#### Pre-requisites

- Node.js version from `.nvmrc`
- pnpm
- Official Judecoin v4.0.0 `judecoind` and `judecoin-wallet-rpc` binaries for
  the target operating system

#### Commands

```
git clone https://github.com/Judecoin/judecoin-gui-wallet.git
cd judecoin-gui-wallet
nvm use
corepack enable
pnpm install --frozen-lockfile
```

Before running release checks or building installers, place the verified core
binaries as described in [BACKEND-PLACEMENT.md](BACKEND-PLACEMENT.md).

For dev:

```
pnpm dev
```

For building:

See [BUILDING.md](BUILDING.md) for the Windows x64 and Linux x86_64 build and
verification steps.

### Adding language support

Adding a new language is fairly simple.

1. Duplicate the language file `src/i18n/en-us.js` and rename it to the relevant language code.
2. Translate all the strings in that duplicated file. Take note that capitalization matters.
   - The translated string must go in-between the quotes (`""`)
     - E.G `all: "ALL"` -> `all: "ВСЕ"`
   - If possible try and stick to the general string formatting already present.
     - E.G if there is a new line then try and keep that in your translation.
     - The same goes for the pipe character `|`. **DO NOT REMOVE IT**.
   - Please don't translate strings inside `{}` brackets. They are meant as placeholders for other values.
     - Some examples include `{type}` and `{count}`.
     - E.G if you have a string `A {index}` then you may translate it as `B {index}` or `{index} B` depending on how the string makes sense in your language. You are allowed to reposition the placeholders for the string to make sense **BUT DO NOT DELETE OR REPLACE THE PLACEHOLDERS WITH OTHER VALUES**
3. Add the language to the `languages` array in `src/i18n/index.js`. The `flag` property is the [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) of a country.
   - **NOTE: DO NOT ADD THE LANGUAGE TO `export default`**. Dynamic language loading is handled by the application.
4. Add your language locale to Vue Timeago. Add it in `src/plugins/timeago.js` under `locales`.
   - Ref: https://github.com/egoist/vue-timeago#update-locale-globally
5. Submit a PR with your changes.
