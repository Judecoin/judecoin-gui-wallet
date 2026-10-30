const assert = require("assert");
const fs = require("fs");
const Module = require("module");
const path = require("path");
const babel = require("@babel/core");
const axios = require("../node_modules/axios/dist/node/axios.cjs");

const filename = path.join(
  __dirname,
  "../src-electron/main-process/modules/daemon.js"
);
const source = fs.readFileSync(filename, "utf8");
const compiled = babel.transformSync(source, {
  babelrc: false,
  configFile: false,
  plugins: ["@babel/plugin-transform-modules-commonjs"]
}).code;
const daemonModule = new Module(filename, module);
daemonModule.filename = filename;
daemonModule.paths = Module._nodeModulePaths(path.dirname(filename));
daemonModule._compile(compiled, filename);
const { Daemon } = daemonModule.exports;

const txid = "a".repeat(64);
const txBlob = "ab".repeat(142);
const originalAdapter = axios.defaults.adapter;

const submitWith = async ({ submission, transaction }) => {
  const calls = [];
  axios.defaults.adapter = async config => {
    calls.push(config.url);
    if (
      config.url.endsWith("/sendrawtransaction") &&
      submission instanceof Error
    ) {
      throw submission;
    }
    return {
      data: config.url.endsWith("/sendrawtransaction")
        ? submission
        : transaction,
      status: 200,
      statusText: "OK",
      headers: {},
      config
    };
  };
  const daemon = Object.create(Daemon.prototype);
  daemon.net_type = "mainnet";
  daemon.backend = { remotes: [{ host: "node.example", port: 16061 }] };
  daemon.queue = { add: task => task() };
  daemon.agent = null;
  try {
    return {
      accepted: await daemon.submitUnlockTransaction({ txid, txBlob }),
      calls
    };
  } finally {
    axios.defaults.adapter = originalAdapter;
  }
};

(async () => {
  const alreadyAccepted = await submitWith({
    submission: { status: "Failed" },
    transaction: { status: "OK", txs: [{ tx_hash: txid }], missed_tx: [] }
  });
  assert.strictEqual(
    alreadyAccepted.accepted,
    true,
    "a remote with the exact unlock transaction proves it was accepted even when resubmission fails"
  );
  assert.strictEqual(alreadyAccepted.calls.length, 2);

  const timedOutButAccepted = await submitWith({
    submission: new Error("request timed out"),
    transaction: { status: "OK", txs: [{ tx_hash: txid }], missed_tx: [] }
  });
  assert.strictEqual(
    timedOutButAccepted.accepted,
    true,
    "a send timeout cannot override a remote proof for the exact transaction"
  );

  const wrongTransaction = await submitWith({
    submission: { status: "Failed" },
    transaction: {
      status: "OK",
      txs: [{ tx_hash: "b".repeat(64) }],
      missed_tx: []
    }
  });
  assert.strictEqual(
    wrongTransaction.accepted,
    false,
    "a different transaction cannot prove acceptance of the unlock"
  );

  const missingTransaction = await submitWith({
    submission: { status: "Failed" },
    transaction: { status: "OK", txs: [], missed_tx: [txid] }
  });
  assert.strictEqual(missingTransaction.accepted, false);

  process.stdout.write("unlock submit checks passed\n");
})().catch(error => {
  axios.defaults.adapter = originalAdapter;
  console.error(error);
  process.exitCode = 1;
});
