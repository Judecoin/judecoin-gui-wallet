function isSafeWalletName(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value !== "." &&
    value !== ".." &&
    !/[\\/\0]/.test(value)
  );
}

module.exports = { isSafeWalletName };
