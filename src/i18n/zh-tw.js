export default {
  nav: {
    send: "傳送",
    addressBook: "地址簿",
    receive: "接收",
    transactions: "交易記錄",
    staking: "質押",
    advanced: "進階",
    settings: "設定",
    addRecipient: "新增收款人",
    addDescription: "新增描述",
    walletSynced: "錢包已同步",
    walletSyncing: "錢包同步中（{pct}%）",
    daemonSynced: "節點已同步（{height}）",
    daemonSyncing: "節點同步中（{pct}%）",
    networkStatus: "網路狀態",
    remoteNode: "遠端節點",
    localNode: "本地節點"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "進階",
    all: "全部",
    back: "返回",
    browse: "瀏覽",
    cancel: "取消",
    change: "變更",
    check: "驗證",
    clear: "清除",
    close: "關閉",
    contacts: "聯絡人",
    copyAddress: "複製地址",
    copyData: "複製資料",
    copySignature: "複製簽名",
    createWallet: "創建錢包",
    decrypt: "解密",
    delete: "刪除",
    edit: "編輯",
    export: "匯出",
    generate: "產生",
    import: "匯入",
    importWallet: "匯入錢包 | 匯入錢包",
    ons: "JUDE 名稱服務",
    max: "最大",
    min: "最小",
    next: "下一步",
    openWallet: "開啟錢包",
    purchase: "購買",
    receive: "收款",
    registerServiceNode: "註冊服務節點",
    renew: "續期",
    rescan: "重新掃描",
    restoreWallet: "恢復錢包",
    save: "儲存",
    saveTxNotes: "儲存交易備註",
    selectLocation: "選擇位置",
    selectWalletFile: "選擇錢包檔案",
    send: "發送",
    sendCoins: "發送幣",
    serviceNode: "服務節點",
    settings: "設定",
    showQRCode: "顯示 QR Code",
    showTxDetails: "顯示交易詳情",
    sign: "簽名",
    stake: "質押",
    sweepAll: "全部歸集",
    unlock: "解鎖",
    update: "更新",
    verify: "驗證",
    addRecipient: "新增收款人",
    viewOnExplorer: "在瀏覽器中查看"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "確定",
      cancel: "取消",
      open: "開啟"
    },

    // Dialogs
    banPeer: {
      title: "封鎖節點",
      peerDetailsTitle: "節點詳情",
      message: "輸入封鎖節點的時長（秒）。\n預設 3600 = 1 小時。",
      ok: "封鎖節點"
    },
    copyAddress: {
      title: "複製地址",
      message: "此地址關聯了一個付款 ID。\n請確保單獨複製付款 ID。"
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "複製 {type}",
      message: "請小心分享您的私鑰，持有私鑰即可控制您的資金。",
      seedWords: "助記詞",
      viewKey: "查看密鑰",
      spendKey: "支出密鑰"
    },
    deleteWallet: {
      title: "刪除錢包",
      message: "您確定要刪除錢包嗎？\n請確認已備份您的私鑰。\n此操作無法撤銷！",
      ok: "刪除"
    },
    exit: {
      title: "離開",
      message: "確定要離開嗎？",
      ok: "離開"
    },
    exportTransfers: {
      title: "匯出交易記錄為 CSV",
      message: "是否要匯出交易記錄？",
      export: "匯出"
    },
    keyImages: {
      title: "{type}金鑰影像",
      message: "是否要{type}金鑰影像？",
      export: "匯出",
      import: "匯入"
    },
    onsUpdate: {
      title: "更新 ONS 記錄",
      message: "是否要更新 ONS 記錄？",
      ok: "更新"
    },
    noPassword: {
      title: "未設定密碼",
      message: "確定要創建不設密碼的錢包嗎？",
      ok: "是"
    },
    password: {
      title: "密碼",
      message: "輸入錢包密碼以繼續。"
    },
    purchase: {
      title: "購買名稱",
      message: "是否要購買此名稱？",
      ok: "購買"
    },
    renew: {
      title: "續期名稱",
      message: "是否要續期此名稱？",
      ok: "續期"
    },
    registerServiceNode: {
      title: "註冊服務節點",
      message: "是否要註冊此服務節點？",
      ok: "註冊"
    },
    rescan: {
      title: "重新掃描錢包",
      message: "警告：部分先前交易的資訊\n（如收款方地址）將會遺失。",
      ok: "重新掃描"
    },
    restart: {
      title: "重新啟動",
      message: "變更需要重新啟動才能生效。是否立即重新啟動？",
      ok: "重新啟動"
    },
    showPrivateKeys: {
      title: "顯示種子和密鑰",
      message: "是否要查看您的私鑰？",
      ok: "顯示"
    },
    signature: {
      title: "簽名",
      message: "以下是由您主地址的私鑰簽署的資料"
    },
    stake: {
      title: "質押",
      message: "是否要進行質押？",
      ok: "質押"
    },
    sweepAll: {
      title: "全部歸集",
      message: "是否要全部歸集？",
      ok: "全部歸集"
    },
    sweepAllWarning: {
      title: "全部歸集警告",
      message:
        "您即將透過向自己發送一筆交易來合併所有未花費的資金，您的錢包餘額可能會暫時顯示為 0，經過 10 個區塊後您的資金將解鎖，届時可正常進行質押。",
      ok: "繼續"
    },
    switchWallet: {
      title: "切換錢包",
      closeMessage: "確定要關閉目前的錢包嗎？",
      restartMessage:
        "錢包 RPC 正在同步中。\n如果要切換錢包，您必須重新啟動應用程式。\n同步進度將會遺失，需要重新掃描區塊鏈。",
      restartWalletMessage:
        "如果要切換錢包，您必須重新啟動應用程式。確定要關閉目前的錢包並重新啟動嗎？"
    },
    transactionDetails: {
      title: "交易詳情",
      ok: "關閉"
    },
    transfer: {
      title: "轉帳",
      message: "是否要發送此交易？",
      ok: "發送"
    },
    confirmTransaction: {
      title: "確認交易",
      sendTo: "發送至",
      priority: "優先順序"
    },
    unlockConfirm: {
      title: "確認解鎖",
      ok: "解鎖"
    },
    unlockServiceNode: {
      title: "解鎖服務節點",
      confirmTitle: "確認解鎖",
      message: "是否要解鎖此服務節點？",
      ok: "解鎖"
    },
    unlockServiceNodeWarning: {
      title: "解鎖服務節點警告",
      message:
        "解鎖共享節點中的部分質押也會同時解除其他參與者的質押。如果在共享節點中質押，最好通知營運者和其他參與者您即將解除質押。",
      ok: "繼續"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "地址",
    amount: "金額",
    backupOwner: "備份擁有者",
    confirmPassword: "確認密碼",
    daemonLogLevel: "節點程式日誌等級",
    daemonP2pPort: "節點程式 P2P 連接埠",
    data: "資料",
    dataStoragePath: "資料儲存路徑",
    decryptRecord: "解密記錄",
    exportTransfers: {
      exportDirectory: "CSV 匯出目錄"
    },
    filter: "篩選",
    filterTransactionType: "依交易類型篩選",
    internalWalletPort: "內部錢包連接埠",
    keyImages: {
      exportDirectory: "金鑰影像匯出目錄",
      importFile: "金鑰影像匯入檔案"
    },
    limitDownloadRate: "限制下載速率",
    limitUploadRate: "限制上傳速率",
    onsType: "ONS 記錄類型",
    localDaemonIP: "本地節點程式 IP",
    localDaemonPort: "本地節點程式連接埠",
    lokinetFullAddress: "LOKINET 完整地址",
    maxIncomingPeers: "最大傳入連線數",
    maxOutgoingPeers: "最大傳出連線數",
    message: "訊息",
    mnemonicSeed: "助記詞種子",
    name: "名稱",
    newWalletName: "新錢包名稱",
    notes: "備註",
    optional: "選填",
    owner: "擁有者",
    password: "密碼",
    paymentId: "付款 ID",
    priority: "優先順序",
    remoteNodeHost: "遠端節點主機",
    remoteNodePort: "遠端節點連接埠",
    restoreFromBlockHeight: "從區塊高度恢復",
    restoreFromDate: "從日期恢復",
    seedLanguage: "助記詞語言",
    serviceNodeCommand: "服務節點指令",
    serviceNodeKey: "服務節點金鑰",
    sessionId: "SESSION ID",
    signature: "簽名",
    transactionId: "交易 ID",
    walletAddress: "錢包地址",
    walletFile: "錢包檔案",
    walletLogLevel: "錢包日誌等級",
    walletName: "錢包名稱",
    walletRPCPort: "錢包 RPC 連接埠",
    walletStoragePath: "錢包儲存路徑",
    theme: "主題",
    privateViewKey: "私有查看金鑰",
    privateSpendKey: "私有花費金鑰",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "確認新密碼",
    newPassword: "新密碼",
    oldPassword: "舊密碼",
    rescanFullBlockchain: "完整重新掃描區塊鏈",
    rescanSpentOutputs: "重新掃描已花費輸出",
    transactionNotes: "交易備註",
    chooseNetwork: "選擇網路",
    network: "網路"
  },
  footer: {
    ready: "就緒",
    scanning: "掃描中",
    status: "狀態",
    syncing: "同步中",
    remote: "遠端",
    wallet: "錢包",
    updateRequired: "需要更新"
  },
  menuItems: {
    cut: "剪下",
    copy: "複製",
    paste: "貼上",
    selectAll: "全選",
    about: "關於",
    changePassword: "變更密碼",
    copyAddress: "複製地址",
    copyBackupOwner: "複製備份擁有者",
    copyLokinetAddress: "複製 Lokinet 地址",
    copyLokinetName: "複製 Lokinet 名稱",
    copyName: "複製名稱",
    copyOwner: "複製擁有者",
    copyQR: "複製 QR Code",
    copySeedWords: "複製助記詞",
    copySessionId: "複製 Session ID",
    copySpendKey: "複製支出密鑰",
    copyServiceNodeKey: "複製服務節點金鑰",
    copyTransactionId: "複製交易 ID",
    copyViewKey: "複製查看密鑰",
    createNewWallet: "創建新錢包",
    deleteWallet: "刪除錢包",
    exportTransfers: "匯出交易記錄",
    exit: "離開 Jude GUI 錢包",
    importOldGUIWallet: "從舊版 GUI 匯入錢包",
    manageKeyImages: "管理金鑰影像",
    openWallet: "開啟錢包",
    rescanWallet: "重新掃描錢包",
    restoreWalletFile: "從檔案恢復錢包",
    restoreWalletSeed: "從助記詞恢復錢包",
    saveQR: "儲存 QR Code 到檔案",
    sendToThisAddress: "發送至此地址",
    settings: "設定",
    showDetails: "顯示詳情",
    showPrivateKeys: "顯示種子和密鑰",
    showQRCode: "顯示 QR Code",
    switchWallet: "切換錢包",
    viewOnExplorer: "在瀏覽器中查看"
  },
  notification: {
    positive: {
      addressCopied: "地址已複製到剪貼簿",
      backupOwnerCopied: "備份擁有者已複製到剪貼簿",
      bannedPeer: "已封鎖 {host} 直到 {time}",
      copied: "{item} 已複製到剪貼簿",
      decryptedONSRecord: "已成功解密 {name} 的 ONS 記錄",
      exportTransfers: "交易記錄已匯出至 {filename}",
      itemSaved: "{item} 已儲存至 {filename}",
      keyImages: {
        exported: "金鑰影像已匯出至 {filename}",
        imported: "金鑰影像已匯入"
      },
      onsRecordUpdated: "ONS 記錄已成功更新",
      lokinetAddressCopied: "Lokinet 完整地址已複製",
      lokinetNameCopied: "Lokinet 名稱已複製",
      passwordUpdated: "密碼已更新",
      namePurchased: "名稱購買成功",
      nameRenewed: "名稱續期成功",
      nameCopied: "名稱已複製到剪貼簿",
      ownerCopied: "擁有者已複製到剪貼簿",
      qrCopied: "QR Code 已複製到剪貼簿",
      registerServiceNodeSuccess: "服務節點註冊成功",
      sendSuccess: "交易發送成功",
      serviceNodeInfoFilled: "服務節點金鑰和最低金額已填入",
      sessionIdCopied: "Session ID 已複製到剪貼簿",
      signatureCopied: "簽名已複製到剪貼簿",
      signatureVerified: "簽名驗證通過",
      stakeSuccess: "質押成功",
      transactionNotesSaved: "交易備註已儲存",
      walletCopied: "錢包地址已複製到剪貼簿"
    },
    errors: {
      banningPeer: "封鎖節點時發生錯誤",
      cannotAccessRemoteNode: "無法存取遠端節點，請嘗試其他遠端節點",
      changingPassword: "變更密碼時發生錯誤",
      copyWalletFail: "複製錢包失敗",
      copyingPrivateKeys: "複製私鑰時發生錯誤",
      dataPathNotFound: "找不到資料儲存路徑",
      decryptONSRecord: "解密 {name} 的 ONS 記錄失敗",
      differentNetType: "遠端節點使用了不同的網路類型",
      enterSeedWords: "請輸入助記詞",
      enterTransactionId: "請輸入交易 ID",
      enterTransactionProof: "請輸入交易證明",
      enterWalletName: "請輸入錢包名稱",
      enterName: "請輸入名稱",
      errorSavingItem: "儲存 {item} 時發生錯誤",
      exportTransfers: "匯出交易記錄時發生錯誤",
      failedServiceNodeUnlock: "服務節點解鎖失敗",
      failedToSetLanguage: "設定語言失敗：{lang}",
      failedWalletImport: "匯入錢包失敗",
      failedWalletOpen: "開啟錢包失敗，請重試。",
      failedWalletRead: "讀取錢包失敗",
      internalError: "內部錯誤",
      invalidAddress: "地址無效",
      invalidAmount: "金額無效",
      invalidBackupOwner: "備份擁有者地址無效",
      invalidNameLength: "名稱長度必須在 1 到 64 個字元之間",
      invalidNameFormat: "名稱只能包含英數字元、連字號和底線",
      invalidNameHypenNotAllowed: "名稱只能以英數字元或底線開頭和結尾",
      invalidOldPassword: "舊密碼無效",
      invalidOwner: "擁有者地址無效",
      invalidPassword: "密碼無效",
      invalidPaymentId: "付款 ID 無效",
      invalidPrivateViewKey: "查看私鑰無效",
      invalidPrivateSpendKey: "無效的私有花費金鑰",
      invalidPublicAddress: "公開地址無效",
      invalidRestoreDate: "恢復日期無效",
      invalidRestoreHeight: "恢復高度無效",
      invalidSeedLength: "助記詞長度無效",
      invalidServiceNodeCommand: "請輸入服務節點註冊指令",
      invalidServiceNodeKey: "服務節點金鑰無效",
      invalidSessionId: "Session ID 無效",
      invalidSignature: "簽名無效",
      invalidWalletPath: "錢包路徑無效",
      keyImages: {
        exporting: "匯出金鑰影像時發生錯誤",
        reading: "讀取金鑰影像時發生錯誤",
        importing: "匯入金鑰影像時發生錯誤"
      },
      negativeAmount: "金額不能為負數",
      newPasswordNoMatch: "新密碼不一致",
      newPasswordSame: "新密碼不能與舊密碼相同",
      notEnoughBalance: "可用餘額不足",
      passwordNoMatch: "密碼不一致",
      remoteCannotBeReached: "無法連線至遠端節點程式",
      selectWalletFile: "請選擇錢包檔案",
      unknownError: "發生未知錯誤",
      walletAlreadyExists: "該名稱的錢包已存在",
      walletPathNotFound: "找不到錢包資料儲存路徑",
      zeroAmount: "金額必須大於零"
    },
    warnings: {
      noExportTransfers: "沒有找到可匯出的交易記錄",
      noKeyImageExport: "沒有找到可匯出的金鑰影像",
      usingLocalNode: "無法存取遠端節點，已切換為僅使用本地節點",
      usingRemoteNode: "找不到 judecoind，改用遠端節點"
    }
  },
  placeholders: {
    additionalNotes: "附加備註",
    addressBookName: "此地址對應的名稱",
    addressOfSigner: "簽署者的公開錢包地址",
    dataToSign: "您想使用主地址私鑰簽署的資料",
    filterTx: "輸入 ID、名稱、地址或金額",
    hexCharacters: "{count} 個十六進位字元",
    onsName: "透過 Jude 名稱服務購買的名稱",
    onsBackupOwner: "備份擁有者的錢包地址",
    onsDecryptName: "您擁有的 ONS 名稱",
    lokinetFullAddress: "要將 ONS 名稱映射至的 Lokinet 完整地址（不含 .loki）",
    mnemonicSeed: "25 個單詞的助記詞",
    publicWalletAddress: "錢包主地址（J 開頭）",
    pasteTransactionId: "貼上交易 ID",
    pasteTransactionProof: "貼上交易證明",
    proveOptionalMessage: "用於驗證簽名的選填訊息",
    recipientWalletAddress: "收款方的錢包地址",
    selectAFile: "請選擇一個檔案",
    sessionId: "要連結至 Jude 名稱服務的 Session ID",
    signature: "要驗證的簽名",
    transactionNotes: "附加到交易的本地備註",
    unsignedData: "簽署前的原始資料",
    walletAddress: "要將 ONS 名稱映射至的錢包地址",
    walletName: "為您的錢包取個名稱",
    walletPassword: "錢包密碼"
  },
  strings: {
    addAddressBookEntry: "新增地址簿項目",
    addressBookDetails: "地址簿詳情",
    addressBookIsEmpty: "地址簿為空",
    addresses: {
      myPrimaryAddress: "我的主地址",
      myUnusedAddresses: "我的未使用地址",
      myUsedAddresses: "我的已使用地址",
      primaryAddress: "主地址",
      subAddress: "子地址",
      subAddressIndex: "索引 {index}"
    },
    advancedOptions: "進階選項",
    awaitingConfirmation: "等待確認中",
    bannedPeers: {
      title: "已封鎖的節點（重新啟動錢包後封鎖將被清除）",
      bannedUntil: "封鎖至 {time}"
    },
    blockHeight: "高度",
    cannotSign: "僅供查看的錢包無法進行簽名。",
    checkTransaction: {
      description:
        "透過提供交易 ID、收款方地址、簽署時使用的訊息和簽名，驗證資金是否已支付至指定地址。\n若為「支付證明」，則不需要提供收款方地址。",
      infoTitles: {
        confirmations: "確認數",
        inPool: "在交易池中",
        validTransaction: "有效交易",
        received: "收到金額"
      },
      validTransaction: {
        no: "否",
        yes: "是"
      }
    },
    closing: "關閉中",
    connectingToBackend: "正在連線至後端",
    contribution: "貢獻",
    contributor: "貢獻者",
    daemon: {
      local: {
        title: "僅本地節點",
        description:
          "最高安全性，錢包將下載完整的區塊鏈。在同步完成之前將無法進行交易。"
      },
      localRemote: {
        title: "本地 + 遠端節點",
        description:
          "使用此預設選項快速開始。錢包將下載完整的區塊鏈，但在同步期間使用遠端節點。"
      },
      remote: {
        title: "僅遠端節點",
        description: "安全性較低，錢包將連線至遠端節點進行所有交易。"
      }
    },
    destinationUnknown: "目的地未知",
    editAddressBookEntry: "編輯地址簿項目",
    expirationHeight: "到期高度",
    nextPayout: "下次支付",
    ons: {
      sessionID: "Session ID",
      wallet: "錢包地址",
      lokinetName1Year: "Lokinet 名稱 1 年",
      lokinetNameXYears: "Lokinet 名稱 {years} 年",
      prices: "ONS 價格："
    },
    onsPurchaseDescription:
      "購買或更新 ONS 記錄。如果您購買了一個名稱，可能需要一兩分鐘才會顯示在清單中。",
    onsDescription:
      "這裡可以查看此錢包擁有的所有 ONS 名稱。解密您擁有的記錄將返回該 ONS 記錄的名稱和值。",
    hardwareWallet: "硬體錢包",
    hardwareWallets: "硬體錢包",
    loadingSettings: "正在載入設定",
    judecoinBalance: "餘額",
    lokinetNameDescription:
      "在 Lokinet 上購買或更新名稱。如果您購買了一個名稱，可能需要一兩分鐘才會顯示在清單中。如需了解更多關於 Lokinet 的資訊，請造訪：",
    judecoinAccumulatedRewards: "累計獎勵",
    judecoinUnlockedBalance: "可用餘額",
    judecoinUnlockedShort: "可用",
    me: "我",
    noTransactionsFound: "未找到交易記錄",
    notes: "備註",
    numberOfUnspentOutputs: "未花費輸出數量",
    operator: "營運者",
    paymentID: "付款 ID",
    peerList: "節點清單",
    priorityOptions: {
      automatic: "自動",
      slow: "慢速",
      normal: "中等",
      fast: "快速",
      fastest: "最快",
      blink: "Blink"
    },

    proveTransactionDescription:
      "透過提供交易 ID、收款方地址和選填訊息，產生您的收款/付款證明。\n對於付款交易，您可以取得「支付證明」來證明交易的發起者身份。在這種情況下，不需要指定收款方地址。",
    readingWalletList: "正在讀取錢包清單",
    recentIncomingTransactionsToAddress: "此地址的近期收款交易",
    recentTransactionsWithAddress: "與此地址的近期交易",
    regularWallets: "一般錢包",
    rescanModalDescription: "選擇完整重新掃描或僅重新掃描已花費輸出。",
    saveSeedWarning: "請將以下內容複製並保存到安全的地方！",
    saveToAddressBook: "儲存至地址簿",
    seedWords: "助記詞",
    selectLanguage: "選擇語言",
    registrationStakingMigrationJudecoinToSessionToken:
      "由於 Jude 正在遷移至 Session Token，新服務節點的註冊和質押功能已暫時停用。閱讀更多：",
    serviceNodeContributionDescription:
      "質押有助於維護 Judecoin 網路的安全性。作為回報，您將獲得 JUDE 獎勵。質押後，您需要等待 180 天才能解鎖您的 JUDE。如需了解更多關於質押的資訊，請造訪",
    serviceNodeRegistrationDescription:
      '輸入由正在註冊成為服務節點的節點程式使用 "{prepareCommand}" 指令產生的 {registerCommand} 指令',
    serviceNodeStartStakingDescription: "要開始質押，請前往質押分頁",
    noServiceNodesCurrentlyAvailable: "目前沒有可供貢獻的服務節點",
    serviceNodeDetails: {
      contributors: "貢獻者",
      lastRewardBlockHeight: "最後獎勵區塊高度",
      lastUptimeProof: "最後在線證明",
      maxContribution: "最大貢獻額",
      minContribution: "最小貢獻額",
      operatorFee: "營運者費用",
      registrationHeight: "註冊高度",
      unlockHeight: "解鎖高度",
      reserved: "已預留",
      serviceNodeKey: "服務節點金鑰",
      snKey: "SN 金鑰",
      stakingRequirement: "質押要求",
      totalContributed: "總貢獻額"
    },
    signAndVerifyDescription:
      "使用主地址的私鑰簽署資料，或使用公開地址驗證簽名。",
    spendKey: "支出密鑰",
    stake: "質押",
    startingDaemon: "正在啟動節點程式",
    startingWallet: "正在啟動錢包",
    recipientN: "收款人 #{index}",
    switchToDateSelect: "切換為日期選擇",
    switchToHeightSelect: "切換為高度選擇",
    themes: {
      dark: "深色",
      light: "淺色",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "正在同步節點程式",
    transactionID: "交易 ID",
    transactionConfirmed: "已確認",
    transactions: {
      amount: "金額",
      description: "{type}交易",
      fee: "手續費",
      paidBySender: "由發送方支付",
      received: "已收款",
      sent: "已發送",
      sentTo: "{type}交易已發送至",
      timestamp: "時間戳記",
      types: {
        all: "全部",
        incoming: "收款",
        outgoing: "付款",
        pending: "待處理",
        pendingIncoming: "待處理收款",
        pendingOutgoing: "待處理付款",
        miner: "挖礦",
        serviceNode: "服務節點",
        governance: "治理",
        stake: "質押",
        failed: "失敗"
      }
    },
    unlockingAtHeight: "在高度 {number} 時解鎖",
    unspentOutputs: "未花費輸出",
    userNotUsedAddress: "您尚未使用此地址",
    userUsedAddress: "您已使用此地址",
    viewKey: "查看密鑰",
    viewOnlyMode: "僅供查看模式。請載入完整錢包以發送幣。",
    website: "社區網站"
  },
  titles: {
    addressBook: "地址簿",
    addressDetails: "地址詳情",
    advanced: {
      checkTransaction: "驗證交易",
      prove: "證明",
      signAndVerify: "簽名/驗證",
      sign: "簽名",
      verify: "驗證"
    },
    availableForContribution: "可供貢獻的服務節點",
    changePassword: "變更密碼",
    configure: "設定",
    currentlyStakedNodes: "目前質押的節點",
    onsRecordDetails: "ONS 記錄詳情",
    onsSessionRecords: "Session 記錄",
    onsLokinetRecords: "Lokinet 記錄",
    onsWalletRecords: "錢包記錄",
    privateKeys: "種子和密鑰",
    rescanWallet: "重新掃描錢包",
    ons: {
      purchase: "購買",
      myOns: "我的 ONS"
    },
    serviceNode: {
      registration: "註冊",
      staking: "質押",
      myStakes: "我的質押"
    },

    serviceNodeDetails: "服務節點詳情",
    settings: {
      title: "設定",
      tabs: {
        general: "一般",
        language: "語言",
        peers: "節點",
        wallet: "錢包"
      }
    },
    transactionDetails: "交易詳情",
    transactions: "交易記錄",
    wallet: {
      createNew: "創建新錢包",
      createdOrRestored: "錢包已創建/恢復",
      importFromFile: "從檔案匯入錢包",
      importFromLegacyGUI: "從舊版 GUI 匯入錢包",
      importFromOldGUI: "從舊版 GUI 匯入錢包",
      restoreFromSeed: "從助記詞恢復錢包",
      restoreFromKeys: "從私鑰恢復錢包",
      restoreViewOnly: "恢復僅供查看的錢包"
    },
    welcome: "歡迎",
    welcomeToJude: "歡迎使用 JUDE",
    yourWallets: "您的錢包"
  }
};
