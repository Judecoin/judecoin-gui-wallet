const assert = require("assert");
const EventEmitter = require("events");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  addressValidationEvent,
  emitAddressValidation
} = require("../src/utils/address-validation-event");
const {
  DEFAULT_DAEMON_RPC_TIMEOUT,
  LOCAL_DAEMON_START_TIMEOUT,
  MAX_RPC_REQUEST_BYTES,
  MAX_RPC_RESPONSE_BYTES,
  WALLET_RPC_START_TIMEOUT,
  rpcRequestSafety,
  validateRpcResponse,
  rpcErrorCause,
  rpcTimeout,
  startupTimedOut
} = require("../src-electron/main-process/modules/rpc-safety");
const {
  canUnlockStatus,
  extractUnlockHeight,
  unlockResultStatus
} = require("../src-electron/main-process/modules/service-node-unlock-status");
const {
  persistConfig
} = require("../src-electron/main-process/modules/config-writer");

const emitter = new EventEmitter();
const received = [];
emitter.once(addressValidationEvent("first"), data => received.push(data));
emitter.once(addressValidationEvent("second"), data => received.push(data));
emitAddressValidation(emitter, { address: "second", valid: true });
assert.deepStrictEqual(received, [{ address: "second", valid: true }]);

assert.strictEqual(rpcTimeout(0), DEFAULT_DAEMON_RPC_TIMEOUT);
assert.strictEqual(rpcTimeout(undefined), DEFAULT_DAEMON_RPC_TIMEOUT);
assert.strictEqual(rpcTimeout(7500), 7500);
assert.deepStrictEqual(
  rpcErrorCause({ code: "ECONNREFUSED", message: "connection refused" }),
  { code: "ECONNREFUSED", message: "connection refused" }
);
assert.strictEqual(startupTimedOut(1000, 5000, 5999), false);
assert.strictEqual(startupTimedOut(1000, 5000, 6000), true);
assert.ok(LOCAL_DAEMON_START_TIMEOUT >= 10 * 60 * 1000);
assert.ok(WALLET_RPC_START_TIMEOUT >= 2 * 60 * 1000);

assert.deepStrictEqual(rpcRequestSafety(), {
  maxRedirects: 0,
  maxBodyLength: MAX_RPC_REQUEST_BYTES,
  maxContentLength: MAX_RPC_RESPONSE_BYTES,
  responseType: "json",
  transitional: {
    silentJSONParsing: false,
    forcedJSONParsing: true,
    clarifyTimeoutError: true
  }
});
assert.strictEqual(MAX_RPC_REQUEST_BYTES, 8 * 1024 * 1024);
assert.strictEqual(MAX_RPC_RESPONSE_BYTES, 32 * 1024 * 1024);

const rpcResult = { jsonrpc: "2.0", id: 7, result: { status: "OK" } };
assert.strictEqual(validateRpcResponse(rpcResult, 7), rpcResult);
const rpcError = {
  jsonrpc: "2.0",
  id: 7,
  error: { code: -1, message: "rejected" }
};
assert.strictEqual(validateRpcResponse(rpcError, 7), rpcError);
assert.throws(
  () => validateRpcResponse({ jsonrpc: "2.0", id: 8, result: {} }, 7),
  /Invalid RPC response/
);
assert.throws(
  () => validateRpcResponse({ jsonrpc: "2.0", id: 7 }, 7),
  /Invalid RPC response/
);
assert.throws(
  () =>
    validateRpcResponse({ jsonrpc: "2.0", id: 7, result: {}, error: {} }, 7),
  /Invalid RPC response/
);
assert.throws(
  () => validateRpcResponse("not-json-rpc", 7),
  /Invalid RPC response/
);

const daemonSource = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/daemon.js"),
  "utf8"
);
const walletRpcSource = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/wallet-rpc.js"),
  "utf8"
);
const backendSource = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/modules/backend.js"),
  "utf8"
);
const electronMainSource = fs.readFileSync(
  path.join(__dirname, "../src-electron/main-process/electron-main.js"),
  "utf8"
);
for (const source of [daemonSource, walletRpcSource]) {
  assert.match(source, /\.\.\.rpcRequestSafety\(\)/);
  assert.match(source, /validateRpcResponse\(response, id\)/);
}
assert.match(
  backendSource,
  /send\(event, data = \{\}\) \{\s*if \(!this\.wss\) return;/,
  "shutdown messages are ignored after the WebSocket server closes"
);
assert.doesNotMatch(
  electronMainSource,
  /new BrowserWindow\(\{[\s\S]*?show:\s*false,/,
  "the first Linux instance is visible without requiring a second launch"
);

assert.deepStrictEqual(unlockResultStatus({ unlocked: true }), {
  code: 0,
  i18n: "notification.positive.unlockServiceNodeSuccess",
  sending: false
});
assert.deepStrictEqual(
  unlockResultStatus({ unlocked: true, submitted: true }),
  {
    code: 3,
    i18n: "notification.positive.unlockServiceNodeSubmitted",
    sending: false
  }
);
assert.deepStrictEqual(unlockResultStatus({ unlocked: false }), {
  code: -1,
  i18n: "notification.errors.failedServiceNodeUnlock",
  sending: false
});
assert.deepStrictEqual(canUnlockStatus({ can_unlock: false }), {
  code: -1,
  i18n: "notification.errors.failedServiceNodeUnlock",
  sending: false
});
assert.strictEqual(
  extractUnlockHeight(
    "You will continue receiving rewards until the service node expires at the estimated height: 925500"
  ),
  925500
);
assert.strictEqual(
  extractUnlockHeight(
    "This transaction will unlock on block 925501, in approximately 90 days"
  ),
  925501
);
assert.strictEqual(extractUnlockHeight("estimated height: unknown"), null);
assert.strictEqual(extractUnlockHeight(""), null);
assert.deepStrictEqual(
  canUnlockStatus({
    can_unlock: true,
    msg:
      "You will continue receiving rewards until the service node expires at the estimated height: 925500"
  }),
  {
    code: 1,
    message: "",
    sending: false,
    unlockHeight: 925500
  }
);
assert.deepStrictEqual(canUnlockStatus({ can_unlock: true, msg: "unknown" }), {
  code: -1,
  i18n: "notification.errors.failedServiceNodeUnlock",
  sending: false
});

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "jude-config-test-"));
const configPath = path.join(tempDir, "config.json");
const promiseFs = { writeFile: fs.promises.writeFile.bind(fs.promises) };
persistConfig(promiseFs, configPath, { version: 4 })
  .then(() => {
    assert.deepStrictEqual(JSON.parse(fs.readFileSync(configPath, "utf8")), {
      version: 4
    });
    return persistConfig(
      promiseFs,
      path.join(tempDir, "missing", "config.json"),
      {}
    );
  })
  .then(
    () => assert.fail("config write to a missing directory must reject"),
    error => assert.strictEqual(error.code, "ENOENT")
  )
  .then(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log("Runtime safety checks passed");
  })
  .catch(error => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw error;
  });
