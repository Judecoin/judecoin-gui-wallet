const assert = require("assert");
const {
  normalizeTransactionType
} = require("../src/utils/transaction-type");

assert.strictEqual(
  normalizeTransactionType("block"),
  "miner",
  "v17 block rewards use the existing block-reward presentation"
);
assert.strictEqual(
  normalizeTransactionType("reward"),
  "miner",
  "v17 reward transfers use the existing block-reward presentation"
);
assert.strictEqual(
  normalizeTransactionType("miner"),
  "miner",
  "historical block rewards remain supported"
);
assert.strictEqual(
  normalizeTransactionType("in"),
  "in",
  "ordinary incoming transfers remain unchanged"
);

console.log("Transaction type compatibility checks passed");
