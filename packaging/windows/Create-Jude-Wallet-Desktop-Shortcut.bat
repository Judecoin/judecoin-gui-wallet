@echo off
setlocal
set "APP_DIR=%~dp0"
set "APP_EXE=%APP_DIR%jude-wallet-gui.exe"
set "APP_ICON=%APP_DIR%Jude-Wallet.ico"

if not exist "%APP_EXE%" (
  echo jude-wallet-gui.exe was not found in this folder.
  pause
  exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$w=New-Object -ComObject WScript.Shell; $s=$w.CreateShortcut([Environment]::GetFolderPath('Desktop')+'\Jude Wallet.lnk'); $s.TargetPath='%APP_EXE%'; $s.WorkingDirectory='%APP_DIR%'; $s.IconLocation='%APP_ICON%'; $s.Save()"

if errorlevel 1 (
  echo Failed to create the desktop shortcut.
  pause
  exit /b 1
)

echo Jude Wallet desktop shortcut created successfully.
pause
