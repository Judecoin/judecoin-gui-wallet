const normalizeTransactionType = type =>
  type === "block" || type === "reward" ? "miner" : type;

module.exports = { normalizeTransactionType };
