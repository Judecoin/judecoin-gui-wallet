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
  const transactions = result.transactions || result.txs;
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid local transaction pool response");
  }
  return transactions;
};

const relayLocalUnlock = async ({
  daemon,
  expectedKeyImages,
  requestUnlock,
  readUnlockHashes
}) => {
  if (!isLoopbackLocalDaemon(daemon)) return requestUnlock();

  const expected = (expectedKeyImages || []).filter(
    keyImage => typeof keyImage === "string" && HEX_32.test(keyImage)
  );
  if (expected.length === 0) {
    throw new Error("No valid stake key image was provided");
  }

  const before = await readPool(daemon);
  const pending = findUnlockCandidate([], before, expected);
  if (pending) return { unlocked: false, submitted: true };

  const beforeHashes = before.map(transactionHash).filter(Boolean);
  const beforeWalletHashes = readUnlockHashes ? await readUnlockHashes() : [];
  const result = await requestUnlock();
  if (!result) return result;

  const after = await readPool(daemon);
  const candidate = findUnlockCandidate(beforeHashes, after, expected);
  if (candidate) return { ...result, submitted: true };

  if (readUnlockHashes) {
    const beforeWallet = new Set(beforeWalletHashes);
    const afterWalletHashes = await readUnlockHashes();
    if (afterWalletHashes.some(hash => !beforeWallet.has(hash))) {
      return { ...result, submitted: true };
    }
  }

  return result.unlocked ? { ...result, submitted: true } : result;
};

module.exports = {
  findUnlockCandidate,
  isLoopbackLocalDaemon,
  relayLocalUnlock
};
