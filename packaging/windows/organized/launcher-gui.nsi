!cd "../../.."
Unicode true
SilentInstall silent
RequestExecutionLevel user
Icon "src-electron/icons/icon.ico"
OutFile "packaging/windows/organized/launchers/jude-wallet-gui.exe"

!include "FileFunc.nsh"

Section
  ${GetParameters} $R0
  SetOutPath "$EXEDIR\runtime"
  Exec '"$EXEDIR\runtime\jude-wallet-gui.exe" $R0'
SectionEnd
