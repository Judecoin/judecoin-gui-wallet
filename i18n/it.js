export default {
  nav: {
    send: "Invia",
    addressBook: "Rubrica",
    receive: "Ricevi",
    transactions: "Transazioni",
    staking: "Staking",
    advanced: "Avanzate",
    settings: "Impostazioni",
    addRecipient: "Aggiungi destinatario",
    addDescription: "Aggiungi descrizione",
    walletSynced: "Il portafoglio è sincronizzato",
    walletSyncing: "Sincronizzazione portafoglio ({pct}%)",
    daemonSynced: "Il daemon è sincronizzato ({height})",
    daemonSyncing: "Sincronizzazione daemon ({pct}%)",
    networkStatus: "Stato della rete",
    remoteNode: "Nodo remoto",
    localNode: "Nodo locale"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "AVANZATE",
    all: "TUTTO",
    back: "INDIETRO",
    browse: "SFOGLIA",
    cancel: "ANNULLA",
    change: "MODIFICA",
    check: "VERIFICA",
    clear: "CANCELLA",
    close: "CHIUDI",
    contacts: "CONTATTI",
    copyAddress: "COPIA INDIRIZZO",
    copyData: "COPIA DATI",
    copySignature: "COPIA FIRMA",
    createWallet: "CREA PORTAFOGLIO",
    decrypt: "DECIFRA",
    delete: "ELIMINA",
    edit: "MODIFICA",
    export: "ESPORTA",
    generate: "GENERA",
    import: "IMPORTA",
    importWallet: "IMPORTA PORTAFOGLIO | IMPORTA PORTAFOGLI",
    ons: "JUDE NAME SERVICE",
    max: "MAX",
    min: "MIN",
    next: "AVANTI",
    openWallet: "APRI PORTAFOGLIO",
    purchase: "ACQUISTA",
    receive: "RICEVI",
    registerServiceNode: "REGISTRA NODO DI SERVIZIO",
    renew: "RINNOVA",
    rescan: "RISCANSIONA",
    restoreWallet: "RIPRISTINA PORTAFOGLIO",
    save: "SALVA",
    saveTxNotes: "SALVA NOTE TX",
    selectLocation: "SELEZIONA POSIZIONE",
    selectWalletFile: "SELEZIONA FILE PORTAFOGLIO",
    send: "INVIA",
    sendCoins: "INVIA MONETE",
    serviceNode: "NODI DI SERVIZIO",
    settings: "IMPOSTAZIONI",
    showQRCode: "MOSTRA CODICE QR",
    showTxDetails: "MOSTRA DETTAGLI TX",
    sign: "FIRMA",
    stake: "STAKING",
    sweepAll: "TRASFERISCI TUTTO",
    unlock: "SBLOCCA",
    update: "AGGIORNA",
    verify: "VERIFICA",
    addRecipient: "AGGIUNGI DESTINATARIO",
    viewOnExplorer: "VISUALIZZA SU EXPLORER"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "OK",
      cancel: "ANNULLA",
      open: "APRI"
    },

    // Dialogs
    banPeer: {
      title: "Blocca peer",
      peerDetailsTitle: "Dettagli peer",
      message:
        "Inserisci la durata del blocco del peer in secondi.\nPredefinito 3600 = 1 ora.",
      ok: "Blocca peer"
    },
    copyAddress: {
      title: "Copia indirizzo",
      message:
        "C'è un ID di pagamento associato a questo indirizzo.\nAssicurati di copiare separatamente l'ID di pagamento."
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "Copia {type}",
      message:
        "Fai attenzione a chi invii le tue chiavi private poiché controllano i tuoi fondi.",
      seedWords: "Parole Seed",
      viewKey: "Chiave di Visualizzazione",
      spendKey: "Chiave di Spesa"
    },
    deleteWallet: {
      title: "Elimina portafoglio",
      message:
        "Sei assolutamente sicuro di voler eliminare il tuo portafoglio?\nAssicurati di aver eseguito il backup delle tue chiavi private.\nQUESTO PROCESSO NON È REVERSIBILE!",
      ok: "ELIMINA"
    },
    exit: {
      title: "Esci",
      message: "Sei sicuro di voler uscire?",
      ok: "ESCI"
    },
    exportTransfers: {
      title: "Esporta trasferimenti in CSV",
      message: "Vuoi esportare i trasferimenti?",
      export: "Esporta"
    },
    keyImages: {
      title: "{type} immagini chiave",
      message: "Vuoi {type} le immagini chiave?",
      export: "Esportare",
      import: "Importare"
    },
    onsUpdate: {
      title: "Aggiorna record ONS",
      message: "Vuoi aggiornare il record ONS?",
      ok: "AGGIORNA"
    },
    noPassword: {
      title: "Nessuna password impostata",
      message: "Sei sicuro di voler creare un portafoglio senza password?",
      ok: "SÌ"
    },
    password: {
      title: "Password",
      message: "Inserisci la password del portafoglio per continuare."
    },
    purchase: {
      title: "Acquista nome",
      message: "Vuoi acquistare il nome?",
      ok: "ACQUISTA"
    },
    renew: {
      title: "Rinnova nome",
      message: "Vuoi rinnovare il nome?",
      ok: "RINNOVA"
    },
    registerServiceNode: {
      title: "Registra nodo di servizio",
      message: "Vuoi registrare il nodo di servizio?",
      ok: "REGISTRA"
    },
    rescan: {
      title: "Riscansiona portafoglio",
      message:
        "Attenzione: alcune informazioni sulle transazioni precedenti\ncome l'indirizzo del destinatario andranno perse.",
      ok: "RISCANSIONA"
    },
    restart: {
      title: "Riavvia",
      message: "Le modifiche richiedono un riavvio. Vuoi riavviare ora?",
      ok: "RIAVVIA"
    },
    showPrivateKeys: {
      title: "Mostra seed e chiavi",
      message: "Vuoi visualizzare le tue chiavi private?",
      ok: "MOSTRA"
    },
    signature: {
      title: "Firma",
      message:
        "Copia i dati firmati con la chiave privata del tuo indirizzo principale qui sotto"
    },
    stake: {
      title: "Staking",
      message: "Vuoi effettuare lo staking?",
      ok: "STAKING"
    },
    sweepAll: {
      title: "Trasferisci tutto",
      message: "Vuoi trasferire tutto?",
      ok: "TRASFERISCI TUTTO"
    },
    sweepAllWarning: {
      title: "Avviso trasferimento completo",
      message:
        "Stai per combinare tutti i tuoi fondi non spesi inviando una transazione a te stesso, il tuo portafoglio potrebbe mostrare temporaneamente un saldo di 0, dopo 10 blocchi i tuoi fondi saranno sbloccati e potrai fare staking normalmente.",
      ok: "CONTINUA"
    },
    switchWallet: {
      title: "Cambia portafoglio",
      closeMessage: "Sei sicuro di voler chiudere il portafoglio corrente?",
      restartMessage:
        "Il wallet RPC è attualmente in fase di sincronizzazione. \nSe desideri cambiare portafoglio devi riavviare l'applicazione. \nPerderai i progressi di sincronizzazione e dovrai riscansionare la blockchain.",
      restartWalletMessage:
        "Se desideri cambiare portafoglio devi riavviare l'applicazione. Sei sicuro di voler chiudere il portafoglio corrente e riavviare?"
    },
    transactionDetails: {
      title: "Dettagli transazione",
      ok: "CHIUDI"
    },
    transfer: {
      title: "Trasferimento",
      message: "Vuoi inviare la transazione?",
      ok: "INVIA"
    },
    confirmTransaction: {
      title: "Conferma transazione",
      sendTo: "Invia a",
      priority: "Priorità"
    },
    unlockConfirm: {
      title: "Conferma sblocco",
      ok: "SBLOCCA"
    },
    unlockServiceNode: {
      title: "Sblocca nodo di servizio",
      confirmTitle: "Conferma sblocco",
      message: "Vuoi sbloccare il nodo di servizio?",
      ok: "SBLOCCA"
    },
    unlockServiceNodeWarning: {
      title: "Avviso sblocco nodo di servizio",
      message:
        "Sbloccare uno stake parziale in un nodo comporterà anche l'unstaking per tutti gli altri partecipanti, se stai facendo staking in un nodo condiviso è meglio informare l'operatore e gli altri partecipanti che stai effettuando l'unstaking.",
      ok: "CONTINUA"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "INDIRIZZO",
    amount: "IMPORTO",
    backupOwner: "PROPRIETARIO DI BACKUP",
    confirmPassword: "CONFERMA PASSWORD",
    daemonLogLevel: "LIVELLO LOG DAEMON",
    daemonP2pPort: "PORTA P2P DAEMON",
    data: "DATI",
    dataStoragePath: "PERCORSO ARCHIVIAZIONE DATI",
    decryptRecord: "DECIFRA RECORD",
    exportTransfers: {
      exportDirectory: "DIRECTORY ESPORTAZIONE CSV"
    },
    filter: "FILTRO",
    filterTransactionType: "FILTRA PER TIPO DI TRANSAZIONE",
    internalWalletPort: "PORTA INTERNA PORTAFOGLIO",
    keyImages: {
      exportDirectory: "DIRECTORY ESPORTAZIONE IMMAGINI CHIAVE",
      importFile: "FILE IMPORTAZIONE IMMAGINI CHIAVE"
    },
    limitDownloadRate: "LIMITE VELOCITÀ DOWNLOAD",
    limitUploadRate: "LIMITE VELOCITÀ UPLOAD",
    onsType: "TIPO RECORD ONS",
    localDaemonIP: "IP DAEMON LOCALE",
    localDaemonPort: "PORTA DAEMON LOCALE",
    lokinetFullAddress: "INDIRIZZO COMPLETO LOKINET",
    maxIncomingPeers: "MAX PEER IN ENTRATA",
    maxOutgoingPeers: "MAX PEER IN USCITA",
    message: "MESSAGGIO",
    mnemonicSeed: "SEED MNEMONICO",
    name: "NOME",
    newWalletName: "NOME NUOVO PORTAFOGLIO",
    notes: "NOTE",
    optional: "OPZIONALE",
    owner: "PROPRIETARIO",
    password: "PASSWORD",
    paymentId: "ID PAGAMENTO",
    priority: "PRIORITÀ",
    remoteNodeHost: "HOST NODO REMOTO",
    remoteNodePort: "PORTA NODO REMOTO",
    restoreFromBlockHeight: "RIPRISTINA DA ALTEZZA BLOCCO",
    restoreFromDate: "RIPRISTINA DA DATA",
    seedLanguage: "LINGUA SEED",
    serviceNodeCommand: "COMANDO NODO DI SERVIZIO",
    serviceNodeKey: "CHIAVE NODO DI SERVIZIO",
    sessionId: "SESSION ID",
    signature: "FIRMA",
    transactionId: "ID TRANSAZIONE",
    walletAddress: "INDIRIZZO PORTAFOGLIO",
    walletFile: "FILE PORTAFOGLIO",
    walletLogLevel: "LIVELLO LOG PORTAFOGLIO",
    walletName: "NOME PORTAFOGLIO",
    walletRPCPort: "PORTA RPC PORTAFOGLIO",
    walletStoragePath: "PERCORSO ARCHIVIAZIONE PORTAFOGLIO",
    theme: "TEMA",
    privateViewKey: "CHIAVE DI VISUALIZZAZIONE PRIVATA",
    privateSpendKey: "CHIAVE DI SPESA PRIVATA",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "Conferma Nuova Password",
    newPassword: "Nuova Password",
    oldPassword: "Vecchia Password",
    rescanFullBlockchain: "Riscansiona blockchain completa",
    rescanSpentOutputs: "Riscansiona output spesi",
    transactionNotes: "Note Transazione",
    chooseNetwork: "Scegli una Rete",
    network: "Rete"
  },
  footer: {
    ready: "PRONTO",
    scanning: "SCANSIONE",
    status: "Stato",
    syncing: "SINCRONIZZAZIONE",
    remote: "Remoto",
    wallet: "Portafoglio",
    updateRequired: "AGGIORNAMENTO RICHIESTO"
  },
  menuItems: {
    cut: "Taglia",
    copy: "Copia",
    paste: "Incolla",
    selectAll: "Seleziona tutto",
    about: "Informazioni",
    changePassword: "Cambia Password",
    copyAddress: "Copia indirizzo",
    copyBackupOwner: "Copia proprietario di backup",
    copyLokinetAddress: "Copia indirizzo Lokinet",
    copyLokinetName: "Copia nome Lokinet",
    copyName: "Copia nome",
    copyOwner: "Copia proprietario",
    copyQR: "Copia codice QR",
    copySeedWords: "Copia parole seed",
    copySessionId: "Copia Session ID",
    copySpendKey: "Copia chiave di spesa",
    copyServiceNodeKey: "Copia chiave nodo di servizio",
    copyTransactionId: "Copia ID transazione",
    copyViewKey: "Copia chiave di visualizzazione",
    createNewWallet: "Crea nuovo portafoglio",
    deleteWallet: "Elimina Portafoglio",
    exportTransfers: "Esporta Trasferimenti",
    exit: "Esci da Jude GUI Wallet",
    importOldGUIWallet: "Importa portafogli dalla vecchia GUI",
    manageKeyImages: "Gestisci Immagini Chiave",
    openWallet: "Apri portafoglio",
    rescanWallet: "Riscansiona Portafoglio",
    restoreWalletFile: "Ripristina portafoglio da file",
    restoreWalletSeed: "Ripristina portafoglio da seed",
    saveQR: "Salva codice QR su file",
    sendToThisAddress: "Invia a questo indirizzo",
    settings: "Impostazioni",
    showDetails: "Mostra dettagli",
    showPrivateKeys: "Mostra Seed e Chiavi",
    showQRCode: "Mostra Codice QR",
    switchWallet: "Cambia Portafoglio",
    viewOnExplorer: "Visualizza su explorer"
  },
  notification: {
    positive: {
      addressCopied: "Indirizzo copiato negli appunti",
      backupOwnerCopied: "Proprietario di backup copiato negli appunti",
      bannedPeer: "Peer {host} bloccato fino a {time}",
      copied: "{item} copiato negli appunti",
      decryptedONSRecord: "Record ONS per {name} decifrato con successo",
      exportTransfers: "Trasferimenti esportati in {filename}",
      itemSaved: "{item} salvato in {filename}",
      keyImages: {
        exported: "Immagini chiave esportate in {filename}",
        imported: "Immagini chiave importate"
      },
      onsRecordUpdated: "Record ONS aggiornato con successo",
      lokinetAddressCopied: "Indirizzo completo Lokinet copiato",
      lokinetNameCopied: "Nome Lokinet copiato",
      passwordUpdated: "Password aggiornata",
      namePurchased: "Nome acquistato con successo",
      nameRenewed: "Nome rinnovato con successo",
      nameCopied: "Nome copiato negli appunti",
      ownerCopied: "Proprietario copiato negli appunti",
      qrCopied: "Codice QR copiato negli appunti",
      registerServiceNodeSuccess: "Nodo di servizio registrato con successo",
      sendSuccess: "Transazione inviata con successo",
      serviceNodeInfoFilled:
        "Chiave nodo di servizio e importo minimo compilati",
      sessionIdCopied: "Session ID copiato negli appunti",
      signatureCopied: "Firma copiata negli appunti",
      signatureVerified: "Firma verificata",
      stakeSuccess: "Staking effettuato con successo",
      transactionNotesSaved: "Note transazione salvate",
      walletCopied: "Indirizzo portafoglio copiato negli appunti"
    },
    errors: {
      banningPeer: "Errore nel blocco del peer",
      cannotAccessRemoteNode:
        "Impossibile accedere al nodo remoto, prova un altro nodo remoto",
      changingPassword: "Errore nel cambio password",
      copyWalletFail: "Copia del portafoglio non riuscita",
      copyingPrivateKeys: "Errore nella copia delle chiavi private",
      dataPathNotFound: "Percorso archiviazione dati non trovato",
      decryptONSRecord: "Impossibile decifrare il record ONS per {name}",
      differentNetType: "Il nodo remoto utilizza un tipo di rete diverso",
      enterSeedWords: "Inserisci le parole seed",
      enterTransactionId: "Inserisci l'ID transazione",
      enterTransactionProof: "Inserisci la prova della transazione",
      enterWalletName: "Inserisci un nome per il portafoglio",
      enterName: "Inserisci un nome",
      errorSavingItem: "Errore nel salvataggio di {item}",
      exportTransfers: "Errore nell'esportazione dei trasferimenti",
      failedServiceNodeUnlock: "Sblocco nodo di servizio non riuscito",
      failedToSetLanguage: "Impostazione lingua non riuscita: {lang}",
      failedWalletImport: "Importazione portafoglio non riuscita",
      failedWalletOpen: "Apertura portafoglio non riuscita. Riprova.",
      failedWalletRead: "Lettura portafogli non riuscita",
      internalError: "Errore interno",
      invalidAddress: "Indirizzo non valido",
      invalidAmount: "Importo non valido",
      invalidBackupOwner: "Indirizzo proprietario di backup non valido",
      invalidNameLength: "Il nome deve essere lungo tra 1 e 64 caratteri",
      invalidNameFormat:
        "Il nome può contenere solo alfanumerici, trattini e underscore",
      invalidNameHypenNotAllowed:
        "Il nome può iniziare o terminare solo con alfanumerici o underscore",
      invalidOldPassword: "Vecchia password non valida",
      invalidOwner: "Indirizzo proprietario non valido",
      invalidPassword: "Password non valida",
      invalidPaymentId: "ID pagamento non valido",
      invalidPrivateViewKey: "Chiave privata di visualizzazione non valida",
      invalidPrivateSpendKey: "Chiave di spesa privata non valida",
      invalidPublicAddress: "Indirizzo pubblico non valido",
      invalidRestoreDate: "Data di ripristino non valida",
      invalidRestoreHeight: "Altezza di ripristino non valida",
      invalidSeedLength: "Lunghezza parole seed non valida",
      invalidServiceNodeCommand:
        "Inserisci il comando di registrazione del nodo di servizio",
      invalidServiceNodeKey: "Chiave nodo di servizio non valida",
      invalidSessionId: "Session ID non valido",
      invalidSignature: "Firma non valida",
      invalidWalletPath: "Percorso portafoglio non valido",
      keyImages: {
        exporting: "Errore nell'esportazione delle immagini chiave",
        reading: "Errore nella lettura delle immagini chiave",
        importing: "Errore nell'importazione delle immagini chiave"
      },
      negativeAmount: "L'importo non può essere negativo",
      newPasswordNoMatch: "Le nuove password non corrispondono",
      newPasswordSame: "La nuova password deve essere diversa",
      notEnoughBalance: "Saldo sbloccato insufficiente",
      passwordNoMatch: "Le password non corrispondono",
      remoteCannotBeReached: "Impossibile raggiungere il daemon remoto",
      selectWalletFile: "Seleziona un file portafoglio",
      unknownError: "Si è verificato un errore sconosciuto",
      walletAlreadyExists: "Esiste già un portafoglio con questo nome",
      walletPathNotFound: "Percorso archiviazione dati portafoglio non trovato",
      zeroAmount: "L'importo deve essere maggiore di zero"
    },
    warnings: {
      noExportTransfers: "Nessun trasferimento trovato da esportare",
      noKeyImageExport: "Nessuna immagine chiave trovata da esportare",
      usingLocalNode:
        "Impossibile accedere al nodo remoto, passaggio solo a locale",
      usingRemoteNode: "judecoind non trovato, utilizzo del nodo remoto"
    }
  },
  placeholders: {
    additionalNotes: "Note aggiuntive",
    addressBookName: "Nome associato a questo indirizzo",
    addressOfSigner: "Indirizzo pubblico del portafoglio del firmatario",
    dataToSign:
      "Dati che vuoi firmare con la chiave privata del tuo indirizzo principale",
    filterTx: "Inserisci un ID, nome, indirizzo o importo",
    hexCharacters: "{count} caratteri esadecimali",
    onsName: "Il nome da acquistare tramite Jude Name Service",
    onsBackupOwner: "L'indirizzo del portafoglio del proprietario di backup",
    onsDecryptName: "Un nome ONS che ti appartiene",
    lokinetFullAddress:
      "Indirizzo completo Lokinet a cui mappare il nome ONS (senza .loki)",
    mnemonicSeed: "Seed mnemonico di 25 parole",
    pasteTransactionId: "Incolla ID transazione",
    pasteTransactionProof: "Incolla prova transazione",
    proveOptionalMessage:
      "Messaggio opzionale contro cui la firma è stata generata",
    recipientWalletAddress: "Indirizzo portafoglio del destinatario",
    selectAFile: "Seleziona un file",
    sessionId: "Il Session ID da collegare al Jude Name Service",
    signature: "Firma da verificare",
    transactionNotes: "Note aggiuntive da allegare localmente alla transazione",
    unsignedData: "I dati come dovrebbero apparire prima della firma",
    walletAddress: "Indirizzo portafoglio a cui mappare il nome ONS",
    walletName: "Un nome per il tuo portafoglio",
    walletPassword: "Password del portafoglio"
  },
  strings: {
    addAddressBookEntry: "Aggiungi voce rubrica",
    addressBookDetails: "Dettagli rubrica",
    addressBookIsEmpty: "La rubrica è vuota",
    addresses: {
      myPrimaryAddress: "Il mio indirizzo principale",
      myUnusedAddresses: "I miei indirizzi non utilizzati",
      myUsedAddresses: "I miei indirizzi utilizzati",
      primaryAddress: "Indirizzo principale",
      subAddress: "Sotto-indirizzo",
      subAddressIndex: "Indice {index}"
    },
    advancedOptions: "Opzioni Avanzate",
    awaitingConfirmation: "In attesa di conferma",
    bannedPeers: {
      title:
        "Peer bloccati (i blocchi verranno rimossi al riavvio del portafoglio)",
      bannedUntil: "Bloccato fino a {time}"
    },
    blockHeight: "Altezza",
    cannotSign: "Non puoi firmare con un portafoglio di sola visualizzazione.",
    checkTransaction: {
      description:
        "Verifica che i fondi siano stati inviati a un indirizzo fornendo l'ID transazione, l'indirizzo del destinatario, il messaggio usato per la firma e la firma.\nPer una 'Prova di Spesa' non è necessario fornire l'indirizzo del destinatario.",
      infoTitles: {
        confirmations: "Conferme",
        inPool: "In pool",
        validTransaction: "Transazione valida",
        received: "Importo ricevuto"
      },
      validTransaction: {
        no: "NO",
        yes: "SÌ"
      }
    },
    closing: "Chiusura",
    connectingToBackend: "Connessione al backend",
    contribution: "Contributo",
    contributor: "Contributore",
    daemon: {
      local: {
        title: "Solo Daemon Locale",
        description:
          "Sicurezza completa, il portafoglio scaricherà l'intera blockchain. Non potrai effettuare transazioni fino al completamento della sincronizzazione."
      },
      localRemote: {
        title: "Daemon Locale + Remoto",
        description:
          "Inizia rapidamente con questa opzione predefinita. Il portafoglio scaricherà l'intera blockchain, ma utilizzerà un nodo remoto durante la sincronizzazione."
      },
      remote: {
        title: "Solo Daemon Remoto",
        description:
          "Sicurezza ridotta, il portafoglio si connetterà a un nodo remoto per effettuare tutte le transazioni."
      }
    },
    destinationUnknown: "Destinazione Sconosciuta",
    editAddressBookEntry: "Modifica voce rubrica",
    expirationHeight: "Altezza di scadenza",
    nextPayout: "Prossimo pagamento",
    ons: {
      sessionID: "Session ID",
      wallet: "Indirizzo Portafoglio",
      lokinetName1Year: "Nome Lokinet 1 anno",
      lokinetNameXYears: "Nome Lokinet {years} anni",
      prices: "Prezzi ONS:"
    },
    onsPurchaseDescription:
      "Acquista o aggiorna un record ONS. Se acquisti un nome, potrebbe essere necessario un minuto o due prima che appaia nell'elenco.",
    onsDescription:
      "Qui puoi trovare tutti i nomi ONS posseduti da questo portafoglio. Decifrando un record che possiedi otterrai il nome e il valore di quel record ONS.",
    hardwareWallet: "Portafoglio hardware",
    hardwareWallets: "Portafogli hardware",
    loadingSettings: "Caricamento impostazioni",
    judecoinBalance: "Saldo",
    lokinetNameDescription:
      "Acquista o aggiorna un nome su Lokinet. Se acquisti un nome potrebbe essere necessario un minuto o due prima che appaia nell'elenco. Per saperne di più su Lokinet visita: ",
    judecoinAccumulatedRewards: "Ricompense accumulate",
    judecoinUnlockedBalance: "Saldo sbloccato",
    judecoinUnlockedShort: "Sbloccato",
    me: "Io",
    noTransactionsFound: "Nessuna transazione trovata",
    notes: "Note",
    numberOfUnspentOutputs: "Numero di output non spesi",
    operator: "Operatore",
    paymentID: "ID Pagamento",
    peerList: "Lista peer",
    priorityOptions: {
      automatic: "Automatico",
      slow: "Lento",
      normal: "Normale",
      fast: "Veloce",
      fastest: "Velocissimo",
      blink: "Blink"
    },

    proveTransactionDescription:
      "Genera una prova del tuo pagamento in entrata/uscita fornendo l'ID transazione, l'indirizzo del destinatario e un messaggio opzionale.\nPer i pagamenti in uscita, puoi ottenere una 'Prova di Spesa' che dimostra la paternità di una transazione. In questo caso, non è necessario specificare l'indirizzo del destinatario.",
    readingWalletList: "Lettura lista portafogli",
    recentIncomingTransactionsToAddress:
      "Transazioni recenti in entrata a questo indirizzo",
    recentTransactionsWithAddress: "Transazioni recenti con questo indirizzo",
    regularWallets: "Portafogli normali",
    rescanModalDescription:
      "Seleziona riscansione completa o riscansione dei soli output spesi.",
    saveSeedWarning: "Copia e salva queste informazioni in un luogo sicuro!",
    saveToAddressBook: "Salva nella rubrica",
    seedWords: "Parole seed",
    selectLanguage: "Seleziona lingua",
    registrationStakingMigrationJudecoinToSessionToken:
      "La registrazione e lo staking in nuovi Nodi di Servizio sono disabilitati a causa della migrazione in corso da Jude a Session Token. Leggi di più qui: ",
    serviceNodeContributionDescription:
      "Lo staking contribuisce alla sicurezza della rete Judecoin. Per il tuo contributo, guadagni JUDE. Una volta effettuato lo staking, dovrai attendere 180 giorni per sbloccare i tuoi JUDE. Per saperne di più sullo staking, visita il",
    serviceNodeRegistrationDescription:
      'Inserisci il comando {registerCommand} prodotto dal daemon che si sta registrando per diventare un Nodo di Servizio utilizzando il comando "{prepareCommand}"',
    serviceNodeStartStakingDescription:
      "Per iniziare lo staking, visita la scheda Staking",
    noServiceNodesCurrentlyAvailable:
      "Attualmente non ci sono nodi di servizio disponibili per il contributo",
    serviceNodeDetails: {
      contributors: "Contributori",
      lastRewardBlockHeight: "Altezza blocco ultima ricompensa",
      lastUptimeProof: "Ultima prova di attività",
      maxContribution: "Contributo massimo",
      minContribution: "Contributo minimo",
      operatorFee: "Commissione Operatore",
      registrationHeight: "Altezza di registrazione",
      unlockHeight: "Altezza di sblocco",
      reserved: "Riservato",
      serviceNodeKey: "Chiave Nodo di Servizio",
      snKey: "Chiave SN",
      stakingRequirement: "Requisito di staking",
      totalContributed: "Totale contribuito"
    },
    signAndVerifyDescription:
      "Firma dati con la chiave privata del tuo indirizzo principale o verifica una firma rispetto a un indirizzo pubblico.",
    spendKey: "Chiave di spesa",
    stake: "Staking",
    startingDaemon: "Avvio daemon",
    startingWallet: "Avvio portafoglio",
    recipientN: "Destinatario #{index}",
    switchToDateSelect: "Passa a selezione per data",
    switchToHeightSelect: "Passa a selezione per altezza",
    themes: {
      dark: "Scuro",
      light: "Chiaro",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "Sincronizzazione Daemon",
    transactionID: "ID Transazione",
    transactionConfirmed: "confermata",
    transactions: {
      amount: "Importo",
      description: "Transazione {type}",
      fee: "Commissione",
      paidBySender: "pagata dal mittente",
      received: "Ricevuta",
      sent: "Inviata",
      sentTo: "Transazione {type} inviata a",
      timestamp: "Data e ora",
      types: {
        all: "Tutte",
        incoming: "In entrata",
        outgoing: "In uscita",
        pending: "In sospeso",
        pendingIncoming: "In entrata in sospeso",
        pendingOutgoing: "In uscita in sospeso",
        miner: "Miner",
        serviceNode: "Nodo di Servizio",
        governance: "Governance",
        stake: "Stake",
        failed: "Non riuscita"
      }
    },
    unlockingAtHeight: "Sblocco all'altezza {number}",
    unspentOutputs: "Output non spesi",
    userNotUsedAddress: "Non hai utilizzato questo indirizzo",
    userUsedAddress: "Hai utilizzato questo indirizzo",
    viewKey: "Chiave di visualizzazione",
    viewOnlyMode:
      "Modalità di sola visualizzazione. Carica il portafoglio completo per inviare monete.",
    website: "sito web della community"
  },
  titles: {
    addressBook: "Rubrica",
    addressDetails: "Dettagli indirizzo",
    advanced: {
      checkTransaction: "VERIFICA TRANSAZIONE",
      prove: "PROVA",
      signAndVerify: "FIRMA/VERIFICA",
      sign: "Firma",
      verify: "Verifica"
    },
    availableForContribution: "Nodi di servizio disponibili per il contributo",
    changePassword: "Cambia password",
    configure: "Configura",
    currentlyStakedNodes: "Nodi attualmente in staking",
    onsRecordDetails: "Dettagli record ONS",
    onsSessionRecords: "Record Session",
    onsLokinetRecords: "Record Lokinet",
    onsWalletRecords: "Record Portafoglio",
    privateKeys: "Seed e chiavi",
    rescanWallet: "Riscansiona portafoglio",
    ons: {
      purchase: "ACQUISTA",
      myOns: "I MIEI ONS"
    },
    serviceNode: {
      registration: "REGISTRAZIONE",
      staking: "STAKING",
      myStakes: "I MIEI STAKE"
    },

    serviceNodeDetails: "Dettagli nodo di servizio",
    settings: {
      title: "Impostazioni",
      tabs: {
        general: "Generale",
        language: "Lingua",
        peers: "Peer",
        wallet: "Portafoglio"
      }
    },
    transactionDetails: "Dettagli transazione",
    transactions: "Transazioni",
    wallet: {
      createNew: "Crea nuovo portafoglio",
      createdOrRestored: "Portafoglio creato/ripristinato",
      importFromFile: "Importa portafoglio da file",
      importFromLegacyGUI: "Importa portafoglio dalla GUI precedente",
      importFromOldGUI: "Importa portafoglio dalla vecchia GUI",
      restoreFromSeed: "Ripristina portafoglio da seed",
      restoreFromKeys: "Ripristina portafoglio da chiavi",
      restoreViewOnly: "Ripristina portafoglio di sola visualizzazione"
    },
    welcome: "Benvenuto",
    welcomeToJude: "Benvenuto in JUDE",
    yourWallets: "I Tuoi Portafogli"
  }
};
