const assert = require("assert");

const {
  candidateUnlockHashes,
  reconcileUnlockHistory
} = require("../src-electron/main-process/modules/unlock-history");

const confirmedHash =
  "53219d1d259e70ee3ad491b8208aeae3cbd4809596e3e8814f84fafb96a631d1";
const missingHash =
  "e08c10f164841c1a9fbb250931e1f43845cb0d9f04f8f763e37d43bf2796e08c";
const ordinaryHash = "a".repeat(64);

const transfers = [
  {
    amount: 0,
    fee: 0,
    height: 0,
    timestamp: 1792792000,
    txid: confirmedHash,
    type: "failed"
  },
  {
    amount: 0,
    fee: 0,
    height: 0,
    timestamp: 1792791000,
    txid: missingHash,
    type: "pending"
  },
  {
    amount: 0,
    fee: 0,
    height: 0,
    timestamp: 1792790000,
    txid: ordinaryHash,
    type: "failed"
  },
  {
    amount: 1,
    fee: 0,
    height: 0,
    txid: "b".repeat(64),
    type: "failed"
  }
];

assert.deepStrictEqual(candidateUnlockHashes(transfers), [
  confirmedHash,
  missingHash,
  ordinaryHash
]);

const daemonResponse = {
  status: "OK",
  missed_tx: [missingHash],
  txs: [
    {
      as_json: JSON.stringify({ type: 2 }),
      block_height: 883200,
      block_timestamp: 1792792128,
      extra: {
        key_image_unlock: "5".repeat(64),
        sn_pubkey: "a".repeat(64)
      },
      in_pool: false,
      tx_hash: confirmedHash
    },
    {
      as_json: JSON.stringify({ type: 0 }),
      block_height: 883201,
      block_timestamp: 1792792200,
      extra: {},
      in_pool: false,
      tx_hash: ordinaryHash
    }
  ]
};

const reconciled = reconcileUnlockHistory(transfers, daemonResponse);
assert.deepStrictEqual(reconciled[0], {
  ...transfers[0],
  height: 883200,
  timestamp: 1792792128,
  type: "unlock"
});
assert.deepStrictEqual(
  reconciled[1],
  transfers[1],
  "a transaction missing from the chain remains pending"
);
assert.deepStrictEqual(
  reconciled[2],
  transfers[2],
  "an ordinary failed transaction is not relabelled"
);
assert.deepStrictEqual(
  reconcileUnlockHistory(transfers, { status: "BUSY", txs: [] }),
  transfers,
  "an invalid daemon response leaves wallet history unchanged"
);

console.log("Unlock history checks passed");
