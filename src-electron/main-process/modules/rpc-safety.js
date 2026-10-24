const DEFAULT_DAEMON_RPC_TIMEOUT = 20 * 1000;
const LOCAL_DAEMON_START_TIMEOUT = 10 * 60 * 1000;
const MAX_RPC_REQUEST_BYTES = 8 * 1024 * 1024;
const MAX_RPC_RESPONSE_BYTES = 32 * 1024 * 1024;
const WALLET_RPC_START_TIMEOUT = 2 * 60 * 1000;

const rpcRequestSafety = () => ({
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

const invalidRpcResponse = () => {
  const error = new Error("Invalid RPC response");
  error.code = "ERR_INVALID_RPC_RESPONSE";
  return error;
};

const validateRpcResponse = (response, expectedId) => {
  if (
    !response ||
    typeof response !== "object" ||
    Array.isArray(response) ||
    response.jsonrpc !== "2.0" ||
    response.id !== expectedId
  ) {
    throw invalidRpcResponse();
  }

  const hasResult = Object.prototype.hasOwnProperty.call(response, "result");
  const hasError = Object.prototype.hasOwnProperty.call(response, "error");
  if (hasResult === hasError) throw invalidRpcResponse();
  if (
    hasError &&
    (!response.error ||
      typeof response.error !== "object" ||
      Array.isArray(response.error))
  ) {
    throw invalidRpcResponse();
  }
  return response;
};

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
  MAX_RPC_REQUEST_BYTES,
  MAX_RPC_RESPONSE_BYTES,
  WALLET_RPC_START_TIMEOUT,
  rpcRequestSafety,
  validateRpcResponse,
  rpcErrorCause,
  rpcTimeout,
  startupTimedOut
};
