const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  findUnlockCandidate,
  relayLocalUnlock
} = require("../src-electron/main-process/modules/unlock-relay");

const keyImage = "a".repeat(64);
const otherKeyImage = "b".repeat(64);
const oldHash = "1".repeat(64);
const unlockHash = "2".repeat(64);

const walletRpc = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/wallet-rpc.js"),
  "utf8"
);
assert.match(walletRpc, /relayLocalUnlock/);
assert.match(walletRpc, /params\.stake_key_images/);

const unlockTx = (overrides = {}) => ({
  id_hash: unlockHash,
  fee: 0,
  relayed: false,
  extra: {
    type: "key_image_unlock",
    key_image_unlock: keyImage
  },
  ...overrides
});

assert.strictEqual(
  findUnlockCandidate([oldHash], [unlockTx()], [keyImage]).id_hash,
  unlockHash,
  "finds one new matching unlock transaction"
);
assert.strictEqual(
  findUnlockCandidate(
    [oldHash],
    [
      unlockTx({
        type: 2,
        extra: { key_image_unlock: keyImage }
      })
    ],
    [keyImage]
  ).id_hash,
  unlockHash,
  "recognizes the v4 key-image unlock transaction structure"
);
assert.strictEqual(
  findUnlockCandidate(
    [oldHash],
    [
      {
        tx_hash: unlockHash,
        fee: 0,
        extra: {
          type: "key_image_unlock",
          key_image_unlock: keyImage
        }
      }
    ],
    [keyImage]
  ).tx_hash,
  unlockHash,
  "supports the current daemon transaction-pool response"
);
assert.strictEqual(
  findUnlockCandidate(
    [oldHash],
    [
      {
        id_hash: unlockHash,
        fee: "0",
        tx_json: JSON.stringify({
          type: "key_image_unlock",
          extra: { key_image_unlock: keyImage }
        })
      }
    ],
    [keyImage]
  ).id_hash,
  unlockHash,
  "supports the legacy daemon transaction-pool response"
);
assert.strictEqual(
  findUnlockCandidate([oldHash], [unlockTx({ fee: 1 })], [keyImage]),
  null,
  "rejects non-zero fees"
);
assert.strictEqual(
  findUnlockCandidate(
    [oldHash],
    [unlockTx({ extra: { type: "standard", key_image_unlock: keyImage } })],
    [keyImage]
  ),
  null,
  "rejects the wrong transaction type"
);
assert.strictEqual(
  findUnlockCandidate([oldHash], [unlockTx()], [otherKeyImage]),
  null,
  "rejects the wrong stake key image"
);
assert.strictEqual(
  findUnlockCandidate(
    [oldHash],
    [unlockTx(), unlockTx({ id_hash: "3".repeat(64) })],
    [keyImage]
  ),
  null,
  "rejects ambiguous candidates"
);

const makeDaemon = ({ local = true, hostname = "127.0.0.1" } = {}) => {
  const calls = [];
  const pools = [
    { status: "OK", transactions: [{ id_hash: oldHash }] },
    { status: "OK", transactions: [{ id_hash: oldHash }, unlockTx()] }
  ];
  return {
    local,
    hostname,
    calls,
    async sendRPC(method, params) {
      calls.push({ method, params });
      if (method === "get_transaction_pool") {
        return { result: pools.shift() };
      }
      throw new Error(`Unexpected RPC: ${method}`);
    }
  };
};

(async () => {
  let unlockCalls = 0;
  const daemon = makeDaemon();
  const result = await relayLocalUnlock({
    daemon,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => {
      unlockCalls += 1;
      return { unlocked: true, msg: "ok" };
    }
  });
  assert.deepStrictEqual(result, {
    unlocked: true,
    msg: "ok",
    submitted: true
  });
  assert.strictEqual(unlockCalls, 1);
  assert.deepStrictEqual(
    daemon.calls.map(call => call.method),
    ["get_transaction_pool", "get_transaction_pool"]
  );

  const locallyPending = makeDaemon();
  const recovered = await relayLocalUnlock({
    daemon: locallyPending,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => ({
      unlocked: false,
      msg: "The local daemon did not relay the unlock transaction"
    })
  });
  assert.deepStrictEqual(recovered, {
    unlocked: false,
    msg: "The local daemon did not relay the unlock transaction",
    submitted: true
  });
  assert.deepStrictEqual(
    locallyPending.calls.map(call => call.method),
    ["get_transaction_pool", "get_transaction_pool"]
  );

  const walletRecorded = makeDaemon();
  walletRecorded.sendRPC = async (method, params) => {
    walletRecorded.calls.push({ method, params });
    if (method === "get_transaction_pool") {
      return { result: { status: "OK", transactions: [] } };
    }
    throw new Error(`Unexpected RPC: ${method}`);
  };
  let walletReads = 0;
  const recorded = await relayLocalUnlock({
    daemon: walletRecorded,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => ({ unlocked: false }),
    readUnlockHashes: async () => {
      walletReads += 1;
      return walletReads === 1 ? [oldHash] : [oldHash, unlockHash];
    }
  });
  assert.deepStrictEqual(recorded, { unlocked: false, submitted: true });
  assert.strictEqual(walletReads, 2);

  let duplicateUnlockCalls = 0;
  const existingPending = makeDaemon();
  existingPending.sendRPC = async (method, params) => {
    existingPending.calls.push({ method, params });
    if (method === "get_transaction_pool") {
      return { result: { status: "OK", transactions: [unlockTx()] } };
    }
    throw new Error(`Unexpected RPC: ${method}`);
  };
  const resumed = await relayLocalUnlock({
    daemon: existingPending,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => {
      duplicateUnlockCalls += 1;
      return { unlocked: true };
    }
  });
  assert.deepStrictEqual(resumed, { unlocked: false, submitted: true });
  assert.strictEqual(
    duplicateUnlockCalls,
    0,
    "does not create a second unlock when one is already pending locally"
  );
  assert.deepStrictEqual(
    existingPending.calls.map(call => call.method),
    ["get_transaction_pool"]
  );

  const remote = makeDaemon({ local: false, hostname: "node.example" });
  await relayLocalUnlock({
    daemon: remote,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => ({ unlocked: true })
  });
  assert.deepStrictEqual(remote.calls, [], "remote-node mode is unchanged");

  const malformed = makeDaemon();
  malformed.sendRPC = async method => {
    malformed.calls.push({ method });
    if (method === "get_transaction_pool") {
      return { result: { status: "OK", transactions: [] } };
    }
    throw new Error(`Unexpected RPC: ${method}`);
  };
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: malformed,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => ({ unlocked: false })
    }),
    { unlocked: false }
  );

  console.log("Unlock relay checks passed");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
