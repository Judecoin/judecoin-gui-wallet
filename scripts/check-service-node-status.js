const assert = require("assert");
const fs = require("fs");
const path = require("path");
const {
  classifyServiceNodeStatus,
  reconcileDeregisteredStakes
} = require("../src/utils/service-node-status");

const status = node => classifyServiceNodeStatus(node);

assert.deepStrictEqual(status({ active: true, funded: true }), {
  key: "active"
});
assert.deepStrictEqual(status({ active: false, funded: true }), {
  key: "decommissioned"
});
assert.deepStrictEqual(
  status({ active: false, funded: true, requested_unlock_height: 12345 }),
  { key: "unlocking", unlockHeight: 12345 }
);

const liveNodes = [
  {
    service_node_pubkey: "node-a",
    contributors: [
      {
        locked_contributions: [{ key_image: "owned-live", amount: 3000000000 }]
      }
    ]
  }
];
const blacklist = [
  { key_image: "owned-old", amount: 2000000000, unlock_height: 777 },
  { key_image: "not-ours", amount: 9000000000, unlock_height: 888 }
];
const reconciled = reconcileDeregisteredStakes({
  liveNodes,
  blacklist,
  ownedKeyImages: ["owned-live", "owned-old"],
  cachedNodeKeys: { "owned-old": "node-old" }
});
assert.deepStrictEqual(reconciled.nodeKeyCache, {
  "owned-live": "node-a",
  "owned-old": "node-old"
});
assert.deepStrictEqual(reconciled.deregisteredStakes, [
  {
    deregistered: true,
    service_node_pubkey: "node-old",
    key_image: "owned-old",
    amount: 2000000000,
    ourContributionAmount: 2000000000,
    unlock_height: 777,
    contributors: []
  }
]);
assert.deepStrictEqual(
  reconcileDeregisteredStakes({
    liveNodes: [],
    blacklist: [],
    ownedKeyImages: ["owned-old"],
    cachedNodeKeys: { "owned-old": "node-old" }
  }).deregisteredStakes,
  [],
  "a missing live node alone must not be treated as deregistered"
);
assert.deepStrictEqual(status({ active: false, funded: false }), {
  key: "awaitingContributions"
});
assert.deepStrictEqual(
  status({ deregistered: true, amount: 2000000000, unlock_height: 23456 }),
  {
    key: "deregistered",
    amount: 2000000000,
    unlockHeight: 23456
  }
);

const root = path.join(__dirname, "..");
const listComponent = fs.readFileSync(
  path.join(root, "src/components/service_node/service_node_list.vue"),
  "utf8"
);
const detailsComponent = fs.readFileSync(
  path.join(root, "src/components/service_node/service_node_details.vue"),
  "utf8"
);
const unlockComponent = fs.readFileSync(
  path.join(root, "src/components/service_node/service_node_unlock.vue"),
  "utf8"
);
const daemonModule = fs.readFileSync(
  path.join(root, "src-electron/main-process/modules/daemon.js"),
  "utf8"
);
const walletRpcModule = fs.readFileSync(
  path.join(root, "src-electron/main-process/modules/wallet-rpc.js"),
  "utf8"
);
assert.match(listComponent, /classifyServiceNodeStatus/);
assert.match(listComponent, /serviceNodeStatus/);
assert.match(detailsComponent, /serviceNodeStatus/);
assert.match(unlockComponent, /deregistered/);
assert.match(daemonModule, /get_service_node_blacklisted_key_images/);
assert.match(walletRpcModule, /export_key_images/);
assert.match(
  walletRpcModule,
  /sendRPC\("export_key_images",\s*\{\s*all:\s*true\s*\}\)/,
  "deregistered stake detection must export all wallet key images"
);
assert.match(walletRpcModule, /reconcileDeregisteredStakes/);

for (const file of fs.readdirSync(path.join(root, "src/i18n"))) {
  if (!file.endsWith(".js") || file === "index.js") continue;
  const locale = fs.readFileSync(path.join(root, "src/i18n", file), "utf8");
  if (!/serviceNodeDetails\s*:/.test(locale)) continue;
  assert.match(locale, /serviceNodeStatus\s*:/, `${file}: status translations`);
  for (const key of [
    "active",
    "decommissioned",
    "unlocking",
    "awaitingContributions",
    "deregistered"
  ]) {
    assert.match(locale, new RegExp(`${key}\\s*:`), `${file}: ${key}`);
  }
}

console.log("Service Node status checks passed");
