export default {
  nav: {
    send: "发送",
    addressBook: "地址簿",
    receive: "接收",
    transactions: "交易记录",
    staking: "质押",
    advanced: "高级",
    settings: "设置",
    addRecipient: "添加收款人",
    addDescription: "添加描述",
    walletSynced: "钱包已同步",
    walletSyncing: "钱包同步中（{pct}%）",
    daemonSynced: "节点已同步（{height}）",
    daemonSyncing: "节点同步中（{pct}%）",
    networkStatus: "网络状态",
    remoteNode: "远程节点",
    localNode: "本地节点"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "高级",
    all: "全部",
    back: "返回",
    browse: "浏览",
    cancel: "取消",
    change: "变更",
    check: "验证",
    clear: "清除",
    close: "关闭",
    contacts: "联系人",
    copyAddress: "复制地址",
    copyData: "复制数据",
    copySignature: "复制签名",
    createWallet: "创建钱包",
    decrypt: "解密",
    delete: "删除",
    edit: "编辑",
    export: "导出",
    generate: "产生",
    import: "导入",
    importWallet: "导入钱包 | 导入钱包",
    ons: "JUDE 名称服务",
    max: "最大",
    min: "最小",
    next: "下一步",
    openWallet: "打开钱包",
    purchase: "购买",
    receive: "收款",
    registerServiceNode: "注册服务节点",
    renew: "续期",
    rescan: "重新扫描",
    restoreWallet: "恢复钱包",
    save: "保存",
    saveTxNotes: "保存交易备注",
    selectLocation: "选择位置",
    selectWalletFile: "选择钱包文件",
    send: "发送",
    sendCoins: "发送币",
    serviceNode: "服务节点",
    settings: "设置",
    showQRCode: "显示 QR Code",
    showTxDetails: "显示交易详情",
    sign: "签名",
    stake: "质押",
    sweepAll: "全部归集",
    unlock: "解锁",
    update: "更新",
    verify: "验证",
    addRecipient: "添加收款人",
    viewOnExplorer: "在浏览器中查看"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "确定",
      cancel: "取消",
      open: "打开"
    },

    // Dialogs
    banPeer: {
      title: "封锁节点",
      peerDetailsTitle: "节点详情",
      message: "输入封锁节点的时长（秒）。\n预设 3600 = 1 小时。",
      ok: "封锁节点"
    },
    copyAddress: {
      title: "复制地址",
      message: "此地址关联了一个付款 ID。\n请确保单独复制付款 ID。"
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "复制 {type}",
      message: "请小心分享您的私钥，持有私钥即可控制您的资金。",
      seedWords: "助记词",
      viewKey: "查看密钥",
      spendKey: "支出密钥"
    },
    deleteWallet: {
      title: "删除钱包",
      message: "您确定要删除钱包吗？\n请确认已备份您的私钥。\n此操作无法撤销！",
      ok: "删除"
    },
    exit: {
      title: "离开",
      message: "确定要离开吗？",
      ok: "离开"
    },
    exportTransfers: {
      title: "导出交易记录为 CSV",
      message: "是否要导出交易记录？",
      export: "导出"
    },
    keyImages: {
      title: "{type}密钥图像",
      message: "是否要{type}密钥图像？",
      export: "导出",
      import: "导入"
    },
    onsUpdate: {
      title: "更新 ONS 记录",
      message: "是否要更新 ONS 记录？",
      ok: "更新"
    },
    noPassword: {
      title: "未设置密码",
      message: "确定要创建不设密码的钱包吗？",
      ok: "是"
    },
    password: {
      title: "密码",
      message: "输入钱包密码以继续。"
    },
    purchase: {
      title: "购买名称",
      message: "是否要购买此名称？",
      ok: "购买"
    },
    renew: {
      title: "续期名称",
      message: "是否要续期此名称？",
      ok: "续期"
    },
    registerServiceNode: {
      title: "注册服务节点",
      message: "是否要注册此服务节点？",
      ok: "注册"
    },
    rescan: {
      title: "重新扫描钱包",
      message: "警告：部分先前交易的信息\n（如收款方地址）将会遗失。",
      ok: "重新扫描"
    },
    restart: {
      title: "重新启动",
      message: "变更需要重新启动才能生效。是否立即重新启动？",
      ok: "重新启动"
    },
    showPrivateKeys: {
      title: "显示种子和密钥",
      message: "是否要查看您的私钥？",
      ok: "显示"
    },
    signature: {
      title: "签名",
      message: "以下是由您主地址的私钥签署的数据"
    },
    stake: {
      title: "质押",
      message: "是否要进行质押？",
      ok: "质押"
    },
    sweepAll: {
      title: "全部归集",
      message: "是否要全部归集？",
      ok: "全部归集"
    },
    sweepAllWarning: {
      title: "全部归集警告",
      message:
        "您即将透过向自己发送一笔交易来合并所有未花费的资金，您的钱包余额可能会暂时显示为 0，经过 10 个区块后您的资金将解锁，届时可正常进行质押。",
      ok: "继续"
    },
    switchWallet: {
      title: "切换钱包",
      closeMessage: "确定要关闭目前的钱包吗？",
      restartMessage:
        "钱包 RPC 正在同步中。\n如果要切换钱包，您必须重新启动应用程序。\n同步进度将会遗失，需要重新扫描区块链。",
      restartWalletMessage:
        "如果要切换钱包，您必须重新启动应用程序。确定要关闭目前的钱包并重新启动吗？"
    },
    transactionDetails: {
      title: "交易详情",
      ok: "关闭"
    },
    transfer: {
      title: "转帐",
      message: "是否要发送此交易？",
      ok: "发送"
    },
    confirmTransaction: {
      title: "确认交易",
      sendTo: "发送至",
      priority: "优先级"
    },
    unlockConfirm: {
      title: "确认解锁",
      ok: "解锁"
    },
    unlockServiceNode: {
      title: "解锁服务节点",
      confirmTitle: "确认解锁",
      message: "是否要解锁此服务节点？",
      ok: "解锁"
    },
    unlockServiceNodeWarning: {
      title: "解锁服务节点警告",
      message:
        "解锁共享节点中的部分质押也会同时解除其他参与者的质押。如果在共享节点中质押，最好通知营运者和其他参与者您即将解除质押。",
      ok: "继续"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "地址",
    amount: "金额",
    backupOwner: "备份拥有者",
    confirmPassword: "确认密码",
    daemonLogLevel: "节点程序日志等级",
    daemonP2pPort: "节点程序 P2P 连接端口",
    data: "数据",
    dataStoragePath: "数据保存路径",
    decryptRecord: "解密记录",
    exportTransfers: {
      exportDirectory: "CSV 导出目录"
    },
    filter: "筛选",
    filterTransactionType: "依交易类型筛选",
    internalWalletPort: "内部钱包连接端口",
    keyImages: {
      exportDirectory: "密钥图像导出目录",
      importFile: "密钥图像导入文件"
    },
    limitDownloadRate: "限制下载速率",
    limitUploadRate: "限制上传速率",
    onsType: "ONS 记录类型",
    localDaemonIP: "本地节点程序 IP",
    localDaemonPort: "本地节点程序连接端口",
    lokinetFullAddress: "LOKINET 完整地址",
    maxIncomingPeers: "最大传入连接数",
    maxOutgoingPeers: "最大传出连接数",
    message: "消息",
    mnemonicSeed: "助记词种子",
    name: "名称",
    newWalletName: "新钱包名称",
    notes: "备注",
    optional: "选填",
    owner: "拥有者",
    password: "密码",
    paymentId: "付款 ID",
    priority: "优先级",
    remoteNodeHost: "远程节点主机",
    remoteNodePort: "远程节点连接端口",
    restoreFromBlockHeight: "从区块高度恢复",
    restoreFromDate: "从日期恢复",
    seedLanguage: "助记词语言",
    serviceNodeCommand: "服务节点指令",
    serviceNodeKey: "服务节点密钥",
    sessionId: "SESSION ID",
    signature: "签名",
    transactionId: "交易 ID",
    walletAddress: "钱包地址",
    walletFile: "钱包文件",
    walletLogLevel: "钱包日志等级",
    walletName: "钱包名称",
    walletRPCPort: "钱包 RPC 连接端口",
    walletStoragePath: "钱包保存路径",
    theme: "主题",
    privateViewKey: "私有查看密钥",
    privateSpendKey: "私有花费密钥",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "确认新密码",
    newPassword: "新密码",
    oldPassword: "旧密码",
    rescanFullBlockchain: "完整重新扫描区块链",
    rescanSpentOutputs: "重新扫描已花费输出",
    transactionNotes: "交易备注",
    chooseNetwork: "选择网络",
    network: "网络"
  },
  footer: {
    ready: "就绪",
    scanning: "扫描中",
    status: "状态",
    syncing: "同步中",
    remote: "远程",
    wallet: "钱包",
    updateRequired: "需要更新"
  },
  menuItems: {
    cut: "剪切",
    copy: "复制",
    paste: "粘贴",
    selectAll: "全选",
    about: "关于",
    changePassword: "变更密码",
    copyAddress: "复制地址",
    copyBackupOwner: "复制备份拥有者",
    copyLokinetAddress: "复制 Lokinet 地址",
    copyLokinetName: "复制 Lokinet 名称",
    copyName: "复制名称",
    copyOwner: "复制拥有者",
    copyQR: "复制 QR Code",
    copySeedWords: "复制助记词",
    copySessionId: "复制 Session ID",
    copySpendKey: "复制支出密钥",
    copyServiceNodeKey: "复制服务节点密钥",
    copyTransactionId: "复制交易 ID",
    copyViewKey: "复制查看密钥",
    createNewWallet: "创建新钱包",
    deleteWallet: "删除钱包",
    exportTransfers: "导出交易记录",
    exit: "离开 Jude GUI 钱包",
    importOldGUIWallet: "从旧版 GUI 导入钱包",
    manageKeyImages: "管理密钥图像",
    openWallet: "打开钱包",
    rescanWallet: "重新扫描钱包",
    restoreWalletFile: "从文件恢复钱包",
    restoreWalletSeed: "从助记词恢复钱包",
    saveQR: "保存 QR Code 到文件",
    sendToThisAddress: "发送至此地址",
    settings: "设置",
    showDetails: "显示详情",
    showPrivateKeys: "显示种子和密钥",
    showQRCode: "显示 QR Code",
    switchWallet: "切换钱包",
    viewOnExplorer: "在浏览器中查看"
  },
  notification: {
    positive: {
      addressCopied: "地址已复制到剪贴板",
      backupOwnerCopied: "备份拥有者已复制到剪贴板",
      bannedPeer: "已封锁 {host} 直到 {time}",
      copied: "{item} 已复制到剪贴板",
      decryptedONSRecord: "已成功解密 {name} 的 ONS 记录",
      exportTransfers: "交易记录已导出至 {filename}",
      itemSaved: "{item} 已保存至 {filename}",
      keyImages: {
        exported: "密钥图像已导出至 {filename}",
        imported: "密钥图像已导入"
      },
      onsRecordUpdated: "ONS 记录已成功更新",
      lokinetAddressCopied: "Lokinet 完整地址已复制",
      lokinetNameCopied: "Lokinet 名称已复制",
      passwordUpdated: "密码已更新",
      namePurchased: "名称购买成功",
      nameRenewed: "名称续期成功",
      nameCopied: "名称已复制到剪贴板",
      ownerCopied: "拥有者已复制到剪贴板",
      qrCopied: "QR Code 已复制到剪贴板",
      registerServiceNodeSuccess: "服务节点注册成功",
      sendSuccess: "交易发送成功",
      serviceNodeInfoFilled: "服务节点密钥和最低金额已填入",
      sessionIdCopied: "Session ID 已复制到剪贴板",
      signatureCopied: "签名已复制到剪贴板",
      signatureVerified: "签名验证通过",
      stakeSuccess: "质押成功",
      transactionNotesSaved: "交易备注已保存",
      walletCopied: "钱包地址已复制到剪贴板"
    },
    errors: {
      banningPeer: "封锁节点时发生错误",
      cannotAccessRemoteNode: "无法访问远程节点，请尝试其他远程节点",
      changingPassword: "变更密码时发生错误",
      copyWalletFail: "复制钱包失败",
      copyingPrivateKeys: "复制私钥时发生错误",
      dataPathNotFound: "找不到数据保存路径",
      decryptONSRecord: "解密 {name} 的 ONS 记录失败",
      differentNetType: "远程节点使用了不同的网络类型",
      enterSeedWords: "请输入助记词",
      enterTransactionId: "请输入交易 ID",
      enterTransactionProof: "请输入交易证明",
      enterWalletName: "请输入钱包名称",
      enterName: "请输入名称",
      errorSavingItem: "保存 {item} 时发生错误",
      exportTransfers: "导出交易记录时发生错误",
      failedServiceNodeUnlock: "服务节点解锁失败",
      failedToSetLanguage: "设置语言失败：{lang}",
      failedWalletImport: "导入钱包失败",
      failedWalletOpen: "打开钱包失败，请重试。",
      failedWalletRead: "读取钱包失败",
      internalError: "内部错误",
      invalidAddress: "地址无效",
      invalidAmount: "金额无效",
      invalidBackupOwner: "备份拥有者地址无效",
      invalidNameLength: "名称长度必须在 1 到 64 个字符之间",
      invalidNameFormat: "名称只能包含英数字元、连字号和底线",
      invalidNameHypenNotAllowed: "名称只能以英数字元或底线开头和结尾",
      invalidOldPassword: "旧密码无效",
      invalidOwner: "拥有者地址无效",
      invalidPassword: "密码无效",
      invalidPaymentId: "付款 ID 无效",
      invalidPrivateViewKey: "查看私钥无效",
      invalidPrivateSpendKey: "无效的私有花费密钥",
      invalidPublicAddress: "公开地址无效",
      invalidRestoreDate: "恢复日期无效",
      invalidRestoreHeight: "恢复高度无效",
      invalidSeedLength: "助记词长度无效",
      invalidServiceNodeCommand: "请输入服务节点注册指令",
      invalidServiceNodeKey: "服务节点密钥无效",
      invalidSessionId: "Session ID 无效",
      invalidSignature: "签名无效",
      invalidWalletPath: "钱包路径无效",
      keyImages: {
        exporting: "导出密钥图像时发生错误",
        reading: "读取密钥图像时发生错误",
        importing: "导入密钥图像时发生错误"
      },
      negativeAmount: "金额不能为负数",
      newPasswordNoMatch: "新密码不一致",
      newPasswordSame: "新密码不能与旧密码相同",
      notEnoughBalance: "可用余额不足",
      passwordNoMatch: "密码不一致",
      remoteCannotBeReached: "无法连接至远程节点程序",
      selectWalletFile: "请选择钱包文件",
      unknownError: "发生未知错误",
      walletAlreadyExists: "该名称的钱包已存在",
      walletPathNotFound: "找不到钱包数据保存路径",
      zeroAmount: "金额必须大于零"
    },
    warnings: {
      noExportTransfers: "没有找到可导出的交易记录",
      noKeyImageExport: "没有找到可导出的密钥图像",
      usingLocalNode: "无法访问远程节点，已切换为仅使用本地节点",
      usingRemoteNode: "找不到 judecoind，改用远程节点"
    }
  },
  placeholders: {
    additionalNotes: "附加备注",
    addressBookName: "此地址对应的名称",
    addressOfSigner: "签署者的公开钱包地址",
    dataToSign: "您想使用主地址私钥签署的数据",
    filterTx: "输入 ID、名称、地址或金额",
    hexCharacters: "{count} 个十六进位字符",
    onsName: "透过 Jude 名称服务购买的名称",
    onsBackupOwner: "备份拥有者的钱包地址",
    onsDecryptName: "您拥有的 ONS 名称",
    lokinetFullAddress: "要将 ONS 名称映射至的 Lokinet 完整地址（不含 .loki）",
    mnemonicSeed: "25 个单词的助记词",
    publicWalletAddress: "钱包主地址（J 开头）",
    pasteTransactionId: "粘贴交易 ID",
    pasteTransactionProof: "粘贴交易证明",
    proveOptionalMessage: "用于验证签名的选填消息",
    recipientWalletAddress: "收款方的钱包地址",
    selectAFile: "请选择一个文件",
    sessionId: "要链接至 Jude 名称服务的 Session ID",
    signature: "要验证的签名",
    transactionNotes: "附加到交易的本地备注",
    unsignedData: "签署前的原始数据",
    walletAddress: "要将 ONS 名称映射至的钱包地址",
    walletName: "为您的钱包取个名称",
    walletPassword: "钱包密码"
  },
  strings: {
    addAddressBookEntry: "添加地址簿项目",
    addressBookDetails: "地址簿详情",
    addressBookIsEmpty: "地址簿为空",
    addresses: {
      myPrimaryAddress: "我的主地址",
      myUnusedAddresses: "我的未使用地址",
      myUsedAddresses: "我的已使用地址",
      primaryAddress: "主地址",
      subAddress: "子地址",
      subAddressIndex: "索引 {index}"
    },
    advancedOptions: "高级选项",
    awaitingConfirmation: "等待确认中",
    bannedPeers: {
      title: "已封锁的节点（重新启动钱包后封锁将被清除）",
      bannedUntil: "封锁至 {time}"
    },
    blockHeight: "高度",
    cannotSign: "仅供查看的钱包无法进行签名。",
    checkTransaction: {
      description:
        "透过提供交易 ID、收款方地址、签署时使用的消息和签名，验证资金是否已支付至指定地址。\n若为「支付证明」，则不需要提供收款方地址。",
      infoTitles: {
        confirmations: "确认数",
        inPool: "在交易池中",
        validTransaction: "有效交易",
        received: "收到金额"
      },
      validTransaction: {
        no: "否",
        yes: "是"
      }
    },
    closing: "关闭中",
    connectingToBackend: "正在连接至后端",
    contribution: "贡献",
    contributor: "贡献者",
    daemon: {
      local: {
        title: "仅本地节点",
        description:
          "最高安全性，钱包将下载完整的区块链。在同步完成之前将无法进行交易。"
      },
      localRemote: {
        title: "本地 + 远程节点",
        description:
          "使用此预设选项快速开始。钱包将下载完整的区块链，但在同步期间使用远程节点。"
      },
      remote: {
        title: "仅远程节点",
        description: "安全性较低，钱包将连接至远程节点进行所有交易。"
      }
    },
    destinationUnknown: "目的地未知",
    editAddressBookEntry: "编辑地址簿项目",
    expirationHeight: "到期高度",
    nextPayout: "下次支付",
    ons: {
      sessionID: "Session ID",
      wallet: "钱包地址",
      lokinetName1Year: "Lokinet 名称 1 年",
      lokinetNameXYears: "Lokinet 名称 {years} 年",
      prices: "ONS 价格："
    },
    onsPurchaseDescription:
      "购买或更新 ONS 记录。如果您购买了一个名称，可能需要一两分钟才会显示在清单中。",
    onsDescription:
      "这里可以查看此钱包拥有的所有 ONS 名称。解密您拥有的记录将返回该 ONS 记录的名称和值。",
    hardwareWallet: "硬件钱包",
    hardwareWallets: "硬件钱包",
    loadingSettings: "正在加载设置",
    judecoinBalance: "余额",
    lokinetNameDescription:
      "在 Lokinet 上购买或更新名称。如果您购买了一个名称，可能需要一两分钟才会显示在清单中。如需了解更多关于 Lokinet 的信息，请造访：",
    judecoinAccumulatedRewards: "累计奖励",
    judecoinUnlockedBalance: "可用余额",
    judecoinUnlockedShort: "可用",
    me: "我",
    noTransactionsFound: "未找到交易记录",
    notes: "备注",
    numberOfUnspentOutputs: "未花费输出数量",
    operator: "营运者",
    paymentID: "付款 ID",
    peerList: "节点清单",
    priorityOptions: {
      automatic: "自动",
      slow: "慢速",
      normal: "中等",
      fast: "快速",
      fastest: "最快",
      blink: "Blink"
    },

    proveTransactionDescription:
      "透过提供交易 ID、收款方地址和选填消息，产生您的收款/付款证明。\n对于付款交易，您可以取得「支付证明」来证明交易的发起者身份。在这种情况下，不需要指定收款方地址。",
    readingWalletList: "正在读取钱包清单",
    recentIncomingTransactionsToAddress: "此地址的近期收款交易",
    recentTransactionsWithAddress: "与此地址的近期交易",
    regularWallets: "一般钱包",
    rescanModalDescription: "选择完整重新扫描或仅重新扫描已花费输出。",
    saveSeedWarning: "请将以下内容复制并保存到安全的地方！",
    saveToAddressBook: "保存至地址簿",
    seedWords: "助记词",
    selectLanguage: "选择语言",
    registrationStakingMigrationJudecoinToSessionToken:
      "由于 Jude 正在迁移至 Session Token，新服务节点的注册和质押功能已暂时禁用。阅读更多：",
    serviceNodeContributionDescription:
      "质押有助于维护 Judecoin 网络的安全性。作为回报，您将获得 JUDE 奖励。质押后，您需要等待 180 天才能解锁您的 JUDE。如需了解更多关于质押的信息，请造访",
    serviceNodeRegistrationDescription:
      '输入由正在注册成为服务节点的节点程序使用 "{prepareCommand}" 指令产生的 {registerCommand} 指令',
    serviceNodeStartStakingDescription: "要开始质押，请前往质押分页",
    noServiceNodesCurrentlyAvailable: "目前没有可供贡献的服务节点",
    serviceNodeDetails: {
      contributors: "贡献者",
      lastRewardBlockHeight: "最后奖励区块高度",
      lastUptimeProof: "最后在线证明",
      maxContribution: "最大贡献额",
      minContribution: "最小贡献额",
      operatorFee: "营运者费用",
      registrationHeight: "注册高度",
      unlockHeight: "解锁高度",
      reserved: "已预留",
      serviceNodeKey: "服务节点密钥",
      snKey: "SN 密钥",
      stakingRequirement: "质押要求",
      totalContributed: "总贡献额"
    },
    signAndVerifyDescription:
      "使用主地址的私钥签署数据，或使用公开地址验证签名。",
    spendKey: "支出密钥",
    stake: "质押",
    startingDaemon: "正在启动节点程序",
    startingWallet: "正在启动钱包",
    recipientN: "收款人 #{index}",
    switchToDateSelect: "切换为日期选择",
    switchToHeightSelect: "切换为高度选择",
    themes: {
      dark: "深色",
      light: "浅色",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "正在同步节点程序",
    transactionID: "交易 ID",
    transactionConfirmed: "已确认",
    transactions: {
      amount: "金额",
      description: "{type}交易",
      fee: "手续费",
      paidBySender: "由发送方支付",
      received: "已收款",
      sent: "已发送",
      sentTo: "{type}交易已发送至",
      timestamp: "时间戳记",
      types: {
        all: "全部",
        incoming: "收款",
        outgoing: "付款",
        pending: "待处理",
        pendingIncoming: "待处理收款",
        pendingOutgoing: "待处理付款",
        miner: "挖矿",
        serviceNode: "服务节点",
        governance: "治理",
        stake: "质押",
        failed: "失败"
      }
    },
    unlockingAtHeight: "在高度 {number} 时解锁",
    unspentOutputs: "未花费输出",
    userNotUsedAddress: "您尚未使用此地址",
    userUsedAddress: "您已使用此地址",
    viewKey: "查看密钥",
    viewOnlyMode: "仅供查看模式。请加载完整钱包以发送币。",
    website: "社区网站"
  },
  titles: {
    addressBook: "地址簿",
    addressDetails: "地址详情",
    advanced: {
      checkTransaction: "验证交易",
      prove: "证明",
      signAndVerify: "签名/验证",
      sign: "签名",
      verify: "验证"
    },
    availableForContribution: "可供贡献的服务节点",
    changePassword: "变更密码",
    configure: "设置",
    currentlyStakedNodes: "目前质押的节点",
    onsRecordDetails: "ONS 记录详情",
    onsSessionRecords: "Session 记录",
    onsLokinetRecords: "Lokinet 记录",
    onsWalletRecords: "钱包记录",
    privateKeys: "种子和密钥",
    rescanWallet: "重新扫描钱包",
    ons: {
      purchase: "购买",
      myOns: "我的 ONS"
    },
    serviceNode: {
      registration: "注册",
      staking: "质押",
      myStakes: "我的质押"
    },

    serviceNodeDetails: "服务节点详情",
    settings: {
      title: "设置",
      tabs: {
        general: "一般",
        language: "语言",
        peers: "节点",
        wallet: "钱包"
      }
    },
    transactionDetails: "交易详情",
    transactions: "交易记录",
    wallet: {
      createNew: "创建新钱包",
      createdOrRestored: "钱包已创建/恢复",
      importFromFile: "从文件导入钱包",
      importFromLegacyGUI: "从旧版 GUI 导入钱包",
      importFromOldGUI: "从旧版 GUI 导入钱包",
      restoreFromSeed: "从助记词恢复钱包",
      restoreFromKeys: "从私钥恢复钱包",
      restoreViewOnly: "恢复仅供查看的钱包"
    },
    welcome: "欢迎",
    welcomeToJude: "欢迎使用 JUDE",
    yourWallets: "您的钱包"
  }
};
