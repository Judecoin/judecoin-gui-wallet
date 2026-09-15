#!/usr/bin/env bash

# This script needs to run on an *actual* Mac with proper signing keys loaded.  It won't work in CI
# because Apple codesigning is unbelievably flakey.

set -euo pipefail

if ! [ -x bin/judecoind ] || ! [ -x bin/judecoin-wallet-rpc ]; then
    echo "Place native macOS judecoind and judecoin-wallet-rpc executables in bin/ first." >&2
    exit 1
fi

export NODE_OPTIONS=--openssl-legacy-provider

npm run build
