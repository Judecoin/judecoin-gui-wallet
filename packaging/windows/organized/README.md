# Organized Windows installer

This directory contains the reproducible NSIS scripts used for the organized
Windows installation layout.

The installed top level contains only:

- `jude-wallet-gui.exe`
- `Jude-Wallet.ico`
- `judecoind.exe`
- `judecoin-wallet-rpc.exe`
- `runtime/`

The three top-level executables are small launchers. The full Electron runtime
and the real executables remain under `runtime/` so required DLL, PAK, locale,
license, and resource files are not deleted.

## Requirements

- Windows x64
- Node.js 20 or newer
- pnpm
- NSIS 3 with `makensis` available in `PATH`

## Build

From a Windows command prompt, run:

```bat
packaging\windows\organized\build-organized-installer.cmd
```

The resulting unsigned installer is written to:

```text
dist\electron\Packaged\Jude-Wallet-gui-4.0.0-Windows-x64.exe
```
