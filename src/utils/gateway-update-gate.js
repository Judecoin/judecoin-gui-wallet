const BACKGROUND_EVENTS = new Set(["set_wallet_data", "set_daemon_data"]);

const shouldPauseBackgroundUpdates = isWindows => Boolean(isWindows);

const shouldDeferGatewayEvent = (event, paused) =>
  Boolean(paused) && BACKGROUND_EVENTS.has(event);

module.exports = { shouldDeferGatewayEvent, shouldPauseBackgroundUpdates };
