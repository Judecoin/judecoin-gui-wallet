!cd "../../.."
Unicode true
SilentInstall silent
RequestExecutionLevel user
Icon "src-electron/icons/icon.ico"
OutFile "packaging/windows/organized/launchers/judecoin-wallet-rpc.exe"

!include "FileFunc.nsh"

Section
  ${GetParameters} $R0
  SetOutPath "$EXEDIR\runtime\resources\bin"
  ExecWait '"$EXEDIR\runtime\resources\bin\judecoin-wallet-rpc.exe" $R0' $0
  SetErrorLevel $0
SectionEnd
