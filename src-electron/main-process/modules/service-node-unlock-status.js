const failed = "notification.errors.failedServiceNodeUnlock";

const unlockResultStatus = data => ({
  code: data.unlocked ? 0 : -1,
  i18n: data.unlocked
    ? "notification.positive.unlockServiceNodeSuccess"
    : failed,
  sending: false
});

const canUnlockStatus = data => ({
  code: data.can_unlock ? 1 : -1,
  i18n: data.can_unlock ? "dialog.unlockServiceNode.confirmMessage" : failed,
  sending: false
});

module.exports = { canUnlockStatus, unlockResultStatus };
