# Judecoin Electron GUI Wallet

### Introduction

Judecoin is a private cryptocurrency based on Monero. Judecoin aims to provide a private data transmission layer using a second layer of Service Nodes.
More information on the project can be found on the [website](https://www.judecoin.info/). Judecoin is an open source project, and we encourage contributions from anyone with something to offer.

### About this project

This is the new Electron GUI for Judecoin. It is open source and completely free to use without restrictions, anyone may create an alternative implementation of the Judecoin Electron GUI that uses the protocol and network in a compatible manner.

Please submit any changes as pull requests to the development branch, all changes are assessed in the development branch before being merged to master, release tags are considered stable builds for the GUI.

#### Pre-requisites

- Download latest [judecoind](https://github.com/Judecoin/judecoin/releases)
- Extract the Judecoin binaries to a folder

#### Commands

```
nvm use 14.14.0 # check .nvmrc for the current version required
npm install -g @quasar/cli
git clone https://github.com/Judecoin/judecoin-gui-wallet.git
