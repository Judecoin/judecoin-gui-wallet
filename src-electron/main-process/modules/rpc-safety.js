const DEFAULT_DAEMON_RPC_TIMEOUT = 20 * 1000;
const LOCAL_DAEMON_START_TIMEOUT = 10 * 60 * 1000;
const WALLET_RPC_START_TIMEOUT = 2 * 60 * 1000;

const rpcTimeout = timeout =>
  Number.isFinite(timeout) && timeout > 0
    ? timeout
    : DEFAULT_DAEMON_RPC_TIMEOUT;

const rpcErrorCause = error => ({
  code: error.code || (error.cause && error.cause.code),
  message: error.message
});

const startupTimedOut = (startedAt, timeout, now = Date.now()) =>
  now - startedAt >= timeout;

module.exports = {
  DEFAULT_DAEMON_RPC_TIMEOUT,
  LOCAL_DAEMON_START_TIMEOUT,
  WALLET_RPC_START_TIMEOUT,
  rpcErrorCause,
  rpcTimeout,
  startupTimedOut
};
