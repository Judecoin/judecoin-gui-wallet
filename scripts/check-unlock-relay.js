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
const unlockBlob = "ab".repeat(142);

const walletRpc = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/wallet-rpc.js"),
  "utf8"
);
const daemon = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/daemon.js"),
  "utf8"
);
assert.match(walletRpc, /relayLocalUnlock/);
assert.match(walletRpc, /params\.stake_key_images/);
assert.match(walletRpc, /submitRawUnlock/);
assert.match(walletRpc, /submitUnlockTransaction/);
assert.match(daemon, /\/sendrawtransaction/);
assert.match(daemon, /do_sanity_checks:\s*true/);
assert.match(daemon, /\.\.\.rpcRequestSafety\(\)/);

const unlockTx = (overrides = {}) => ({
  id_hash: unlockHash,
  fee: 0,
  relayed: false,
  tx_blob: unlockBlob,
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
  const submittedUnlocks = [];
  const daemon = makeDaemon();
  const result = await relayLocalUnlock({
    daemon,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => {
      unlockCalls += 1;
      return { unlocked: true, msg: "ok" };
    },
    submitRawUnlock: async transaction => {
      submittedUnlocks.push(transaction);
      return true;
    }
  });
  assert.deepStrictEqual(result, {
    unlocked: true,
    msg: "ok",
    submitted: true
  });
  assert.strictEqual(unlockCalls, 1);
  assert.deepStrictEqual(submittedUnlocks, [
    { txid: unlockHash, txBlob: unlockBlob }
  ]);
  assert.deepStrictEqual(
    daemon.calls.map(call => call.method),
    ["get_transaction_pool", "get_transaction_pool"]
  );

  const locallyPending = makeDaemon();
  const locallySubmitted = [];
  const recovered = await relayLocalUnlock({
    daemon: locallyPending,
    expectedKeyImages: [keyImage],
    requestUnlock: async () => ({
      unlocked: false,
      msg: "The local daemon did not relay the unlock transaction"
    }),
    submitRawUnlock: async transaction => {
      locallySubmitted.push(transaction);
      return true;
    }
  });
  assert.deepStrictEqual(recovered, {
    unlocked: false,
    msg: "The local daemon did not relay the unlock transaction",
    submitted: true
  });
  assert.deepStrictEqual(locallySubmitted, [
    { txid: unlockHash, txBlob: unlockBlob }
  ]);
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
    },
    submitRawUnlock: async transaction => {
      assert.deepStrictEqual(transaction, {
        txid: unlockHash,
        txBlob: unlockBlob
      });
      return true;
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

  let failedRelayUnlockCalls = 0;
  const failedRelay = makeDaemon();
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: failedRelay,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => {
        failedRelayUnlockCalls += 1;
        return { unlocked: true, msg: "ok" };
      },
      submitRawUnlock: async () => false
    }),
    { unlocked: false, msg: "ok" },
    "does not report success when no remote accepts the local unlock"
  );
  assert.strictEqual(failedRelayUnlockCalls, 1);

  const missingBlob = makeDaemon();
  missingBlob.sendRPC = async method => {
    missingBlob.calls.push({ method });
    if (method === "get_transaction_pool") {
      return {
        result: {
          status: "OK",
          transactions: [unlockTx({ tx_blob: "" })]
        }
      };
    }
    throw new Error(`Unexpected RPC: ${method}`);
  };
  let missingBlobSubmissions = 0;
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: missingBlob,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => ({ unlocked: true }),
      submitRawUnlock: async () => {
        missingBlobSubmissions += 1;
        return true;
      }
    }),
    { unlocked: false },
    "does not broadcast or report success without the exact raw transaction"
  );
  assert.strictEqual(missingBlobSubmissions, 0);

  let emptyPoolUnlockCalls = 0;
  const canonicalEmptyPool = makeDaemon();
  canonicalEmptyPool.sendRPC = async (method, params) => {
    canonicalEmptyPool.calls.push({ method, params });
    if (method === "get_transaction_pool") {
      return { result: { status: "OK", untrusted: false } };
    }
    throw new Error(`Unexpected RPC: ${method}`);
  };
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: canonicalEmptyPool,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => {
        emptyPoolUnlockCalls += 1;
        return { unlocked: true };
      }
    }),
    { unlocked: true, submitted: true },
    "accepts the daemon's canonical empty transaction-pool response"
  );
  assert.strictEqual(emptyPoolUnlockCalls, 1);

  let unavailablePoolUnlockCalls = 0;
  const unavailablePool = makeDaemon();
  unavailablePool.sendRPC = async method => {
    unavailablePool.calls.push({ method });
    throw new Error("Local transaction pool temporarily unavailable");
  };
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: unavailablePool,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => {
        unavailablePoolUnlockCalls += 1;
        return { unlocked: true };
      }
    }),
    { unlocked: true, submitted: true },
    "does not let an auxiliary pool check block the core unlock request"
  );
  assert.strictEqual(unavailablePoolUnlockCalls, 1);

  let missingMetadataUnlockCalls = 0;
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: makeDaemon(),
      expectedKeyImages: [],
      requestUnlock: async () => {
        missingMetadataUnlockCalls += 1;
        return { unlocked: true };
      }
    }),
    { unlocked: true, submitted: true },
    "does not let missing matching metadata block the core unlock request"
  );
  assert.strictEqual(missingMetadataUnlockCalls, 1);

  let postPoolReads = 0;
  let postWalletReads = 0;
  const postPoolUnavailable = makeDaemon();
  postPoolUnavailable.sendRPC = async method => {
    assert.strictEqual(method, "get_transaction_pool");
    postPoolReads += 1;
    if (postPoolReads === 1) {
      return { result: { status: "OK", transactions: [] } };
    }
    throw new Error("Local transaction pool temporarily unavailable");
  };
  assert.deepStrictEqual(
    await relayLocalUnlock({
      daemon: postPoolUnavailable,
      expectedKeyImages: [keyImage],
      requestUnlock: async () => ({ unlocked: false }),
      readUnlockHashes: async () => {
        postWalletReads += 1;
        return postWalletReads === 1 ? [oldHash] : [oldHash, unlockHash];
      }
    }),
    { unlocked: false, submitted: true },
    "uses wallet evidence when the post-submit pool check is unavailable"
  );
  assert.strictEqual(postWalletReads, 2);

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
