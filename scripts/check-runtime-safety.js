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
  WALLET_RPC_START_TIMEOUT,
  rpcErrorCause,
  rpcTimeout,
  startupTimedOut
} = require("../src-electron/main-process/modules/rpc-safety");
const {
  canUnlockStatus,
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

assert.deepStrictEqual(unlockResultStatus({ unlocked: true }), {
  code: 0,
  i18n: "notification.positive.unlockServiceNodeSuccess",
  sending: false
});
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
