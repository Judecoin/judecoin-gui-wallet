function classifyServiceNodeStatus(node) {
  if (node.deregistered) {
    return {
      key: "deregistered",
      amount: node.amount,
      unlockHeight: node.unlock_height
    };
  }

  if (node.requested_unlock_height > 0) {
    return {
      key: "unlocking",
      unlockHeight: node.requested_unlock_height
    };
  }

  if (node.funded && !node.active) return { key: "decommissioned" };
  if (node.funded && node.active) return { key: "active" };
  return { key: "awaitingContributions" };
}

function reconcileDeregisteredStakes({
  liveNodes,
  blacklist,
  ownedKeyImages,
  cachedNodeKeys
}) {
  const owned = new Set(ownedKeyImages || []);
  const nodeKeyCache = { ...(cachedNodeKeys || {}) };

  for (const node of liveNodes || []) {
    for (const contributor of node.contributors || []) {
      for (const contribution of contributor.locked_contributions || []) {
        if (owned.has(contribution.key_image)) {
          nodeKeyCache[contribution.key_image] = node.service_node_pubkey;
        }
      }
    }
  }

  const deregisteredStakes = (blacklist || [])
    .filter(entry => owned.has(entry.key_image))
    .map(entry => ({
      deregistered: true,
      service_node_pubkey: nodeKeyCache[entry.key_image] || "",
      key_image: entry.key_image,
      amount: entry.amount,
      ourContributionAmount: entry.amount,
      unlock_height: entry.unlock_height,
      contributors: []
    }));

  return { nodeKeyCache, deregisteredStakes };
}

module.exports = {
  classifyServiceNodeStatus,
  reconcileDeregisteredStakes
};
