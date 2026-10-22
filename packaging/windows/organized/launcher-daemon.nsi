!cd "../../.."
Unicode true
SilentInstall silent
RequestExecutionLevel user
Icon "src-electron/icons/icon.ico"
OutFile "packaging/windows/organized/launchers/judecoind.exe"

!include "FileFunc.nsh"

Section
  ${GetParameters} $R0
  SetOutPath "$EXEDIR\runtime\resources\bin"
  ExecWait '"$EXEDIR\runtime\resources\bin\judecoind.exe" $R0' $0
  SetErrorLevel $0
SectionEnd
