function replaceUpstreamBrand(value) {
  return typeof value === "string"
    ? value.replace(/\bOxen\b/gi, "Jude")
    : value;
}

function replaceUpstreamCurrency(value) {
  return typeof value === "string"
    ? value.replace(/\bOxen\b/gi, "JUDE")
    : value;
}

function normalizeUserFacingPayload(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;

  const normalized = { ...data };
  if (typeof normalized.message === "string") {
    normalized.message = replaceUpstreamBrand(normalized.message);
  }
  if (
    normalized.status &&
    typeof normalized.status === "object" &&
    typeof normalized.status.message === "string"
  ) {
    normalized.status = {
      ...normalized.status,
      message: replaceUpstreamBrand(normalized.status.message)
    };
  }
  if (
    normalized.unlock &&
    typeof normalized.unlock === "object" &&
    typeof normalized.unlock.message === "string"
  ) {
    normalized.unlock = {
      ...normalized.unlock,
      message: replaceUpstreamCurrency(normalized.unlock.message)
    };
  }
  return normalized;
}

module.exports = { normalizeUserFacingPayload, replaceUpstreamBrand };
