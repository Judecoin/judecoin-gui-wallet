const HEX_32 = /^[0-9a-f]{64}$/i;

const parseObject = value => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : null;
  } catch (error) {
    return null;
  }
};

const candidateUnlockHashes = transactions =>
  (transactions || [])
    .filter(
      tx =>
        tx &&
        (tx.type === "failed" || tx.type === "pending") &&
        Number(tx.amount) === 0 &&
        Number(tx.fee) === 0 &&
        typeof tx.txid === "string" &&
        HEX_32.test(tx.txid)
    )
    .map(tx => tx.txid.toLowerCase());

const isDaemonTransactionsResponse = response =>
  Boolean(
    response &&
      typeof response === "object" &&
      !Array.isArray(response) &&
      response.status === "OK" &&
      Array.isArray(response.txs) &&
      (response.missed_tx === undefined || Array.isArray(response.missed_tx))
  );

const acceptedUnlock = tx => {
  if (
    !tx ||
    typeof tx !== "object" ||
    typeof tx.tx_hash !== "string" ||
    !HEX_32.test(tx.tx_hash)
  ) {
    return false;
  }

  const json = parseObject(tx.as_json);
  const extra = parseObject(tx.extra);
  return Boolean(
    json &&
      (json.type === 2 || json.type === "2") &&
      extra &&
      typeof extra.key_image_unlock === "string" &&
      HEX_32.test(extra.key_image_unlock)
  );
};

const confirmedUnlock = tx =>
  acceptedUnlock(tx) &&
  tx.in_pool === false &&
  Number.isInteger(tx.block_height) &&
  tx.block_height > 0;

const reconcileUnlockHistory = (transactions, response) => {
  if (!Array.isArray(transactions) || !isDaemonTransactionsResponse(response)) {
    return transactions;
  }

  const confirmed = new Map(
    response.txs
      .filter(confirmedUnlock)
      .map(tx => [tx.tx_hash.toLowerCase(), tx])
  );

  return transactions.map(tx => {
    const chainTx =
      tx && typeof tx.txid === "string"
        ? confirmed.get(tx.txid.toLowerCase())
        : null;
    if (!chainTx || !candidateUnlockHashes([tx]).length) return tx;

    return {
      ...tx,
      type: "unlock",
      height: chainTx.block_height,
      timestamp:
        Number.isInteger(chainTx.block_timestamp) && chainTx.block_timestamp > 0
          ? chainTx.block_timestamp
          : tx.timestamp
    };
  });
};

module.exports = {
  candidateUnlockHashes,
  isDaemonTransactionsResponse,
  reconcileUnlockHistory
};
