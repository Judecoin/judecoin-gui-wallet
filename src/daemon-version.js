export function formatDaemonProtocolVersion(value) {
  if (typeof value === "string") {
    const cleaned = value.trim();
    if (!/^\d+$/.test(cleaned)) return cleaned || "N/A";
    value = Number(cleaned);
  }

  if (!Number.isSafeInteger(value) || value < 0) return "N/A";

  // Judecoin/Monero-style daemon RPC encodes the protocol version in a
  // uint32: the high 16 bits are major and the low 16 bits are minor.
  if (value >= 0x10000) {
    return `${Math.floor(value / 0x10000)}.${value % 0x10000}`;
  }

  return String(value);
}
