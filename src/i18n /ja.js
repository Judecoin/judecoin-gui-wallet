export default {
  nav: {
    send: "送金",
    addressBook: "アドレス帳",
    receive: "受け取り",
    transactions: "取引履歴",
    staking: "ステーキング",
    advanced: "高度な機能",
    settings: "設定",
    addRecipient: "送金先を追加",
    addDescription: "説明を追加",
    walletSynced: "ウォレットは同期済みです",
    walletSyncing: "ウォレットを同期中（{pct}%）",
    daemonSynced: "デーモンは同期済みです（{height}）",
    daemonSyncing: "デーモンを同期中（{pct}%）",
    networkStatus: "ネットワーク状態",
    remoteNode: "リモートノード",
    localNode: "ローカルノード"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "詳細設定",
    all: "すべて",
    back: "戻る",
    browse: "参照",
    cancel: "キャンセル",
    change: "変更",
    check: "確認",
    clear: "クリア",
    close: "閉じる",
    contacts: "連絡先",
    copyAddress: "アドレスをコピー",
    copyData: "データをコピー",
    copySignature: "署名をコピー",
    createWallet: "ウォレット作成",
    decrypt: "復号",
    delete: "削除",
    edit: "編集",
    export: "エクスポート",
    generate: "生成",
    import: "インポート",
    importWallet: "ウォレットをインポート | ウォレットをインポート",
    ons: "JUDE NAME SERVICE",
    max: "最大",
    min: "最小",
    next: "次へ",
    openWallet: "ウォレットを開く",
    purchase: "購入",
    receive: "受信",
    registerServiceNode: "サービスノード登録",
    renew: "更新",
    rescan: "再スキャン",
    restoreWallet: "ウォレット復元",
    save: "保存",
    saveTxNotes: "取引メモを保存",
    selectLocation: "場所を選択",
    selectWalletFile: "ウォレットファイルを選択",
    send: "送信",
    sendCoins: "コインを送信",
    serviceNode: "サービスノード",
    settings: "設定",
    showQRCode: "QRコードを表示",
    showTxDetails: "取引詳細を表示",
    sign: "署名",
    stake: "ステーキング",
    sweepAll: "全額スイープ",
    unlock: "ロック解除",
    update: "更新",
    verify: "検証",
    addRecipient: "受取人を追加",
    viewOnExplorer: "エクスプローラーで表示"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "OK",
      cancel: "キャンセル",
      open: "開く"
    },

    // Dialogs
    banPeer: {
      title: "ピアをBAN",
      peerDetailsTitle: "ピア詳細",
      message:
        "ピアをBANする秒数を入力してください。\nデフォルト 3600 = 1時間。",
      ok: "ピアをBAN"
    },
    copyAddress: {
      title: "アドレスをコピー",
      message:
        "このアドレスにはペイメントIDが関連付けられています。\nペイメントIDを別途コピーしてください。"
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "{type}をコピー",
      message: "秘密鍵は資金を管理するものです。送信先には十分ご注意ください。",
      seedWords: "シードワード",
      viewKey: "ビューキー",
      spendKey: "スペンドキー"
    },
    deleteWallet: {
      title: "ウォレットを削除",
      message:
        "本当にウォレットを削除しますか？\n秘密鍵のバックアップがあることを確認してください。\nこの操作は元に戻せません！",
      ok: "削除"
    },
    exit: {
      title: "終了",
      message: "終了してもよろしいですか？",
      ok: "終了"
    },
    exportTransfers: {
      title: "取引をCSVにエクスポート",
      message: "取引をエクスポートしますか？",
      export: "エクスポート"
    },
    keyImages: {
      title: "キーイメージを{type}",
      message: "キーイメージを{type}しますか？",
      export: "エクスポート",
      import: "インポート"
    },
    onsUpdate: {
      title: "ONSレコードを更新",
      message: "ONSレコードを更新しますか？",
      ok: "更新"
    },
    noPassword: {
      title: "パスワード未設定",
      message: "パスワードなしでウォレットを作成してもよろしいですか？",
      ok: "はい"
    },
    password: {
      title: "パスワード",
      message: "続行するにはウォレットのパスワードを入力してください。"
    },
    purchase: {
      title: "名前を購入",
      message: "この名前を購入しますか？",
      ok: "購入"
    },
    renew: {
      title: "名前を更新",
      message: "この名前を更新しますか？",
      ok: "更新"
    },
    registerServiceNode: {
      title: "サービスノードを登録",
      message: "サービスノードを登録しますか？",
      ok: "登録"
    },
    rescan: {
      title: "ウォレットを再スキャン",
      message:
        "警告：以前のトランザクションに関する一部の情報（\n受取人のアドレスなど）が失われます。",
      ok: "再スキャン"
    },
    restart: {
      title: "再起動",
      message: "変更を反映するには再起動が必要です。今すぐ再起動しますか？",
      ok: "再起動"
    },
    showPrivateKeys: {
      title: "シードと秘密鍵を表示",
      message: "秘密鍵を表示しますか？",
      ok: "表示"
    },
    signature: {
      title: "署名",
      message:
        "プライマリアドレスの秘密鍵で署名されたデータを以下にコピーしてください"
    },
    stake: {
      title: "ステーキング",
      message: "ステーキングしますか？",
      ok: "ステーキング"
    },
    sweepAll: {
      title: "全額スイープ",
      message: "全額スイープしますか？",
      ok: "全額スイープ"
    },
    sweepAllWarning: {
      title: "全額スイープの警告",
      message:
        "自分自身にトランザクションを送信することで、すべての未使用資金を統合しようとしています。ウォレットの残高が一時的に0と表示される場合がありますが、10ブロック後に資金がロック解除され、通常通りステーキングできるようになります。",
      ok: "続行"
    },
    switchWallet: {
      title: "ウォレットを切り替え",
      closeMessage: "現在のウォレットを閉じてもよろしいですか？",
      restartMessage:
        "ウォレットRPCは現在同期中です。\nウォレットを切り替えるにはアプリケーションを再起動する必要があります。\n同期の進捗が失われ、ブロックチェーンの再スキャンが必要になります。",
      restartWalletMessage:
        "ウォレットを切り替えるにはアプリケーションを再起動する必要があります。現在のウォレットを閉じて再起動してもよろしいですか？"
    },
    transactionDetails: {
      title: "トランザクション詳細",
      ok: "閉じる"
    },
    transfer: {
      title: "送金",
      message: "トランザクションを送信しますか？",
      ok: "送信"
    },
    confirmTransaction: {
      title: "トランザクションの確認",
      sendTo: "送信先",
      priority: "優先度"
    },
    unlockConfirm: {
      title: "ロック解除の確認",
      ok: "ロック解除"
    },
    unlockServiceNode: {
      title: "サービスノードのロック解除",
      confirmTitle: "ロック解除の確認",
      message: "サービスノードをロック解除しますか？",
      ok: "ロック解除"
    },
    unlockServiceNodeWarning: {
      title: "サービスノードのロック解除の警告",
      message:
        "ノードの部分的なステーキングをロック解除すると、他の参加者のステーキングも解除されます。共有ノードでステーキングしている場合は、ロック解除する前にオペレーターと他の参加者に知らせることをお勧めします。",
      ok: "続行"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "アドレス",
    amount: "金額",
    backupOwner: "バックアップオーナー",
    confirmPassword: "パスワード確認",
    daemonLogLevel: "デーモンログレベル",
    daemonP2pPort: "デーモンP2Pポート",
    data: "データ",
    dataStoragePath: "データ保存パス",
    decryptRecord: "レコードを復号",
    exportTransfers: {
      exportDirectory: "CSVエクスポート先ディレクトリ"
    },
    filter: "フィルター",
    filterTransactionType: "トランザクション種別でフィルター",
    internalWalletPort: "内部ウォレットポート",
    keyImages: {
      exportDirectory: "キーイメージエクスポート先ディレクトリ",
      importFile: "キーイメージインポートファイル"
    },
    limitDownloadRate: "ダウンロード速度制限",
    limitUploadRate: "アップロード速度制限",
    onsType: "ONSレコード種別",
    localDaemonIP: "ローカルデーモンIP",
    localDaemonPort: "ローカルデーモンポート",
    lokinetFullAddress: "LOKINETフルアドレス",
    maxIncomingPeers: "最大受信ピア数",
    maxOutgoingPeers: "最大送信ピア数",
    message: "メッセージ",
    mnemonicSeed: "ニーモニックシード",
    name: "名前",
    newWalletName: "新しいウォレット名",
    notes: "メモ",
    optional: "任意",
    owner: "オーナー",
    password: "パスワード",
    paymentId: "ペイメントID",
    priority: "優先度",
    remoteNodeHost: "リモートノードホスト",
    remoteNodePort: "リモートノードポート",
    restoreFromBlockHeight: "ブロック高から復元",
    restoreFromDate: "日付から復元",
    seedLanguage: "シード言語",
    serviceNodeCommand: "サービスノードコマンド",
    serviceNodeKey: "サービスノードキー",
    sessionId: "SESSION ID",
    signature: "署名",
    transactionId: "トランザクションID",
    walletAddress: "ウォレットアドレス",
    walletFile: "ウォレットファイル",
    walletLogLevel: "ウォレットログレベル",
    walletName: "ウォレット名",
    walletRPCPort: "ウォレットRPCポート",
    walletStoragePath: "ウォレット保存パス",
    theme: "テーマ",
    privateViewKey: "プライベートビューキー",
    privateSpendKey: "プライベート支出キー",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "新しいパスワードの確認",
    newPassword: "新しいパスワード",
    oldPassword: "現在のパスワード",
    rescanFullBlockchain: "ブロックチェーン全体を再スキャン",
    rescanSpentOutputs: "使用済み出力を再スキャン",
    transactionNotes: "トランザクションメモ",
    chooseNetwork: "ネットワークを選択",
    network: "ネットワーク"
  },
  footer: {
    ready: "準備完了",
    scanning: "スキャン中",
    status: "ステータス",
    syncing: "同期中",
    remote: "リモート",
    wallet: "ウォレット",
    updateRequired: "更新が必要です"
  },
  menuItems: {
    cut: "切り取り",
    copy: "コピー",
    paste: "貼り付け",
    selectAll: "すべて選択",
    about: "このアプリについて",
    changePassword: "パスワード変更",
    copyAddress: "アドレスをコピー",
    copyBackupOwner: "バックアップオーナーをコピー",
    copyLokinetAddress: "Lokinetアドレスをコピー",
    copyLokinetName: "Lokinet名をコピー",
    copyName: "名前をコピー",
    copyOwner: "オーナーをコピー",
    copyQR: "QRコードをコピー",
    copySeedWords: "シードワードをコピー",
    copySessionId: "Session IDをコピー",
    copySpendKey: "スペンドキーをコピー",
    copyServiceNodeKey: "サービスノードキーをコピー",
    copyTransactionId: "トランザクションIDをコピー",
    copyViewKey: "ビューキーをコピー",
    createNewWallet: "新しいウォレットを作成",
    deleteWallet: "ウォレットを削除",
    exportTransfers: "取引をエクスポート",
    exit: "Jude GUIウォレットを終了",
    importOldGUIWallet: "旧GUIからウォレットをインポート",
    manageKeyImages: "キーイメージを管理",
    openWallet: "ウォレットを開く",
    rescanWallet: "ウォレットを再スキャン",
    restoreWalletFile: "ファイルからウォレットを復元",
    restoreWalletSeed: "シードからウォレットを復元",
    saveQR: "QRコードをファイルに保存",
    sendToThisAddress: "このアドレスに送信",
    settings: "設定",
    showDetails: "詳細を表示",
    showPrivateKeys: "シードと秘密鍵を表示",
    showQRCode: "QRコードを表示",
    switchWallet: "ウォレットを切り替え",
    viewOnExplorer: "エクスプローラーで表示"
  },
  notification: {
    positive: {
      addressCopied: "アドレスをクリップボードにコピーしました",
      backupOwnerCopied: "バックアップオーナーをクリップボードにコピーしました",
      bannedPeer: "{host}を{time}までBANしました",
      copied: "{item}をクリップボードにコピーしました",
      decryptedONSRecord: "{name}のONSレコードを正常に復号しました",
      exportTransfers: "取引を{filename}にエクスポートしました",
      itemSaved: "{item}を{filename}に保存しました",
      keyImages: {
        exported: "キーイメージを{filename}にエクスポートしました",
        imported: "キーイメージをインポートしました"
      },
      onsRecordUpdated: "ONSレコードが正常に更新されました",
      lokinetAddressCopied: "Lokinetフルアドレスをコピーしました",
      lokinetNameCopied: "Lokinet名をコピーしました",
      passwordUpdated: "パスワードが更新されました",
      namePurchased: "名前が正常に購入されました",
      nameRenewed: "名前が正常に更新されました",
      nameCopied: "名前をクリップボードにコピーしました",
      ownerCopied: "オーナーをクリップボードにコピーしました",
      qrCopied: "QRコードをクリップボードにコピーしました",
      registerServiceNodeSuccess: "サービスノードの登録に成功しました",
      sendSuccess: "トランザクションが正常に送信されました",
      serviceNodeInfoFilled: "サービスノードキーと最小金額が入力されました",
      sessionIdCopied: "Session IDをクリップボードにコピーしました",
      signatureCopied: "署名をクリップボードにコピーしました",
      signatureVerified: "署名が検証されました",
      stakeSuccess: "ステーキングに成功しました",
      transactionNotesSaved: "トランザクションメモが保存されました",
      walletCopied: "ウォレットアドレスをクリップボードにコピーしました"
    },
    errors: {
      banningPeer: "ピアのBANに失敗しました",
      cannotAccessRemoteNode:
        "リモートノードにアクセスできません。別のリモートノードをお試しください",
      changingPassword: "パスワードの変更に失敗しました",
      copyWalletFail: "ウォレットのコピーに失敗しました",
      copyingPrivateKeys: "秘密鍵のコピーに失敗しました",
      dataPathNotFound: "データ保存パスが見つかりません",
      decryptONSRecord: "{name}のONSレコードの復号に失敗しました",
      differentNetType:
        "リモートノードは異なるネットワーク種別を使用しています",
      enterSeedWords: "シードワードを入力してください",
      enterTransactionId: "トランザクションIDを入力してください",
      enterTransactionProof: "トランザクション証明を入力してください",
      enterWalletName: "ウォレット名を入力してください",
      enterName: "名前を入力してください",
      errorSavingItem: "{item}の保存に失敗しました",
      exportTransfers: "取引のエクスポートに失敗しました",
      failedServiceNodeUnlock: "サービスノードのロック解除に失敗しました",
      failedToSetLanguage: "言語の設定に失敗しました: {lang}",
      failedWalletImport: "ウォレットのインポートに失敗しました",
      failedWalletOpen:
        "ウォレットを開けませんでした。もう一度お試しください。",
      failedWalletRead: "ウォレットの読み取りに失敗しました",
      internalError: "内部エラー",
      invalidAddress: "アドレスが無効です",
      invalidAmount: "金額が無効です",
      invalidBackupOwner: "バックアップオーナーのアドレスが無効です",
      invalidNameLength: "名前は1〜64文字で入力してください",
      invalidNameFormat:
        "名前には英数字、ハイフン、アンダースコアのみ使用できます",
      invalidNameHypenNotAllowed:
        "名前の先頭と末尾には英数字またはアンダースコアのみ使用できます",
      invalidOldPassword: "現在のパスワードが無効です",
      invalidOwner: "オーナーのアドレスが無効です",
      invalidPassword: "パスワードが無効です",
      invalidPaymentId: "ペイメントIDが無効です",
      invalidPrivateViewKey: "ビューキーが無効です",
      invalidPrivateSpendKey: "無効なプライベート支出キー",
      invalidPublicAddress: "公開アドレスが無効です",
      invalidRestoreDate: "復元日付が無効です",
      invalidRestoreHeight: "復元ブロック高が無効です",
      invalidSeedLength: "シードワードの長さが無効です",
      invalidServiceNodeCommand: "サービスノード登録コマンドを入力してください",
      invalidServiceNodeKey: "サービスノードキーが無効です",
      invalidSessionId: "Session IDが無効です",
      invalidSignature: "署名が無効です",
      invalidWalletPath: "ウォレットパスが無効です",
      keyImages: {
        exporting: "キーイメージのエクスポートに失敗しました",
        reading: "キーイメージの読み取りに失敗しました",
        importing: "キーイメージのインポートに失敗しました"
      },
      negativeAmount: "金額は負の値にできません",
      newPasswordNoMatch: "新しいパスワードが一致しません",
      newPasswordSame: "新しいパスワードは異なるものにしてください",
      notEnoughBalance: "ロック解除済み残高が不足しています",
      passwordNoMatch: "パスワードが一致しません",
      remoteCannotBeReached: "リモートデーモンに接続できません",
      selectWalletFile: "ウォレットファイルを選択してください",
      unknownError: "不明なエラーが発生しました",
      walletAlreadyExists: "同名のウォレットが既に存在します",
      walletPathNotFound: "ウォレットデータの保存パスが見つかりません",
      zeroAmount: "金額は0より大きい値にしてください"
    },
    warnings: {
      noExportTransfers: "エクスポートする取引が見つかりません",
      noKeyImageExport: "エクスポートするキーイメージが見つかりません",
      usingLocalNode:
        "リモートノードにアクセスできないため、ローカルのみに切り替えます",
      usingRemoteNode: "judecoindが見つかりません。リモートノードを使用します"
    }
  },
  placeholders: {
    additionalNotes: "追加メモ",
    addressBookName: "このアドレスに対応する名前",
    addressOfSigner: "署名者の公開ウォレットアドレス",
    dataToSign: "プライマリアドレスの秘密鍵で署名するデータ",
    filterTx: "ID、名前、アドレス、または金額を入力",
    hexCharacters: "{count}桁の16進数文字",
    onsName: "Jude Name Serviceで購入する名前",
    onsBackupOwner: "バックアップオーナーのウォレットアドレス",
    onsDecryptName: "あなたが所有するONS名",
    lokinetFullAddress: "ONS名をマッピングするLokinetフルアドレス（.lokiなし）",
    mnemonicSeed: "25語のニーモニックシード",
    pasteTransactionId: "トランザクションIDを貼り付け",
    pasteTransactionProof: "トランザクション証明を貼り付け",
    proveOptionalMessage: "署名に対するオプションのメッセージ",
    recipientWalletAddress: "受取人のウォレットアドレス",
    selectAFile: "ファイルを選択してください",
    sessionId: "Jude Name Serviceにリンクする Session ID",
    signature: "検証する署名",
    transactionNotes: "トランザクションにローカルで添付する追加メモ",
    unsignedData: "署名前のデータ",
    walletAddress: "ONS名をマッピングするウォレットアドレス",
    walletName: "ウォレットの名前",
    walletPassword: "ウォレットのパスワード"
  },
  strings: {
    addAddressBookEntry: "アドレス帳エントリを追加",
    addressBookDetails: "アドレス帳の詳細",
    addressBookIsEmpty: "アドレス帳は空です",
    addresses: {
      myPrimaryAddress: "プライマリアドレス",
      myUnusedAddresses: "未使用のアドレス",
      myUsedAddresses: "使用済みのアドレス",
      primaryAddress: "プライマリアドレス",
      subAddress: "サブアドレス",
      subAddressIndex: "インデックス {index}"
    },
    advancedOptions: "詳細オプション",
    awaitingConfirmation: "確認待ち",
    bannedPeers: {
      title: "BANされたピア（ウォレットの再起動でBANは解除されます）",
      bannedUntil: "{time}までBAN"
    },
    blockHeight: "ブロック高",
    cannotSign: "閲覧専用ウォレットでは署名できません。",
    checkTransaction: {
      description:
        "トランザクションID、受取人アドレス、署名に使用したメッセージ、および署名を提供することで、アドレスへの支払いを検証できます。\n「支出証明」の場合は、受取人アドレスの入力は不要です。",
      infoTitles: {
        confirmations: "確認数",
        inPool: "プール内",
        validTransaction: "有効なトランザクション",
        received: "受信金額"
      },
      validTransaction: {
        no: "いいえ",
        yes: "はい"
      }
    },
    closing: "閉じています",
    connectingToBackend: "バックエンドに接続中",
    contribution: "貢献",
    contributor: "貢献者",
    daemon: {
      local: {
        title: "ローカルデーモンのみ",
        description:
          "最高のセキュリティ。ウォレットはブロックチェーン全体をダウンロードします。同期が完了するまで取引はできません。"
      },
      localRemote: {
        title: "ローカル＋リモートデーモン",
        description:
          "このデフォルトオプションですぐに使い始められます。ウォレットはブロックチェーン全体をダウンロードしますが、同期中はリモートノードを使用します。"
      },
      remote: {
        title: "リモートデーモンのみ",
        description:
          "セキュリティが低くなります。ウォレットはリモートノードに接続してすべての取引を行います。"
      }
    },
    destinationUnknown: "宛先不明",
    editAddressBookEntry: "アドレス帳エントリを編集",
    expirationHeight: "有効期限ブロック高",
    nextPayout: "次の報酬支払い",
    ons: {
      sessionID: "Session ID",
      wallet: "ウォレットアドレス",
      lokinetName1Year: "Lokinet名 1年",
      lokinetNameXYears: "Lokinet名 {years}年",
      prices: "ONS価格："
    },
    onsPurchaseDescription:
      "ONSレコードを購入または更新します。名前を購入した場合、リストに表示されるまで1〜2分かかる場合があります。",
    onsDescription:
      "このウォレットが所有するすべてのONS名を確認できます。所有するレコードを復号すると、そのONSレコードの名前と値が表示されます。",
    hardwareWallet: "ハードウェアウォレット",
    hardwareWallets: "ハードウェアウォレット",
    loadingSettings: "設定を読み込み中",
    judecoinBalance: "残高",
    lokinetNameDescription:
      "Lokinetの名前を購入または更新します。名前を購入した場合、リストに表示されるまで1〜2分かかる場合があります。Lokinetの詳細については、こちらをご覧ください：",
    judecoinAccumulatedRewards: "累積報酬",
    judecoinUnlockedBalance: "ロック解除済み残高",
    judecoinUnlockedShort: "ロック解除済み",
    me: "自分",
    noTransactionsFound: "トランザクションが見つかりません",
    notes: "メモ",
    numberOfUnspentOutputs: "未使用出力の数",
    operator: "オペレーター",
    paymentID: "ペイメントID",
    peerList: "ピアリスト",
    priorityOptions: {
      automatic: "自動",
      slow: "低速",
      normal: "通常",
      fast: "高速",
      fastest: "最高速",
      blink: "Blink"
    },

    proveTransactionDescription:
      "トランザクションID、受取人アドレス、オプションのメッセージを提供することで、入出金の証明を生成できます。\n出金の場合、トランザクションの作成者であることを証明する「支出証明」を取得できます。この場合、受取人アドレスの指定は不要です。",
    readingWalletList: "ウォレットリストを読み込み中",
    recentIncomingTransactionsToAddress:
      "このアドレスへの最近の入金トランザクション",
    recentTransactionsWithAddress: "このアドレスとの最近のトランザクション",
    regularWallets: "通常のウォレット",
    rescanModalDescription:
      "完全な再スキャンまたは使用済み出力のみの再スキャンを選択してください。",
    saveSeedWarning: "これらを安全な場所にコピーして保存してください！",
    saveToAddressBook: "アドレス帳に保存",
    seedWords: "シードワード",
    selectLanguage: "言語を選択",
    registrationStakingMigrationJudecoinToSessionToken:
      "JudeからSession Tokenへの移行に伴い、新しいサービスノードへの登録とステーキングは無効になっています。詳細はこちら：",
    serviceNodeContributionDescription:
      "ステーキングはJudecoinネットワークの安全性に貢献します。貢献に対してJUDEを獲得できます。ステーキング後、JUDEのロック解除には180日の待機が必要です。ステーキングの詳細については、こちらをご覧ください",
    serviceNodeRegistrationDescription:
      "「{prepareCommand}」コマンドを使用してサービスノードとして登録するデーモンが生成した{registerCommand}コマンドを入力してください",
    serviceNodeStartStakingDescription:
      "ステーキングを開始するには、ステーキングタブをご覧ください",
    noServiceNodesCurrentlyAvailable:
      "現在、貢献可能なサービスノードはありません",
    serviceNodeDetails: {
      contributors: "貢献者",
      lastRewardBlockHeight: "最後の報酬ブロック高",
      lastUptimeProof: "最後の稼働証明",
      maxContribution: "最大貢献額",
      minContribution: "最小貢献額",
      operatorFee: "オペレーター手数料",
      registrationHeight: "登録ブロック高",
      unlockHeight: "ロック解除ブロック高",
      reserved: "予約済み",
      serviceNodeKey: "サービスノードキー",
      snKey: "SNキー",
      stakingRequirement: "ステーキング要件",
      totalContributed: "合計貢献額"
    },
    signAndVerifyDescription:
      "プライマリアドレスの秘密鍵でデータに署名するか、公開アドレスに対して署名を検証します。",
    spendKey: "スペンドキー",
    stake: "ステーキング",
    startingDaemon: "デーモンを起動中",
    startingWallet: "ウォレットを起動中",
    recipientN: "受取人 #{index}",
    switchToDateSelect: "日付選択に切り替え",
    switchToHeightSelect: "ブロック高選択に切り替え",
    themes: {
      dark: "ダーク",
      light: "ライト",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "デーモンを同期中",
    transactionID: "トランザクションID",
    transactionConfirmed: "確認済み",
    transactions: {
      amount: "金額",
      description: "{type}トランザクション",
      fee: "手数料",
      paidBySender: "送信者負担",
      received: "受信",
      sent: "送信",
      sentTo: "{type}トランザクションの送信先",
      timestamp: "タイムスタンプ",
      types: {
        all: "すべて",
        incoming: "入金",
        outgoing: "出金",
        pending: "保留中",
        pendingIncoming: "入金保留中",
        pendingOutgoing: "出金保留中",
        miner: "マイナー",
        serviceNode: "サービスノード",
        governance: "ガバナンス",
        stake: "ステーキング",
        failed: "失敗"
      }
    },
    unlockingAtHeight: "ブロック高 {number} でロック解除",
    unspentOutputs: "未使用出力",
    userNotUsedAddress: "このアドレスは未使用です",
    userUsedAddress: "このアドレスは使用済みです",
    viewKey: "ビューキー",
    viewOnlyMode:
      "閲覧専用モード。コインを送信するにはフルウォレットを読み込んでください。",
    website: "コミュニティサイト"
  },
  titles: {
    addressBook: "アドレス帳",
    addressDetails: "アドレス詳細",
    advanced: {
      checkTransaction: "トランザクション確認",
      prove: "証明",
      signAndVerify: "署名/検証",
      sign: "署名",
      verify: "検証"
    },
    availableForContribution: "貢献可能なサービスノード",
    changePassword: "パスワード変更",
    configure: "設定",
    currentlyStakedNodes: "ステーキング中のノード",
    onsRecordDetails: "ONSレコード詳細",
    onsSessionRecords: "Sessionレコード",
    onsLokinetRecords: "Lokinetレコード",
    onsWalletRecords: "ウォレットレコード",
    privateKeys: "シードと秘密鍵",
    rescanWallet: "ウォレットを再スキャン",
    ons: {
      purchase: "購入",
      myOns: "マイONS"
    },
    serviceNode: {
      registration: "登録",
      staking: "ステーキング",
      myStakes: "マイステーキング"
    },

    serviceNodeDetails: "サービスノード詳細",
    settings: {
      title: "設定",
      tabs: {
        general: "一般",
        language: "言語",
        peers: "ピア",
        wallet: "ウォレット"
      }
    },
    transactionDetails: "トランザクション詳細",
    transactions: "トランザクション一覧",
    wallet: {
      createNew: "新しいウォレットを作成",
      createdOrRestored: "ウォレットの作成/復元完了",
      importFromFile: "ファイルからウォレットをインポート",
      importFromLegacyGUI: "レガシーGUIからウォレットをインポート",
      importFromOldGUI: "旧GUIからウォレットをインポート",
      restoreFromSeed: "シードからウォレットを復元",
      restoreFromKeys: "秘密鍵からウォレットを復元",
      restoreViewOnly: "閲覧専用ウォレットを復元"
    },
    welcome: "ようこそ",
    welcomeToJude: "JUDEへようこそ",
    yourWallets: "あなたのウォレット"
  }
};
