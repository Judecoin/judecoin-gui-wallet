!cd "../../.."
Unicode true
RequestExecutionLevel user
SetCompressor /SOLID lzma

!include "MUI2.nsh"

Name "Jude Wallet GUI 4.0.1"
OutFile "dist/electron/Packaged/Jude-Wallet-gui-4.0.1-Windows-x64.exe"
InstallDir "$LOCALAPPDATA\Programs\Jude Wallet"
InstallDirRegKey HKCU "Software\Jude Wallet" "InstallDir"

Icon "src-electron/icons/icon.ico"
UninstallIcon "src-electron/icons/icon.ico"

VIProductVersion "4.0.1.0"
VIAddVersionKey "ProductName" "Jude Wallet GUI"
VIAddVersionKey "FileDescription" "Jude Wallet GUI Installer"
VIAddVersionKey "FileVersion" "4.0.1"
VIAddVersionKey "ProductVersion" "4.0.1"

!define MUI_ABORTWARNING
!define MUI_ICON "src-electron/icons/icon.ico"
!define MUI_UNICON "src-electron/icons/icon.ico"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!define MUI_FINISHPAGE_RUN "$INSTDIR\jude-wallet-gui.exe"
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"
!insertmacro MUI_LANGUAGE "English"

Section "Jude Wallet GUI" SEC_MAIN
  ; Clean up the previous flat 4.0.0 installation layout.
  Delete "$INSTDIR\chrome_100_percent.pak"
  Delete "$INSTDIR\chrome_200_percent.pak"
  Delete "$INSTDIR\d3dcompiler_47.dll"
  Delete "$INSTDIR\dxcompiler.dll"
  Delete "$INSTDIR\dxil.dll"
  Delete "$INSTDIR\ffmpeg.dll"
  Delete "$INSTDIR\icudtl.dat"
  Delete "$INSTDIR\jude-wallet-gui.exe"
  Delete "$INSTDIR\libEGL.dll"
  Delete "$INSTDIR\libGLESv2.dll"
  Delete "$INSTDIR\LICENSE.electron.txt"
  Delete "$INSTDIR\LICENSES.chromium.html"
  Delete "$INSTDIR\resources.pak"
  Delete "$INSTDIR\snapshot_blob.bin"
  Delete "$INSTDIR\Uninstall.exe"
  Delete "$INSTDIR\v8_context_snapshot.bin"
  Delete "$INSTDIR\vk_swiftshader.dll"
  Delete "$INSTDIR\vk_swiftshader_icd.json"
  Delete "$INSTDIR\vulkan-1.dll"
  RMDir /r "$INSTDIR\locales"
  RMDir /r "$INSTDIR\resources"

  ; Keep the complete Electron application together under runtime.
  SetOutPath "$INSTDIR\runtime"
  File /r /x "$PLUGINSDIR" "dist/electron/Packaged/win-unpacked/*"
  WriteUninstaller "$INSTDIR\runtime\Uninstall.exe"

  ; Leave only the requested launch points and icon at the top level.
  SetOutPath "$INSTDIR"
  File "packaging/windows/organized/launchers/jude-wallet-gui.exe"
  File "packaging/windows/organized/launchers/judecoind.exe"
  File "packaging/windows/organized/launchers/judecoin-wallet-rpc.exe"
  File /oname=Jude-Wallet.ico "src-electron/icons/icon.ico"

  CreateDirectory "$SMPROGRAMS\Jude Wallet"
  CreateShortcut "$SMPROGRAMS\Jude Wallet\Jude Wallet.lnk" "$INSTDIR\jude-wallet-gui.exe" "" "$INSTDIR\Jude-Wallet.ico"
  CreateShortcut "$SMPROGRAMS\Jude Wallet\卸载 Jude Wallet.lnk" "$INSTDIR\runtime\Uninstall.exe"
  CreateShortcut "$DESKTOP\Jude Wallet.lnk" "$INSTDIR\jude-wallet-gui.exe" "" "$INSTDIR\Jude-Wallet.ico"

  WriteRegStr HKCU "Software\Jude Wallet" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "DisplayName" "Jude Wallet GUI 4.0.1"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "DisplayIcon" "$INSTDIR\Jude-Wallet.ico"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "DisplayVersion" "4.0.1"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "UninstallString" '"$INSTDIR\runtime\Uninstall.exe"'
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "NoModify" 1
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet" "NoRepair" 1
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\Jude Wallet.lnk"
  RMDir /r "$SMPROGRAMS\Jude Wallet"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\Jude Wallet"
  DeleteRegKey HKCU "Software\Jude Wallet"
  Delete "$INSTDIR\jude-wallet-gui.exe"
  Delete "$INSTDIR\judecoind.exe"
  Delete "$INSTDIR\judecoin-wallet-rpc.exe"
  Delete "$INSTDIR\Jude-Wallet.ico"
  RMDir /r "$INSTDIR\runtime"
  RMDir "$INSTDIR"
SectionEnd
