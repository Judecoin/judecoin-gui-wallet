@echo off
setlocal

cd /d "%~dp0\..\..\.."
if errorlevel 1 exit /b 1

where pnpm >nul 2>nul || (
  echo ERROR: pnpm was not found in PATH.
  exit /b 1
)
where makensis >nul 2>nul || (
  echo ERROR: makensis was not found in PATH.
  exit /b 1
)

call pnpm install --frozen-lockfile || exit /b 1
call pnpm exec quasar build -m electron --publish never -T win -A x64 || exit /b 1

if not exist "dist\electron\Packaged\win-unpacked\jude-wallet-gui.exe" (
  echo ERROR: Quasar did not create dist\electron\Packaged\win-unpacked\jude-wallet-gui.exe.
  exit /b 1
)

if not exist "packaging\windows\organized\launchers" mkdir "packaging\windows\organized\launchers"
if not exist "dist\electron\Packaged" mkdir "dist\electron\Packaged"

makensis "packaging\windows\organized\launcher-gui.nsi" || exit /b 1
makensis "packaging\windows\organized\launcher-daemon.nsi" || exit /b 1
makensis "packaging\windows\organized\launcher-rpc.nsi" || exit /b 1
makensis "packaging\windows\organized\installer.nsi" || exit /b 1

echo.
echo Created dist\electron\Packaged\Jude-Wallet-gui-4.0.0-Windows-x64.exe
exit /b 0
