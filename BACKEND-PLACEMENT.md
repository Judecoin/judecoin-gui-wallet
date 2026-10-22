# Backend placement

The GitHub web-upload source directory intentionally excludes executable
backends. Restore the following files before release checks or installer
builds:

```text
bin/linux/judecoind
bin/linux/judecoin-wallet-rpc
bin/win32/judecoind.exe
bin/win32/judecoin-wallet-rpc.exe
```

Their expected SHA-256 values are recorded in `BACKEND-SHA256SUMS.txt`.
Run the following after placing the files:

```sh
shasum -a 256 -c BACKEND-SHA256SUMS.txt
node scripts/check-linux-release.js
```

Do not replace these files with similarly named binaries from an unrelated
release.
