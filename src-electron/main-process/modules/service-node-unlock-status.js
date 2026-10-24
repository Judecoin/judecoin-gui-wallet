const failed = "notification.errors.failedServiceNodeUnlock";

const extractUnlockHeight = message => {
  if (typeof message !== "string") return null;

  const patterns = [
    /estimated height:\s*(\d+)/i,
    /unlock(?:s|ed)?\s+(?:at|on)\s+(?:block|height):?\s*(\d+)/i
  ];
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (!match) continue;
    const height = Number.parseInt(match[1], 10);
    if (Number.isSafeInteger(height) && height > 0) return height;
  }

  return null;
};

const unlockResultStatus = data => {
  if (data.submitted) {
    return {
      code: 3,
      i18n: "notification.positive.unlockServiceNodeSubmitted",
      sending: false
    };
  }

  return {
    code: data.unlocked ? 0 : -1,
    i18n: data.unlocked
      ? "notification.positive.unlockServiceNodeSuccess"
      : failed,
    sending: false
  };
};

const canUnlockStatus = data => {
  const unlockHeight = data.can_unlock ? extractUnlockHeight(data.msg) : null;
  if (!unlockHeight) return { code: -1, i18n: failed, sending: false };

  return {
    code: 1,
    message: "",
    sending: false,
    unlockHeight
  };
};

module.exports = { canUnlockStatus, extractUnlockHeight, unlockResultStatus };
