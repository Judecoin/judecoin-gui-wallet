export default {
  nav: {
    send: "Verzenden",
    addressBook: "Adresboek",
    receive: "Ontvangen",
    transactions: "Transacties",
    staking: "Staking",
    advanced: "Geavanceerd",
    settings: "Instellingen",
    addRecipient: "Ontvanger toevoegen",
    addDescription: "Beschrijving toevoegen",
    walletSynced: "Wallet is gesynchroniseerd",
    walletSyncing: "Wallet synchroniseert ({pct}%)",
    daemonSynced: "Daemon is gesynchroniseerd ({height})",
    daemonSyncing: "Daemon synchroniseert ({pct}%)",
    networkStatus: "Netwerkstatus",
    remoteNode: "Externe node",
    localNode: "Lokale node"
  },
  buttons: {
    // All button text is uppercased in the gui
    advanced: "GEAVANCEERD",
    all: "ALLES",
    back: "TERUG",
    browse: "BLADEREN",
    cancel: "ANNULEREN",
    change: "WIJZIGEN",
    check: "CONTROLEREN",
    clear: "WISSEN",
    close: "SLUITEN",
    contacts: "CONTACTEN",
    copyAddress: "ADRES KOPIËREN",
    copyData: "GEGEVENS KOPIËREN",
    copySignature: "HANDTEKENING KOPIËREN",
    createWallet: "PORTEMONNEE AANMAKEN",
    decrypt: "ONTSLEUTELEN",
    delete: "VERWIJDEREN",
    edit: "BEWERKEN",
    export: "EXPORTEREN",
    generate: "GENEREREN",
    import: "IMPORTEREN",
    importWallet: "PORTEMONNEE IMPORTEREN | PORTEMONNEES IMPORTEREN",
    ons: "JUDE NAME SERVICE",
    max: "MAX",
    min: "MIN",
    next: "VOLGENDE",
    openWallet: "PORTEMONNEE OPENEN",
    purchase: "KOPEN",
    receive: "ONTVANGEN",
    registerServiceNode: "SERVICE NODE REGISTREREN",
    renew: "VERLENGEN",
    rescan: "OPNIEUW SCANNEN",
    restoreWallet: "PORTEMONNEE HERSTELLEN",
    save: "OPSLAAN",
    saveTxNotes: "TX NOTITIES OPSLAAN",
    selectLocation: "LOCATIE SELECTEREN",
    selectWalletFile: "PORTEMONNEEBESTAND SELECTEREN",
    send: "VERZENDEN",
    sendCoins: "MUNTEN VERZENDEN",
    serviceNode: "SERVICE NODES",
    settings: "INSTELLINGEN",
    showQRCode: "QR-CODE TONEN",
    showTxDetails: "TX DETAILS TONEN",
    sign: "ONDERTEKENEN",
    stake: "STAKEN",
    sweepAll: "ALLES OPVEGEN",
    unlock: "ONTGRENDELEN",
    update: "BIJWERKEN",
    verify: "VERIFIËREN",
    addRecipient: "ONTVANGER TOEVOEGEN",
    viewOnExplorer: "BEKIJK OP EXPLORER"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "OK",
      cancel: "ANNULEREN",
      open: "OPENEN"
    },

    // Dialogs
    banPeer: {
      title: "Peer blokkeren",
      peerDetailsTitle: "Peer details",
      message:
        "Voer de duur in om de peer te blokkeren in seconden.\nStandaard 3600 = 1 uur.",
      ok: "Peer blokkeren"
    },
    copyAddress: {
      title: "Adres kopiëren",
      message:
        "Er is een betalings-ID gekoppeld aan dit adres.\nZorg ervoor dat u de betalings-ID apart kopieert."
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "Kopieer {type}",
      message:
        "Wees voorzichtig met wie u uw privésleutels deelt, aangezien zij controle hebben over uw tegoeden.",
      seedWords: "Herstelwoorden",
      viewKey: "Weergavesleutel",
      spendKey: "Bestedingssleutel"
    },
    deleteWallet: {
      title: "Portemonnee verwijderen",
      message:
        "Weet u absoluut zeker dat u uw portemonnee wilt verwijderen?\nZorg ervoor dat u een back-up van uw privésleutels hebt gemaakt.\nDIT PROCES IS NIET OMKEERBAAR!",
      ok: "VERWIJDEREN"
    },
    exit: {
      title: "Afsluiten",
      message: "Weet u zeker dat u wilt afsluiten?",
      ok: "AFSLUITEN"
    },
    exportTransfers: {
      title: "Transacties exporteren naar CSV",
      message: "Wilt u transacties exporteren?",
      export: "Exporteren"
    },
    keyImages: {
      title: "{type} sleutelafbeeldingen",
      message: "Wilt u sleutelafbeeldingen {type}?",
      export: "Exporteren",
      import: "Importeren"
    },
    onsUpdate: {
      title: "ONS-record bijwerken",
      message: "Wilt u het ONS-record bijwerken?",
      ok: "BIJWERKEN"
    },
    noPassword: {
      title: "Geen wachtwoord ingesteld",
      message:
        "Weet u zeker dat u een portemonnee zonder wachtwoord wilt aanmaken?",
      ok: "JA"
    },
    password: {
      title: "Wachtwoord",
      message: "Voer het portemonnee-wachtwoord in om door te gaan."
    },
    purchase: {
      title: "Naam kopen",
      message: "Wilt u de naam kopen?",
      ok: "KOPEN"
    },
    renew: {
      title: "Naam verlengen",
      message: "Wilt u de naam verlengen?",
      ok: "VERLENGEN"
    },
    registerServiceNode: {
      title: "Service node registreren",
      message: "Wilt u de service node registreren?",
      ok: "REGISTREREN"
    },
    rescan: {
      title: "Portemonnee opnieuw scannen",
      message:
        "Waarschuwing: Sommige informatie over eerdere transacties\nzoals het adres van de ontvanger gaat verloren.",
      ok: "OPNIEUW SCANNEN"
    },
    restart: {
      title: "Herstarten",
      message: "Wijzigingen vereisen een herstart. Wilt u nu herstarten?",
      ok: "HERSTARTEN"
    },
    showPrivateKeys: {
      title: "Seed en sleutels tonen",
      message: "Wilt u uw privésleutels bekijken?",
      ok: "TONEN"
    },
    signature: {
      title: "Handtekening",
      message:
        "Kopieer hieronder de gegevens ondertekend door de privésleutel van uw primaire adres"
    },
    stake: {
      title: "Staken",
      message: "Wilt u staken?",
      ok: "STAKEN"
    },
    sweepAll: {
      title: "Alles opvegen",
      message: "Wilt u alles opvegen?",
      ok: "ALLES OPVEGEN"
    },
    sweepAllWarning: {
      title: "Waarschuwing alles opvegen",
      message:
        "U staat op het punt al uw onbestede tegoeden te combineren door een transactie naar uzelf te versturen. Uw portemonnee kan tijdelijk een saldo van 0 tonen. Na 10 blokken worden uw tegoeden ontgrendeld en kunt u normaal staken.",
      ok: "DOORGAAN"
    },
    switchWallet: {
      title: "Portemonnee wisselen",
      closeMessage: "Weet u zeker dat u de huidige portemonnee wilt sluiten?",
      restartMessage:
        "De portemonnee-RPC is momenteel aan het synchroniseren. \nAls u van portemonnee wilt wisselen, moet u de applicatie herstarten. \nU verliest uw synchronisatievoortgang en moet de blockchain opnieuw scannen.",
      restartWalletMessage:
        "Als u van portemonnee wilt wisselen, moet u de applicatie herstarten. Weet u zeker dat u de huidige portemonnee wilt sluiten en herstarten?"
    },
    transactionDetails: {
      title: "Transactiedetails",
      ok: "SLUITEN"
    },
    transfer: {
      title: "Overschrijving",
      message: "Wilt u de transactie verzenden?",
      ok: "VERZENDEN"
    },
    confirmTransaction: {
      title: "Transactie bevestigen",
      sendTo: "Verzenden naar",
      priority: "Prioriteit"
    },
    unlockConfirm: {
      title: "Ontgrendeling bevestigen",
      ok: "ONTGRENDELEN"
    },
    unlockServiceNode: {
      title: "Service node ontgrendelen",
      confirmTitle: "Ontgrendeling bevestigen",
      message: "Wilt u de service node ontgrendelen?",
      ok: "ONTGRENDELEN"
    },
    unlockServiceNodeWarning: {
      title: "Waarschuwing service node ontgrendelen",
      message:
        "Het ontgrendelen van een gedeeltelijke inzet in een node zal ook de inzet van andere deelnemers ongedaan maken. Als u in een gedeelde node staakt, is het het beste om de operator en andere deelnemers te laten weten dat u uw inzet terugtrekt.",
      ok: "DOORGAAN"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "ADRES",
    amount: "BEDRAG",
    backupOwner: "BACK-UP EIGENAAR",
    confirmPassword: "WACHTWOORD BEVESTIGEN",
    daemonLogLevel: "DAEMON LOGNIVEAU",
    daemonP2pPort: "DAEMON P2P-POORT",
    data: "GEGEVENS",
    dataStoragePath: "GEGEVENSOPSLAGPAD",
    decryptRecord: "RECORD ONTSLEUTELEN",
    exportTransfers: {
      exportDirectory: "CSV EXPORTMAP"
    },
    filter: "FILTER",
    filterTransactionType: "FILTEREN OP TRANSACTIETYPE",
    internalWalletPort: "INTERNE PORTEMONNEE-POORT",
    keyImages: {
      exportDirectory: "SLEUTELAFBEELDING EXPORTMAP",
      importFile: "SLEUTELAFBEELDING IMPORTBESTAND"
    },
    limitDownloadRate: "DOWNLOADSNELHEID BEPERKEN",
    limitUploadRate: "UPLOADSNELHEID BEPERKEN",
    onsType: "ONS-RECORDTYPE",
    localDaemonIP: "LOKALE DAEMON IP",
    localDaemonPort: "LOKALE DAEMON-POORT",
    lokinetFullAddress: "VOLLEDIG LOKINET-ADRES",
    maxIncomingPeers: "MAX INKOMENDE PEERS",
    maxOutgoingPeers: "MAX UITGAANDE PEERS",
    message: "BERICHT",
    mnemonicSeed: "MNEMONISCHE SEED",
    name: "NAAM",
    newWalletName: "NIEUWE PORTEMONNEENAAM",
    notes: "NOTITIES",
    optional: "OPTIONEEL",
    owner: "EIGENAAR",
    password: "WACHTWOORD",
    paymentId: "BETALINGS-ID",
    priority: "PRIORITEIT",
    remoteNodeHost: "EXTERNE NODE HOST",
    remoteNodePort: "EXTERNE NODE-POORT",
    restoreFromBlockHeight: "HERSTELLEN VANAF BLOKHOOGTE",
    restoreFromDate: "HERSTELLEN VANAF DATUM",
    seedLanguage: "SEED-TAAL",
    serviceNodeCommand: "SERVICE NODE OPDRACHT",
    serviceNodeKey: "SERVICE NODE SLEUTEL",
    sessionId: "SESSION ID",
    signature: "HANDTEKENING",
    transactionId: "TRANSACTIE-ID",
    walletAddress: "PORTEMONNEE-ADRES",
    walletFile: "PORTEMONNEEBESTAND",
    walletLogLevel: "PORTEMONNEE LOGNIVEAU",
    walletName: "PORTEMONNEENAAM",
    walletRPCPort: "PORTEMONNEE RPC-POORT",
    walletStoragePath: "PORTEMONNEE OPSLAGPAD",
    theme: "THEMA",
    privateViewKey: "PRIVÉWEERGAVESLEUTEL",
    privateSpendKey: "PRIVÉBESTEDINGSSLEUTEL",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "Nieuw wachtwoord bevestigen",
    newPassword: "Nieuw wachtwoord",
    oldPassword: "Oud wachtwoord",
    rescanFullBlockchain: "Volledige blockchain opnieuw scannen",
    rescanSpentOutputs: "Bestede outputs opnieuw scannen",
    transactionNotes: "Transactienotities",
    chooseNetwork: "Kies een netwerk",
    network: "Netwerk"
  },
  footer: {
    ready: "GEREED",
    scanning: "SCANNEN",
    status: "Status",
    syncing: "SYNCHRONISEREN",
    remote: "Extern",
    wallet: "Portemonnee",
    updateRequired: "UPDATE VEREIST"
  },
  menuItems: {
    cut: "Knippen",
    copy: "Kopiëren",
    paste: "Plakken",
    selectAll: "Alles selecteren",
    about: "Over",
    changePassword: "Wachtwoord wijzigen",
    copyAddress: "Adres kopiëren",
    copyBackupOwner: "Back-up eigenaar kopiëren",
    copyLokinetAddress: "Lokinet-adres kopiëren",
    copyLokinetName: "Lokinet-naam kopiëren",
    copyName: "Naam kopiëren",
    copyOwner: "Eigenaar kopiëren",
    copyQR: "QR-code kopiëren",
    copySeedWords: "Herstelwoorden kopiëren",
    copySessionId: "Session ID kopiëren",
    copySpendKey: "Bestedingssleutel kopiëren",
    copyServiceNodeKey: "Service node sleutel kopiëren",
    copyTransactionId: "Transactie-ID kopiëren",
    copyViewKey: "Weergavesleutel kopiëren",
    createNewWallet: "Nieuwe portemonnee aanmaken",
    deleteWallet: "Portemonnee verwijderen",
    exportTransfers: "Transacties exporteren",
    exit: "Jude GUI Portemonnee afsluiten",
    importOldGUIWallet: "Portemonnees importeren uit oude GUI",
    manageKeyImages: "Sleutelafbeeldingen beheren",
    openWallet: "Portemonnee openen",
    rescanWallet: "Portemonnee opnieuw scannen",
    restoreWalletFile: "Portemonnee herstellen vanuit bestand",
    restoreWalletSeed: "Portemonnee herstellen vanuit seed",
    saveQR: "QR-code opslaan als bestand",
    sendToThisAddress: "Verzenden naar dit adres",
    settings: "Instellingen",
    showDetails: "Details tonen",
    showPrivateKeys: "Seed en sleutels tonen",
    showQRCode: "QR-code tonen",
    switchWallet: "Portemonnee wisselen",
    viewOnExplorer: "Bekijk op explorer"
  },
  notification: {
    positive: {
      addressCopied: "Adres gekopieerd naar klembord",
      backupOwnerCopied: "Back-up eigenaar gekopieerd naar klembord",
      bannedPeer: "{host} geblokkeerd tot {time}",
      copied: "{item} gekopieerd naar klembord",
      decryptedONSRecord: "ONS-record voor {name} succesvol ontsleuteld",
      exportTransfers: "Transacties geëxporteerd naar {filename}",
      itemSaved: "{item} opgeslagen in {filename}",
      keyImages: {
        exported: "Sleutelafbeeldingen geëxporteerd naar {filename}",
        imported: "Sleutelafbeeldingen geïmporteerd"
      },
      onsRecordUpdated: "ONS-record is succesvol bijgewerkt",
      lokinetAddressCopied: "Volledig Lokinet-adres gekopieerd",
      lokinetNameCopied: "Lokinet-naam gekopieerd",
      passwordUpdated: "Wachtwoord bijgewerkt",
      namePurchased: "Naam succesvol gekocht",
      nameRenewed: "Naam succesvol verlengd",
      nameCopied: "Naam gekopieerd naar klembord",
      ownerCopied: "Eigenaar gekopieerd naar klembord",
      qrCopied: "QR-code gekopieerd naar klembord",
      registerServiceNodeSuccess: "Service node succesvol geregistreerd",
      sendSuccess: "Transactie succesvol verzonden",
      serviceNodeInfoFilled: "Service node sleutel en minimumbedrag ingevuld",
      sessionIdCopied: "Session ID gekopieerd naar klembord",
      signatureCopied: "Handtekening gekopieerd naar klembord",
      signatureVerified: "Handtekening geverifieerd",
      stakeSuccess: "Succesvol gestaked",
      transactionNotesSaved: "Transactienotities opgeslagen",
      walletCopied: "Portemonnee-adres gekopieerd naar klembord"
    },
    errors: {
      banningPeer: "Fout bij het blokkeren van peer",
      cannotAccessRemoteNode:
        "Kan externe node niet bereiken, probeer een andere externe node",
      changingPassword: "Fout bij het wijzigen van wachtwoord",
      copyWalletFail: "Portemonnee kopiëren mislukt",
      copyingPrivateKeys: "Fout bij het kopiëren van privésleutels",
      dataPathNotFound: "Gegevensopslagpad niet gevonden",
      decryptONSRecord: "Ontsleutelen van ONS-record voor {name} mislukt",
      differentNetType: "Externe node gebruikt een ander netwerktype",
      enterSeedWords: "Voer herstelwoorden in",
      enterTransactionId: "Voer transactie-ID in",
      enterTransactionProof: "Voer transactiebewijs in",
      enterWalletName: "Voer een portemonneenaam in",
      enterName: "Voer een naam in",
      errorSavingItem: "Fout bij het opslaan van {item}",
      exportTransfers: "Fout bij het exporteren van transacties",
      failedServiceNodeUnlock: "Ontgrendelen van service node mislukt",
      failedToSetLanguage: "Taal instellen mislukt: {lang}",
      failedWalletImport: "Portemonnee importeren mislukt",
      failedWalletOpen: "Portemonnee openen mislukt. Probeer het opnieuw.",
      failedWalletRead: "Portemonnees lezen mislukt",
      internalError: "Interne fout",
      invalidAddress: "Adres is niet geldig",
      invalidAmount: "Bedrag is niet geldig",
      invalidBackupOwner: "Back-up eigenaaradres is niet geldig",
      invalidNameLength: "Naam moet tussen 1 en 64 tekens lang zijn",
      invalidNameFormat:
        "Naam mag alleen alfanumerieke tekens, koppeltekens en underscores bevatten",
      invalidNameHypenNotAllowed:
        "Naam mag alleen beginnen of eindigen met alfanumerieke tekens of een underscore",
      invalidOldPassword: "Ongeldig oud wachtwoord",
      invalidOwner: "Eigenaaradres is niet geldig",
      invalidPassword: "Ongeldig wachtwoord",
      invalidPaymentId: "Betalings-ID is niet geldig",
      invalidPrivateViewKey: "Ongeldige privé-weergavesleutel",
      invalidPrivateSpendKey: "Ongeldige privébestedingssleutel",
      invalidPublicAddress: "Ongeldig openbaar adres",
      invalidRestoreDate: "Ongeldige hersteldatum",
      invalidRestoreHeight: "Ongeldige herstelhoogte",
      invalidSeedLength: "Ongeldige lengte van herstelwoorden",
      invalidServiceNodeCommand:
        "Voer de registratieopdracht voor de service node in",
      invalidServiceNodeKey: "Service node sleutel is niet geldig",
      invalidSessionId: "Session ID is niet geldig",
      invalidSignature: "Ongeldige handtekening",
      invalidWalletPath: "Ongeldig portemonneepad",
      keyImages: {
        exporting: "Fout bij het exporteren van sleutelafbeeldingen",
        reading: "Fout bij het lezen van sleutelafbeeldingen",
        importing: "Fout bij het importeren van sleutelafbeeldingen"
      },
      negativeAmount: "Bedrag kan niet negatief zijn",
      newPasswordNoMatch: "Nieuwe wachtwoorden komen niet overeen",
      newPasswordSame: "Nieuw wachtwoord moet anders zijn",
      notEnoughBalance: "Niet genoeg ontgrendeld saldo",
      passwordNoMatch: "Wachtwoorden komen niet overeen",
      remoteCannotBeReached: "Externe daemon is niet bereikbaar",
      selectWalletFile: "Selecteer een portemonneebestand",
      unknownError: "Er is een onbekende fout opgetreden",
      walletAlreadyExists: "Portemonnee met deze naam bestaat al",
      walletPathNotFound: "Portemonnee-gegevensopslagpad niet gevonden",
      zeroAmount: "Bedrag moet groter zijn dan nul"
    },
    warnings: {
      noExportTransfers: "Geen transacties gevonden om te exporteren",
      noKeyImageExport: "Geen sleutelafbeeldingen gevonden om te exporteren",
      usingLocalNode:
        "Kan externe node niet bereiken, wordt overgeschakeld naar alleen lokaal",
      usingRemoteNode: "judecoind niet gevonden, externe node wordt gebruikt"
    }
  },
  placeholders: {
    additionalNotes: "Aanvullende notities",
    addressBookName: "Naam die bij dit adres hoort",
    addressOfSigner: "Openbaar portemonnee-adres van ondertekenaar",
    dataToSign:
      "Gegevens die u wilt ondertekenen met de privésleutel van uw primaire adres",
    filterTx: "Voer een ID, naam, adres of bedrag in",
    hexCharacters: "{count} hexadecimale tekens",
    onsName: "De naam om te kopen via Jude Name Service",
    onsBackupOwner: "Het portemonnee-adres van de back-up eigenaar",
    onsDecryptName: "Een ONS-naam die van u is",
    lokinetFullAddress:
      "Volledig Lokinet-adres om ONS-naam aan te koppelen (zonder .loki)",
    mnemonicSeed: "25 woorden mnemonische seed",
    pasteTransactionId: "Transactie-ID plakken",
    pasteTransactionProof: "Transactiebewijs plakken",
    proveOptionalMessage:
      "Optioneel bericht waartegen de handtekening is ondertekend",
    recipientWalletAddress: "Portemonnee-adres van de ontvanger",
    selectAFile: "Selecteer een bestand",
    sessionId: "De Session ID om te koppelen aan Jude Name Service",
    signature: "Te verifiëren handtekening",
    transactionNotes:
      "Aanvullende notities om lokaal aan de transactie te koppelen",
    unsignedData:
      "De gegevens zoals ze eruit moeten zien voordat ze werden ondertekend",
    walletAddress: "Portemonnee-adres om ONS-naam aan te koppelen",
    walletName: "Een naam voor uw portemonnee",
    walletPassword: "Wachtwoord voor de portemonnee"
  },
  strings: {
    addAddressBookEntry: "Adresboekvermelding toevoegen",
    addressBookDetails: "Adresboekdetails",
    addressBookIsEmpty: "Adresboek is leeg",
    addresses: {
      myPrimaryAddress: "Mijn primaire adres",
      myUnusedAddresses: "Mijn ongebruikte adressen",
      myUsedAddresses: "Mijn gebruikte adressen",
      primaryAddress: "Primair adres",
      subAddress: "Subadres",
      subAddressIndex: "Index {index}"
    },
    advancedOptions: "Geavanceerde opties",
    awaitingConfirmation: "Wacht op bevestiging",
    bannedPeers: {
      title:
        "Geblokkeerde peers (blokkades worden gewist als de portemonnee herstart wordt)",
      bannedUntil: "Geblokkeerd tot {time}"
    },
    blockHeight: "Hoogte",
    cannotSign: "U kunt niet ondertekenen met een alleen-lezen portemonnee.",
    checkTransaction: {
      description:
        "Verifieer dat er tegoeden naar een adres zijn betaald door de transactie-ID, het adres van de ontvanger, het bericht dat is gebruikt voor ondertekening en de handtekening te verstrekken.\nVoor een 'Bestedingsbewijs' hoeft u het adres van de ontvanger niet op te geven.",
      infoTitles: {
        confirmations: "Bevestigingen",
        inPool: "In pool",
        validTransaction: "Geldige transactie",
        received: "Ontvangen bedrag"
      },
      validTransaction: {
        no: "NEE",
        yes: "JA"
      }
    },
    closing: "Afsluiten",
    connectingToBackend: "Verbinden met backend",
    contribution: "Bijdrage",
    contributor: "Bijdrager",
    daemon: {
      local: {
        title: "Alleen lokale daemon",
        description:
          "Volledige beveiliging, de portemonnee downloadt de volledige blockchain. U kunt geen transacties uitvoeren totdat de synchronisatie is voltooid."
      },
      localRemote: {
        title: "Lokale + externe daemon",
        description:
          "Ga snel aan de slag met deze standaardoptie. De portemonnee downloadt de volledige blockchain, maar gebruikt een externe node tijdens het synchroniseren."
      },
      remote: {
        title: "Alleen externe daemon",
        description:
          "Minder beveiliging, de portemonnee maakt verbinding met een externe node voor alle transacties."
      }
    },
    destinationUnknown: "Bestemming onbekend",
    editAddressBookEntry: "Adresboekvermelding bewerken",
    expirationHeight: "Verloopdatum hoogte",
    nextPayout: "Volgende uitbetaling",
    ons: {
      sessionID: "Session ID",
      wallet: "Portemonnee-adres",
      lokinetName1Year: "Lokinet-naam 1 jaar",
      lokinetNameXYears: "Lokinet-naam {years} jaar",
      prices: "ONS-prijzen:"
    },
    onsPurchaseDescription:
      "Koop of werk een ONS-record bij. Als u een naam koopt, kan het een minuut of twee duren voordat deze in de lijst verschijnt.",
    onsDescription:
      "Hier vindt u alle ONS-namen die eigendom zijn van deze portemonnee. Het ontsleutelen van een record dat u bezit, geeft de naam en waarde van dat ONS-record terug.",
    hardwareWallet: "Hardware-portemonnee",
    hardwareWallets: "Hardware-portemonnees",
    loadingSettings: "Instellingen laden",
    judecoinBalance: "Saldo",
    lokinetNameDescription:
      "Koop of werk een naam bij op Lokinet. Als u een naam koopt, kan het een minuut of twee duren voordat deze in de lijst verschijnt. Bezoek voor meer informatie over Lokinet: ",
    judecoinAccumulatedRewards: "Opgebouwde beloningen",
    judecoinUnlockedBalance: "Ontgrendeld saldo",
    judecoinUnlockedShort: "Ontgrendeld",
    me: "Ik",
    noTransactionsFound: "Geen transacties gevonden",
    notes: "Notities",
    numberOfUnspentOutputs: "Aantal onbestede outputs",
    operator: "Operator",
    paymentID: "Betalings-ID",
    peerList: "Peerlijst",
    priorityOptions: {
      automatic: "Automatisch",
      slow: "Langzaam",
      normal: "Normaal",
      fast: "Snel",
      fastest: "Snelst",
      blink: "Blink"
    },

    proveTransactionDescription:
      "Genereer een bewijs van uw inkomende/uitgaande betaling door de transactie-ID, het adres van de ontvanger en een optioneel bericht te verstrekken.\nVoor uitgaande betalingen kunt u een 'Bestedingsbewijs' verkrijgen dat het auteurschap van een transactie bewijst. In dat geval hoeft u het adres van de ontvanger niet op te geven.",
    readingWalletList: "Portemonneelijst lezen",
    recentIncomingTransactionsToAddress:
      "Recente inkomende transacties naar dit adres",
    recentTransactionsWithAddress: "Recente transacties met dit adres",
    regularWallets: "Reguliere portemonnees",
    rescanModalDescription:
      "Selecteer volledig opnieuw scannen of alleen bestede outputs opnieuw scannen.",
    saveSeedWarning: "Kopieer en bewaar deze op een veilige locatie!",
    saveToAddressBook: "Opslaan in adresboek",
    seedWords: "Herstelwoorden",
    selectLanguage: "Taal selecteren",
    registrationStakingMigrationJudecoinToSessionToken:
      "Registratie en staking in nieuwe Service Nodes is uitgeschakeld vanwege de lopende migratie van Jude naar Session Token. Lees hier meer: ",
    serviceNodeContributionDescription:
      "Staking draagt bij aan de veiligheid van het Judecoin-netwerk. Voor uw bijdrage verdient u JUDE. Eenmaal gestaked, moet u 180 dagen wachten voordat uw JUDE wordt ontgrendeld. Bezoek voor meer informatie over staking de",
    serviceNodeRegistrationDescription:
      'Voer de {registerCommand}-opdracht in die is geproduceerd door de daemon die zich registreert als Service Node met behulp van de "{prepareCommand}"-opdracht',
    serviceNodeStartStakingDescription:
      "Om te beginnen met staken, ga naar het tabblad Staking",
    noServiceNodesCurrentlyAvailable:
      "Er zijn momenteel geen service nodes beschikbaar voor bijdrage",
    serviceNodeDetails: {
      contributors: "Bijdragers",
      lastRewardBlockHeight: "Laatste beloningsblokhoogte",
      lastUptimeProof: "Laatste uptime-bewijs",
      maxContribution: "Maximale bijdrage",
      minContribution: "Minimale bijdrage",
      operatorFee: "Operatorvergoeding",
      registrationHeight: "Registratiehoogte",
      unlockHeight: "Ontgrendelhoogte",
      reserved: "Gereserveerd",
      serviceNodeKey: "Service Node Sleutel",
      snKey: "SN-sleutel",
      stakingRequirement: "Stakingvereiste",
      totalContributed: "Totaal bijgedragen"
    },
    signAndVerifyDescription:
      "Onderteken gegevens met de privésleutel van uw primaire adres of verifieer een handtekening tegen een openbaar adres.",
    spendKey: "Bestedingssleutel",
    stake: "Staking",
    startingDaemon: "Daemon starten",
    startingWallet: "Portemonnee starten",
    recipientN: "Ontvanger #{index}",
    switchToDateSelect: "Overschakelen naar datumselectie",
    switchToHeightSelect: "Overschakelen naar hoogteselectie",
    themes: {
      dark: "Donker",
      light: "Licht",
      brandIndigo: "Brand Indigo",
      emerald: "Emerald",
      cosmos: "Cosmos"
    },
    syncingDaemon: "Daemon synchroniseren",
    transactionID: "Transactie-ID",
    transactionConfirmed: "bevestigd",
    transactions: {
      amount: "Bedrag",
      description: "{type} transactie",
      fee: "Kosten",
      paidBySender: "betaald door verzender",
      received: "Ontvangen",
      sent: "Verzonden",
      sentTo: "{type} transactie verzonden naar",
      timestamp: "Tijdstempel",
      types: {
        all: "Alle",
        incoming: "Inkomend",
        outgoing: "Uitgaand",
        pending: "In afwachting",
        pendingIncoming: "In afwachting inkomend",
        pendingOutgoing: "In afwachting uitgaand",
        miner: "Miner",
        serviceNode: "Service Node",
        governance: "Governance",
        stake: "Stake",
        failed: "Mislukt"
      }
    },
    unlockingAtHeight: "Ontgrendelen op hoogte {number}",
    unspentOutputs: "Onbestede outputs",
    userNotUsedAddress: "U hebt dit adres niet gebruikt",
    userUsedAddress: "U hebt dit adres gebruikt",
    viewKey: "Weergavesleutel",
    viewOnlyMode:
      "Alleen-lezen modus. Laad de volledige portemonnee om munten te verzenden.",
    website: "communitywebsite"
  },
  titles: {
    addressBook: "Adresboek",
    addressDetails: "Adresdetails",
    advanced: {
      checkTransaction: "TRANSACTIE CONTROLEREN",
      prove: "BEWIJZEN",
      signAndVerify: "ONDERTEKENEN/VERIFIËREN",
      sign: "Ondertekenen",
      verify: "Verifiëren"
    },
    availableForContribution: "Service nodes beschikbaar voor bijdrage",
    changePassword: "Wachtwoord wijzigen",
    configure: "Configureren",
    currentlyStakedNodes: "Huidig gestakede nodes",
    onsRecordDetails: "ONS-recorddetails",
    onsSessionRecords: "Session-records",
    onsLokinetRecords: "Lokinet-records",
    onsWalletRecords: "Portemonnee-records",
    privateKeys: "Seed en sleutels",
    rescanWallet: "Portemonnee opnieuw scannen",
    ons: {
      purchase: "KOPEN",
      myOns: "MIJN ONS"
    },
    serviceNode: {
      registration: "REGISTRATIE",
      staking: "STAKING",
      myStakes: "MIJN STAKES"
    },

    serviceNodeDetails: "Service node details",
    settings: {
      title: "Instellingen",
      tabs: {
        general: "Algemeen",
        language: "Taal",
        peers: "Peers",
        wallet: "Portemonnee"
      }
    },
    transactionDetails: "Transactiedetails",
    transactions: "Transacties",
    wallet: {
      createNew: "Nieuwe portemonnee aanmaken",
      createdOrRestored: "Portemonnee aangemaakt/hersteld",
      importFromFile: "Portemonnee importeren vanuit bestand",
      importFromLegacyGUI: "Portemonnee importeren vanuit oude GUI",
      importFromOldGUI: "Portemonnee importeren vanuit oude GUI",
      restoreFromSeed: "Portemonnee herstellen vanuit seed",
      restoreFromKeys: "Portemonnee herstellen vanuit sleutels",
      restoreViewOnly: "Alleen-lezen portemonnee herstellen"
    },
    welcome: "Welkom",
    welcomeToJude: "Welkom bij JUDE",
    yourWallets: "Uw portemonnees"
  }
};
