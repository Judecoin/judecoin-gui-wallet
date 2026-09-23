export default {
  nav: {
    send: "보내기",
    addressBook: "주소록",
    receive: "받기",
    transactions: "거래 내역",
    staking: "스테이킹",
    advanced: "고급",
    settings: "설정",
    addRecipient: "받는 사람 추가",
    addDescription: "설명 추가",
    walletSynced: "지갑 동기화 완료",
    walletSyncing: "지갑 동기화 중 ({pct}%)",
    daemonSynced: "데몬 동기화 완료 ({height})",
    daemonSyncing: "데몬 동기화 중 ({pct}%)",
    networkStatus: "네트워크 상태",
    remoteNode: "원격 노드",
    localNode: "로컬 노드"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "고급",
    all: "전체",
    back: "뒤로",
    browse: "찾아보기",
    cancel: "취소",
    change: "변경",
    check: "확인",
    clear: "지우기",
    close: "닫기",
    contacts: "연락처",
    copyAddress: "주소 복사",
    copyData: "데이터 복사",
    copySignature: "서명 복사",
    createWallet: "지갑 생성",
    decrypt: "복호화",
    delete: "삭제",
    edit: "편집",
    export: "내보내기",
    generate: "생성",
    import: "가져오기",
    importWallet: "지갑 가져오기 | 지갑 가져오기",
    ons: "JUDE 이름 서비스",
    max: "최대",
    min: "최소",
    next: "다음",
    openWallet: "지갑 열기",
    purchase: "구매",
    receive: "받기",
    registerServiceNode: "서비스 노드 등록",
    renew: "갱신",
    rescan: "재스캔",
    restoreWallet: "지갑 복원",
    save: "저장",
    saveTxNotes: "트랜잭션 메모 저장",
    selectLocation: "위치 선택",
    selectWalletFile: "지갑 파일 선택",
    send: "보내기",
    sendCoins: "코인 보내기",
    serviceNode: "서비스 노드",
    settings: "설정",
    showQRCode: "QR 코드 보기",
    showTxDetails: "트랜잭션 상세 보기",
    sign: "서명",
    stake: "스테이킹",
    sweepAll: "전액 스윕",
    unlock: "잠금 해제",
    update: "업데이트",
    verify: "검증",
    addRecipient: "수신자 추가",
    viewOnExplorer: "탐색기에서 보기"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "확인",
      cancel: "취소",
      open: "열기"
    },

    // Dialogs
    banPeer: {
      title: "피어 차단",
      peerDetailsTitle: "피어 상세 정보",
      message:
        "피어를 차단할 시간을 초 단위로 입력하세요.\n기본값 3600 = 1시간.",
      ok: "피어 차단"
    },
    copyAddress: {
      title: "주소 복사",
      message:
        "이 주소에 연결된 결제 ID가 있습니다.\n결제 ID를 별도로 복사하세요."
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "{type} 복사",
      message:
        "개인 키를 누구에게 보내는지 주의하세요. 개인 키로 자금을 통제할 수 있습니다.",
      seedWords: "시드 단어",
      viewKey: "뷰 키",
      spendKey: "스펜드 키"
    },
    deleteWallet: {
      title: "지갑 삭제",
      message:
        "정말로 지갑을 삭제하시겠습니까?\n개인 키를 백업했는지 확인하세요.\n이 작업은 되돌릴 수 없습니다!",
      ok: "삭제"
    },
    exit: {
      title: "종료",
      message: "정말로 종료하시겠습니까?",
      ok: "종료"
    },
    exportTransfers: {
      title: "거래 내역 CSV 내보내기",
      message: "거래 내역을 내보내시겠습니까?",
      export: "내보내기"
    },
    keyImages: {
      title: "키 이미지 {type}",
      message: "키 이미지를 {type}하시겠습니까?",
      export: "내보내기",
      import: "가져오기"
    },
    onsUpdate: {
      title: "ONS 레코드 업데이트",
      message: "ONS 레코드를 업데이트하시겠습니까?",
      ok: "업데이트"
    },
    noPassword: {
      title: "비밀번호 미설정",
      message: "비밀번호 없이 지갑을 생성하시겠습니까?",
      ok: "예"
    },
    password: {
      title: "비밀번호",
      message: "계속하려면 지갑 비밀번호를 입력하세요."
    },
    purchase: {
      title: "이름 구매",
      message: "이름을 구매하시겠습니까?",
      ok: "구매"
    },
    renew: {
      title: "이름 갱신",
      message: "이름을 갱신하시겠습니까?",
      ok: "갱신"
    },
    registerServiceNode: {
      title: "서비스 노드 등록",
      message: "서비스 노드를 등록하시겠습니까?",
      ok: "등록"
    },
    rescan: {
      title: "지갑 재스캔",
      message:
        "경고: 수신자 주소 등 이전 트랜잭션에 대한\n일부 정보가 손실됩니다.",
      ok: "재스캔"
    },
    restart: {
      title: "재시작",
      message:
        "변경 사항을 적용하려면 재시작이 필요합니다. 지금 재시작하시겠습니까?",
      ok: "재시작"
    },
    showPrivateKeys: {
      title: "시드와 키 보기",
      message: "개인 키를 보시겠습니까?",
      ok: "보기"
    },
    signature: {
      title: "서명",
      message: "아래에서 기본 주소의 개인 키로 서명된 데이터를 복사하세요"
    },
    stake: {
      title: "스테이킹",
      message: "스테이킹하시겠습니까?",
      ok: "스테이킹"
    },
    sweepAll: {
      title: "전액 스윕",
      message: "전액 스윕을 실행하시겠습니까?",
      ok: "전액 스윕"
    },
    sweepAllWarning: {
      title: "전액 스윕 경고",
      message:
        "자기 자신에게 트랜잭션을 보내 미사용 자금을 모두 합치려고 합니다. 지갑 잔액이 일시적으로 0으로 표시될 수 있으며, 10블록 후 자금이 잠금 해제되면 정상적으로 스테이킹할 수 있습니다.",
      ok: "계속"
    },
    switchWallet: {
      title: "지갑 전환",
      closeMessage: "현재 지갑을 닫으시겠습니까?",
      restartMessage:
        "지갑 RPC가 현재 동기화 중입니다. \n지갑을 전환하려면 애플리케이션을 재시작해야 합니다. \n동기화 진행 상황이 손실되며 블록체인을 다시 스캔해야 합니다.",
      restartWalletMessage:
        "지갑을 전환하려면 애플리케이션을 재시작해야 합니다. 현재 지갑을 닫고 재시작하시겠습니까?"
    },
    transactionDetails: {
      title: "트랜잭션 상세",
      ok: "닫기"
    },
    transfer: {
      title: "전송",
      message: "트랜잭션을 보내시겠습니까?",
      ok: "보내기"
    },
    confirmTransaction: {
      title: "트랜잭션 확인",
      sendTo: "보낼 주소",
      priority: "우선순위"
    },
    unlockConfirm: {
      title: "잠금 해제 확인",
      ok: "잠금 해제"
    },
    unlockServiceNode: {
      title: "서비스 노드 잠금 해제",
      confirmTitle: "잠금 해제 확인",
      message: "서비스 노드를 잠금 해제하시겠습니까?",
      ok: "잠금 해제"
    },
    unlockServiceNodeWarning: {
      title: "서비스 노드 잠금 해제 경고",
      message:
        "노드에서 부분 스테이킹을 해제하면 다른 참여자의 스테이킹도 해제됩니다. 공유 노드에서 스테이킹 중인 경우 운영자와 다른 참여자에게 스테이킹 해제를 알리는 것이 좋습니다.",
      ok: "계속"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "주소",
    amount: "금액",
    backupOwner: "백업 소유자",
    confirmPassword: "비밀번호 확인",
    daemonLogLevel: "데몬 로그 레벨",
    daemonP2pPort: "데몬 P2P 포트",
    data: "데이터",
    dataStoragePath: "데이터 저장 경로",
    decryptRecord: "레코드 복호화",
    exportTransfers: {
      exportDirectory: "CSV 내보내기 디렉토리"
    },
    filter: "필터",
    filterTransactionType: "트랜잭션 유형별 필터",
    internalWalletPort: "내부 지갑 포트",
    keyImages: {
      exportDirectory: "키 이미지 내보내기 디렉토리",
      importFile: "키 이미지 가져오기 파일"
    },
    limitDownloadRate: "다운로드 속도 제한",
    limitUploadRate: "업로드 속도 제한",
    onsType: "ONS 레코드 유형",
    localDaemonIP: "로컬 데몬 IP",
    localDaemonPort: "로컬 데몬 포트",
    lokinetFullAddress: "LOKINET 전체 주소",
    maxIncomingPeers: "최대 수신 피어",
    maxOutgoingPeers: "최대 송신 피어",
    message: "메시지",
    mnemonicSeed: "니모닉 시드",
    name: "이름",
    newWalletName: "새 지갑 이름",
    notes: "메모",
    optional: "선택 사항",
    owner: "소유자",
    password: "비밀번호",
    paymentId: "결제 ID",
    priority: "우선순위",
    remoteNodeHost: "원격 노드 호스트",
    remoteNodePort: "원격 노드 포트",
    restoreFromBlockHeight: "블록 높이에서 복원",
    restoreFromDate: "날짜에서 복원",
    seedLanguage: "시드 언어",
    serviceNodeCommand: "서비스 노드 명령어",
    serviceNodeKey: "서비스 노드 키",
    sessionId: "SESSION ID",
    signature: "서명",
    transactionId: "트랜잭션 ID",
    walletAddress: "지갑 주소",
    walletFile: "지갑 파일",
    walletLogLevel: "지갑 로그 레벨",
    walletName: "지갑 이름",
    walletRPCPort: "지갑 RPC 포트",
    walletStoragePath: "지갑 저장 경로",
    theme: "테마",
    privateViewKey: "개인 뷰 키",
    privateSpendKey: "개인 지출 키",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "새 비밀번호 확인",
    newPassword: "새 비밀번호",
    oldPassword: "이전 비밀번호",
    rescanFullBlockchain: "전체 블록체인 재스캔",
    rescanSpentOutputs: "사용된 출력 재스캔",
    transactionNotes: "트랜잭션 메모",
    chooseNetwork: "네트워크 선택",
    network: "네트워크"
  },
  footer: {
    ready: "준비 완료",
    scanning: "스캔 중",
    status: "상태",
    syncing: "동기화 중",
    remote: "원격",
    wallet: "지갑",
    updateRequired: "업데이트 필요"
  },
  menuItems: {
    cut: "잘라내기",
    copy: "복사",
    paste: "붙여넣기",
    selectAll: "모두 선택",
    about: "정보",
    changePassword: "비밀번호 변경",
    copyAddress: "주소 복사",
    copyBackupOwner: "백업 소유자 복사",
    copyLokinetAddress: "Lokinet 주소 복사",
    copyLokinetName: "Lokinet 이름 복사",
    copyName: "이름 복사",
    copyOwner: "소유자 복사",
    copyQR: "QR 코드 복사",
    copySeedWords: "시드 단어 복사",
    copySessionId: "Session ID 복사",
    copySpendKey: "스펜드 키 복사",
    copyServiceNodeKey: "서비스 노드 키 복사",
    copyTransactionId: "트랜잭션 ID 복사",
    copyViewKey: "뷰 키 복사",
    createNewWallet: "새 지갑 생성",
    deleteWallet: "지갑 삭제",
    exportTransfers: "거래 내역 내보내기",
    exit: "Jude GUI 지갑 종료",
    importOldGUIWallet: "이전 GUI에서 지갑 가져오기",
    manageKeyImages: "키 이미지 관리",
    openWallet: "지갑 열기",
    rescanWallet: "지갑 재스캔",
    restoreWalletFile: "파일에서 지갑 복원",
    restoreWalletSeed: "시드에서 지갑 복원",
    saveQR: "QR 코드를 파일로 저장",
    sendToThisAddress: "이 주소로 보내기",
    settings: "설정",
    showDetails: "상세 보기",
    showPrivateKeys: "시드와 키 보기",
    showQRCode: "QR 코드 보기",
    switchWallet: "지갑 전환",
    viewOnExplorer: "탐색기에서 보기"
  },
  notification: {
    positive: {
      addressCopied: "주소가 클립보드에 복사되었습니다",
      backupOwnerCopied: "백업 소유자가 클립보드에 복사되었습니다",
      bannedPeer: "{host}이(가) {time}까지 차단되었습니다",
      copied: "{item}이(가) 클립보드에 복사되었습니다",
      decryptedONSRecord: "{name}의 ONS 레코드가 성공적으로 복호화되었습니다",
      exportTransfers: "거래 내역이 {filename}(으)로 내보내졌습니다",
      itemSaved: "{item}이(가) {filename}에 저장되었습니다",
      keyImages: {
        exported: "키 이미지가 {filename}(으)로 내보내졌습니다",
        imported: "키 이미지를 가져왔습니다"
      },
      onsRecordUpdated: "ONS 레코드가 성공적으로 업데이트되었습니다",
      lokinetAddressCopied: "전체 Lokinet 주소가 복사되었습니다",
      lokinetNameCopied: "Lokinet 이름이 복사되었습니다",
      passwordUpdated: "비밀번호가 업데이트되었습니다",
      namePurchased: "이름이 성공적으로 구매되었습니다",
      nameRenewed: "이름이 성공적으로 갱신되었습니다",
      nameCopied: "이름이 클립보드에 복사되었습니다",
      ownerCopied: "소유자가 클립보드에 복사되었습니다",
      qrCopied: "QR 코드가 클립보드에 복사되었습니다",
      registerServiceNodeSuccess: "서비스 노드가 성공적으로 등록되었습니다",
      sendSuccess: "트랜잭션이 성공적으로 전송되었습니다",
      serviceNodeInfoFilled: "서비스 노드 키와 최소 금액이 입력되었습니다",
      sessionIdCopied: "Session ID가 클립보드에 복사되었습니다",
      signatureCopied: "서명이 클립보드에 복사되었습니다",
      signatureVerified: "서명이 검증되었습니다",
      stakeSuccess: "스테이킹에 성공했습니다",
      transactionNotesSaved: "트랜잭션 메모가 저장되었습니다",
      walletCopied: "지갑 주소가 클립보드에 복사되었습니다"
    },
    errors: {
      banningPeer: "피어 차단 오류",
      cannotAccessRemoteNode:
        "원격 노드에 접근할 수 없습니다. 다른 원격 노드를 시도하세요",
      changingPassword: "비밀번호 변경 오류",
      copyWalletFail: "지갑 복사에 실패했습니다",
      copyingPrivateKeys: "개인 키 복사 오류",
      dataPathNotFound: "데이터 저장 경로를 찾을 수 없습니다",
      decryptONSRecord: "{name}의 ONS 레코드 복호화에 실패했습니다",
      differentNetType: "원격 노드가 다른 네트워크 유형을 사용하고 있습니다",
      enterSeedWords: "시드 단어를 입력하세요",
      enterTransactionId: "트랜잭션 ID를 입력하세요",
      enterTransactionProof: "트랜잭션 증명을 입력하세요",
      enterWalletName: "지갑 이름을 입력하세요",
      enterName: "이름을 입력하세요",
      errorSavingItem: "{item} 저장 오류",
      exportTransfers: "거래 내역 내보내기 오류",
      failedServiceNodeUnlock: "서비스 노드 잠금 해제에 실패했습니다",
      failedToSetLanguage: "언어 설정 실패: {lang}",
      failedWalletImport: "지갑 가져오기에 실패했습니다",
      failedWalletOpen: "지갑 열기에 실패했습니다. 다시 시도하세요.",
      failedWalletRead: "지갑 읽기에 실패했습니다",
      internalError: "내부 오류",
      invalidAddress: "주소가 유효하지 않습니다",
      invalidAmount: "금액이 유효하지 않습니다",
      invalidBackupOwner: "백업 소유자 주소가 유효하지 않습니다",
      invalidNameLength: "이름은 1자 이상 64자 이하여야 합니다",
      invalidNameFormat: "이름에는 영숫자, 하이픈, 밑줄만 사용할 수 있습니다",
      invalidNameHypenNotAllowed:
        "이름은 영숫자 또는 밑줄로만 시작하거나 끝날 수 있습니다",
      invalidOldPassword: "이전 비밀번호가 잘못되었습니다",
      invalidOwner: "소유자 주소가 유효하지 않습니다",
      invalidPassword: "비밀번호가 잘못되었습니다",
      invalidPaymentId: "결제 ID가 유효하지 않습니다",
      invalidPrivateViewKey: "유효하지 않은 개인 뷰 키",
      invalidPrivateSpendKey: "잘못된 개인 지출 키",
      invalidPublicAddress: "유효하지 않은 공개 주소",
      invalidRestoreDate: "유효하지 않은 복원 날짜",
      invalidRestoreHeight: "유효하지 않은 복원 높이",
      invalidSeedLength: "유효하지 않은 시드 단어 길이",
      invalidServiceNodeCommand: "서비스 노드 등록 명령어를 입력하세요",
      invalidServiceNodeKey: "서비스 노드 키가 유효하지 않습니다",
      invalidSessionId: "Session ID가 유효하지 않습니다",
      invalidSignature: "유효하지 않은 서명",
      invalidWalletPath: "유효하지 않은 지갑 경로",
      keyImages: {
        exporting: "키 이미지 내보내기 오류",
        reading: "키 이미지 읽기 오류",
        importing: "키 이미지 가져오기 오류"
      },
      negativeAmount: "금액은 음수일 수 없습니다",
      newPasswordNoMatch: "새 비밀번호가 일치하지 않습니다",
      newPasswordSame: "새 비밀번호는 이전과 달라야 합니다",
      notEnoughBalance: "잠금 해제된 잔액이 부족합니다",
      passwordNoMatch: "비밀번호가 일치하지 않습니다",
      remoteCannotBeReached: "원격 데몬에 연결할 수 없습니다",
      selectWalletFile: "지갑 파일을 선택하세요",
      unknownError: "알 수 없는 오류가 발생했습니다",
      walletAlreadyExists: "같은 이름의 지갑이 이미 존재합니다",
      walletPathNotFound: "지갑 데이터 저장 경로를 찾을 수 없습니다",
      zeroAmount: "금액은 0보다 커야 합니다"
    },
    warnings: {
      noExportTransfers: "내보낼 거래 내역이 없습니다",
      noKeyImageExport: "내보낼 키 이미지가 없습니다",
      usingLocalNode: "원격 노드에 접근할 수 없어 로컬 전용으로 전환합니다",
      usingRemoteNode: "judecoind를 찾을 수 없어 원격 노드를 사용합니다"
    }
  },
  placeholders: {
    additionalNotes: "추가 메모",
    addressBookName: "이 주소에 해당하는 이름",
    addressOfSigner: "서명자의 공개 지갑 주소",
    dataToSign: "기본 주소의 개인 키로 서명할 데이터",
    filterTx: "ID, 이름, 주소 또는 금액을 입력하세요",
    hexCharacters: "{count}자리 16진수 문자",
    onsName: "Jude 이름 서비스를 통해 구매할 이름",
    onsBackupOwner: "백업 소유자의 지갑 주소",
    onsDecryptName: "소유한 ONS 이름",
    lokinetFullAddress: "ONS 이름에 매핑할 전체 Lokinet 주소 (.loki 제외)",
    mnemonicSeed: "25 단어 니모닉 시드",
    pasteTransactionId: "트랜잭션 ID 붙여넣기",
    pasteTransactionProof: "트랜잭션 증명 붙여넣기",
    proveOptionalMessage: "서명이 서명된 선택적 메시지",
    recipientWalletAddress: "수신자의 지갑 주소",
    selectAFile: "파일을 선택하세요",
    sessionId: "Jude 이름 서비스에 연결할 Session ID",
    signature: "검증할 서명",
    transactionNotes: "트랜잭션에 로컬로 첨부할 추가 메모",
    unsignedData: "서명되기 전의 원본 데이터",
    walletAddress: "ONS 이름에 매핑할 지갑 주소",
    walletName: "지갑 이름",
    walletPassword: "지갑 비밀번호"
  },
  strings: {
    addAddressBookEntry: "주소록 항목 추가",
    addressBookDetails: "주소록 상세",
    addressBookIsEmpty: "주소록이 비어 있습니다",
    addresses: {
      myPrimaryAddress: "내 기본 주소",
      myUnusedAddresses: "내 미사용 주소",
      myUsedAddresses: "내 사용된 주소",
      primaryAddress: "기본 주소",
      subAddress: "서브 주소",
      subAddressIndex: "인덱스 {index}"
    },
    advancedOptions: "고급 옵션",
    awaitingConfirmation: "확인 대기 중",
    bannedPeers: {
      title: "차단된 피어 (지갑 재시작 시 차단 해제됨)",
      bannedUntil: "{time}까지 차단됨"
    },
    blockHeight: "높이",
    cannotSign: "뷰 전용 지갑으로는 서명할 수 없습니다.",
    checkTransaction: {
      description:
        "트랜잭션 ID, 수신자 주소, 서명에 사용된 메시지 및 서명을 제공하여 주소로 자금이 지불되었는지 확인합니다.\n'지출 증명'의 경우 수신자 주소를 제공할 필요가 없습니다.",
      infoTitles: {
        confirmations: "확인 수",
        inPool: "풀에 있음",
        validTransaction: "유효한 트랜잭션",
        received: "수신 금액"
      },
      validTransaction: {
        no: "아니오",
        yes: "예"
      }
    },
    closing: "닫는 중",
    connectingToBackend: "백엔드에 연결 중",
    contribution: "기여",
    contributor: "기여자",
    daemon: {
      local: {
        title: "로컬 데몬 전용",
        description:
          "완전한 보안, 지갑이 전체 블록체인을 다운로드합니다. 동기화가 완료될 때까지 거래할 수 없습니다."
      },
      localRemote: {
        title: "로컬 + 원격 데몬",
        description:
          "이 기본 옵션으로 빠르게 시작하세요. 지갑이 전체 블록체인을 다운로드하지만 동기화 중에는 원격 노드를 사용합니다."
      },
      remote: {
        title: "원격 데몬 전용",
        description:
          "보안이 낮아집니다. 지갑이 원격 노드에 연결하여 모든 트랜잭션을 수행합니다."
      }
    },
    destinationUnknown: "목적지 알 수 없음",
    editAddressBookEntry: "주소록 항목 편집",
    expirationHeight: "만료 높이",
    nextPayout: "다음 보상",
    ons: {
      sessionID: "Session ID",
      wallet: "지갑 주소",
      lokinetName1Year: "Lokinet 이름 1년",
      lokinetNameXYears: "Lokinet 이름 {years}년",
      prices: "ONS 가격:"
    },
    onsPurchaseDescription:
      "ONS 레코드를 구매하거나 업데이트합니다. 이름을 구매하면 목록에 표시되기까지 1~2분이 소요될 수 있습니다.",
    onsDescription:
      "이 지갑이 소유한 모든 ONS 이름을 확인할 수 있습니다. 소유한 레코드를 복호화하면 해당 ONS 레코드의 이름과 값이 반환됩니다.",
    hardwareWallet: "하드웨어 지갑",
    hardwareWallets: "하드웨어 지갑",
    loadingSettings: "설정 불러오는 중",
    judecoinBalance: "잔액",
    lokinetNameDescription:
      "Lokinet에서 이름을 구매하거나 업데이트합니다. 이름을 구매하면 목록에 표시되기까지 1~2분이 소요될 수 있습니다. Lokinet에 대해 자세히 알아보려면 다음을 방문하세요: ",
    judecoinAccumulatedRewards: "누적 보상",
    judecoinUnlockedBalance: "잠금 해제된 잔액",
    judecoinUnlockedShort: "잠금 해제됨",
    me: "나",
    noTransactionsFound: "트랜잭션을 찾을 수 없습니다",
    notes: "메모",
    numberOfUnspentOutputs: "미사용 출력 수",
    operator: "운영자",
    paymentID: "결제 ID",
    peerList: "피어 목록",
    priorityOptions: {
      automatic: "자동",
      slow: "느림",
      normal: "보통",
      fast: "빠름",
      fastest: "가장 빠름",
      blink: "블링크"
    },

    proveTransactionDescription:
      "트랜잭션 ID, 수신자 주소 및 선택적 메시지를 제공하여 입금/출금 증명을 생성합니다.\n출금의 경우 트랜잭션의 작성자임을 증명하는 '지출 증명'을 받을 수 있습니다. 이 경우 수신자 주소를 지정할 필요가 없습니다.",
    readingWalletList: "지갑 목록 읽는 중",
    recentIncomingTransactionsToAddress: "이 주소로의 최근 수신 트랜잭션",
    recentTransactionsWithAddress: "이 주소와의 최근 트랜잭션",
    regularWallets: "일반 지갑",
    rescanModalDescription:
      "전체 재스캔 또는 사용된 출력만 재스캔을 선택하세요.",
    saveSeedWarning: "안전한 장소에 복사하여 저장하세요!",
    saveToAddressBook: "주소록에 저장",
    seedWords: "시드 단어",
    selectLanguage: "언어 선택",
    registrationStakingMigrationJudecoinToSessionToken:
      "Jude에서 Session Token으로의 마이그레이션이 진행 중이므로 새 서비스 노드에 대한 등록 및 스테이킹이 비활성화되었습니다. 자세한 내용은 여기를 참조하세요: ",
    serviceNodeContributionDescription:
      "스테이킹은 Judecoin 네트워크의 안전에 기여합니다. 기여에 대한 보상으로 JUDE를 받습니다. 스테이킹이 완료되면 JUDE가 잠금 해제되기까지 180일을 기다려야 합니다. 스테이킹에 대해 자세히 알아보려면 다음을 방문하세요",
    serviceNodeRegistrationDescription:
      '"{prepareCommand}" 명령어를 사용하여 서비스 노드로 등록하는 데몬이 생성한 {registerCommand} 명령어를 입력하세요',
    serviceNodeStartStakingDescription:
      "스테이킹을 시작하려면 스테이킹 탭을 방문하세요",
    noServiceNodesCurrentlyAvailable: "현재 기여 가능한 서비스 노드가 없습니다",
    serviceNodeDetails: {
      contributors: "기여자",
      lastRewardBlockHeight: "마지막 보상 블록 높이",
      lastUptimeProof: "마지막 가동 시간 증명",
      maxContribution: "최대 기여",
      minContribution: "최소 기여",
      operatorFee: "운영자 수수료",
      registrationHeight: "등록 높이",
      unlockHeight: "잠금 해제 높이",
      reserved: "예약됨",
      serviceNodeKey: "서비스 노드 키",
      snKey: "SN 키",
      stakingRequirement: "스테이킹 요구 사항",
      totalContributed: "총 기여"
    },
    signAndVerifyDescription:
      "기본 주소의 개인 키로 데이터에 서명하거나 공개 주소에 대한 서명을 검증합니다.",
    spendKey: "스펜드 키",
    stake: "스테이킹",
    startingDaemon: "데몬 시작 중",
    startingWallet: "지갑 시작 중",
    recipientN: "수신자 #{index}",
    switchToDateSelect: "날짜 선택으로 전환",
    switchToHeightSelect: "높이 선택으로 전환",
    themes: {
      dark: "다크",
      light: "라이트",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "데몬 동기화 중",
    transactionID: "트랜잭션 ID",
    transactionConfirmed: "확인됨",
    transactions: {
      amount: "금액",
      description: "{type} 트랜잭션",
      fee: "수수료",
      paidBySender: "발신자 부담",
      received: "수신",
      sent: "발신",
      sentTo: "{type} 트랜잭션 전송 대상",
      timestamp: "타임스탬프",
      types: {
        all: "전체",
        incoming: "수신",
        outgoing: "발신",
        pending: "대기 중",
        pendingIncoming: "수신 대기 중",
        pendingOutgoing: "발신 대기 중",
        miner: "채굴자",
        serviceNode: "서비스 노드",
        governance: "거버넌스",
        stake: "스테이킹",
        failed: "실패"
      }
    },
    unlockingAtHeight: "높이 {number}에서 잠금 해제",
    unspentOutputs: "미사용 출력",
    userNotUsedAddress: "이 주소를 사용하지 않았습니다",
    userUsedAddress: "이 주소를 사용했습니다",
    viewKey: "뷰 키",
    viewOnlyMode: "뷰 전용 모드. 코인을 전송하려면 전체 지갑을 로드하세요.",
    website: "커뮤니티 웹사이트"
  },
  titles: {
    addressBook: "주소록",
    addressDetails: "주소 상세",
    advanced: {
      checkTransaction: "트랜잭션 확인",
      prove: "증명",
      signAndVerify: "서명/검증",
      sign: "서명",
      verify: "검증"
    },
    availableForContribution: "기여 가능한 서비스 노드",
    changePassword: "비밀번호 변경",
    configure: "설정",
    currentlyStakedNodes: "현재 스테이킹 중인 노드",
    onsRecordDetails: "ONS 레코드 상세",
    onsSessionRecords: "Session 레코드",
    onsLokinetRecords: "Lokinet 레코드",
    onsWalletRecords: "지갑 레코드",
    privateKeys: "시드와 키",
    rescanWallet: "지갑 재스캔",
    ons: {
      purchase: "구매",
      myOns: "내 ONS"
    },
    serviceNode: {
      registration: "등록",
      staking: "스테이킹",
      myStakes: "내 스테이킹"
    },

    serviceNodeDetails: "서비스 노드 상세",
    settings: {
      title: "설정",
      tabs: {
        general: "일반",
        language: "언어",
        peers: "피어",
        wallet: "지갑"
      }
    },
    transactionDetails: "트랜잭션 상세",
    transactions: "트랜잭션",
    wallet: {
      createNew: "새 지갑 생성",
      createdOrRestored: "지갑 생성/복원 완료",
      importFromFile: "파일에서 지갑 가져오기",
      importFromLegacyGUI: "레거시 GUI에서 지갑 가져오기",
      importFromOldGUI: "이전 GUI에서 지갑 가져오기",
      restoreFromSeed: "시드에서 지갑 복원",
      restoreFromKeys: "키로 지갑 복원",
      restoreViewOnly: "뷰 전용 지갑 복원"
    },
    welcome: "환영합니다",
    welcomeToJude: "JUDE에 오신 것을 환영합니다",
    yourWallets: "내 지갑"
  }
};
