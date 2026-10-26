const HEX_32 = /^[0-9a-f]{64}$/i;

const parseObject = value => {
  if (value && typeof value === "object") return value;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    return null;
  }
};

const transactionHash = tx => {
  const hash = tx && (tx.id_hash || tx.tx_hash || tx.hash);
  return typeof hash === "string" && HEX_32.test(hash)
    ? hash.toLowerCase()
    : null;
};

const transactionDetails = tx => {
  const json = parseObject(tx && tx.tx_json);
  const extra = parseObject(tx && tx.extra);
  const jsonExtra = parseObject(json && json.extra);
  const sources = [tx, extra, json, jsonExtra].filter(Boolean);
  const types = sources.map(source => source.type);
  return {
    isUnlock:
      types.includes("key_image_unlock") ||
      types.includes(2) ||
      types.includes("2"),
    keyImage: sources
      .map(source => source.key_image_unlock)
      .find(value => typeof value === "string")
  };
};

const findUnlockCandidate = (beforeHashes, transactions, expectedKeyImages) => {
  const before = new Set(
    (beforeHashes || [])
      .map(item => (typeof item === "string" ? item : transactionHash(item)))
      .filter(Boolean)
      .map(hash => hash.toLowerCase())
  );
  const expected = new Set(
    (expectedKeyImages || [])
      .filter(keyImage => typeof keyImage === "string" && HEX_32.test(keyImage))
      .map(keyImage => keyImage.toLowerCase())
  );
  if (expected.size === 0 || !Array.isArray(transactions)) return null;

  const matches = transactions.filter(tx => {
    const hash = transactionHash(tx);
    if (!hash || before.has(hash) || Number(tx.fee) !== 0) return false;
    const details = transactionDetails(tx);
    return (
      details.isUnlock &&
      typeof details.keyImage === "string" &&
      expected.has(details.keyImage.toLowerCase())
    );
  });

  return matches.length === 1 ? matches[0] : null;
};

const isLoopbackLocalDaemon = daemon =>
  Boolean(
    daemon &&
      daemon.local === true &&
      ["127.0.0.1", "localhost", "::1"].includes(daemon.hostname)
  );

const readPool = async daemon => {
  const response = await daemon.sendRPC("get_transaction_pool", {
    tx_extra: true
  });
  const result = response && response.result;
  if (!result || (result.status && result.status !== "OK")) {
    throw new Error("Unable to read the local transaction pool");
  }
  const transactions =
    result.transactions === undefined && result.txs === undefined
      ? []
      : result.transactions || result.txs;
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid local transaction pool response");
  }
  return transactions;
};

const tryReadPool = async daemon => {
  try {
    return await readPool(daemon);
  } catch (error) {
    return null;
  }
};

const tryReadUnlockHashes = async readUnlockHashes => {
  if (!readUnlockHashes) return null;
  try {
    const hashes = await readUnlockHashes();
    return Array.isArray(hashes) ? hashes : null;
  } catch (error) {
    return null;
  }
};

const rawUnlock = tx => {
  const txid = transactionHash(tx);
  const txBlob = tx && tx.tx_blob;
  if (
    !txid ||
    typeof txBlob !== "string" ||
    txBlob.length === 0 ||
    txBlob.length % 2 !== 0 ||
    !/^[0-9a-f]+$/i.test(txBlob)
  ) {
    return null;
  }
  return { txid, txBlob };
};

const trySubmitRawUnlock = async (tx, submitRawUnlock) => {
  const transaction = rawUnlock(tx);
  if (!transaction || typeof submitRawUnlock !== "function") return false;
  try {
    return (await submitRawUnlock(transaction)) === true;
  } catch (error) {
    return false;
  }
};

const relayLocalUnlock = async ({
  daemon,
  expectedKeyImages,
  requestUnlock,
  readUnlockHashes,
  submitRawUnlock
}) => {
  if (!isLoopbackLocalDaemon(daemon)) return requestUnlock();

  const expected = (expectedKeyImages || []).filter(
    keyImage => typeof keyImage === "string" && HEX_32.test(keyImage)
  );
  const before = expected.length > 0 ? await tryReadPool(daemon) : null;
  if (before) {
    const pending = findUnlockCandidate([], before, expected);
    if (pending) {
      if (typeof submitRawUnlock !== "function") {
        return { unlocked: false, submitted: true };
      }
      const submitted = await trySubmitRawUnlock(pending, submitRawUnlock);
      return submitted
        ? { unlocked: false, submitted: true }
        : { unlocked: false };
    }
  }

  const beforeHashes = before
    ? before.map(transactionHash).filter(Boolean)
    : [];
  const beforeWalletHashes = await tryReadUnlockHashes(readUnlockHashes);
  const result = await requestUnlock();
  if (!result) return result;

  if (typeof submitRawUnlock === "function") {
    const after = await tryReadPool(daemon);
    const candidate = findUnlockCandidate(beforeHashes, after, expected);
    const submitted = await trySubmitRawUnlock(candidate, submitRawUnlock);
    return submitted
      ? { ...result, submitted: true }
      : { ...result, unlocked: false };
  }

  if (result.unlocked) return { ...result, submitted: true };

  if (before) {
    const after = await tryReadPool(daemon);
    const candidate = findUnlockCandidate(beforeHashes, after, expected);
    if (candidate) return { ...result, submitted: true };
  }

  if (beforeWalletHashes) {
    const beforeWallet = new Set(beforeWalletHashes);
    const afterWalletHashes = await tryReadUnlockHashes(readUnlockHashes);
    if (
      afterWalletHashes &&
      afterWalletHashes.some(hash => !beforeWallet.has(hash))
    ) {
      return { ...result, submitted: true };
    }
  }

  return result;
};

module.exports = {
  findUnlockCandidate,
  isLoopbackLocalDaemon,
  relayLocalUnlock
};
