const assert = require("assert");
const {
  shouldDeferGatewayEvent,
  shouldPauseBackgroundUpdates
} = require("../src/utils/gateway-update-gate");

assert.strictEqual(shouldPauseBackgroundUpdates(true), true);
assert.strictEqual(shouldPauseBackgroundUpdates(false), false);
assert.strictEqual(shouldDeferGatewayEvent("set_wallet_data", true), true);
assert.strictEqual(shouldDeferGatewayEvent("set_daemon_data", true), true);
assert.strictEqual(shouldDeferGatewayEvent("set_tx_status", true), false);
assert.strictEqual(shouldDeferGatewayEvent("set_wallet_data", false), false);

console.log("Gateway update gate checks passed");
