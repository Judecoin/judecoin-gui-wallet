const assert = require("assert");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");
const i18nDir = path.join(root, "src/i18n");
const miningWords = /miner|mining|minería|minería|挖矿|挖礦|マイナー|채굴|mineiro|майнинг/i;

for (const file of fs.readdirSync(i18nDir)) {
  if (!file.endsWith(".js") || file === "index.js") continue;
  const locale = fs.readFileSync(path.join(i18nDir, file), "utf8");
  const transactionLabels = locale.match(
    /miner:\s*"([^"]+)",\s*serviceNode:\s*"([^"]+)"/
  );
  assert.ok(
    transactionLabels,
    `${file}: reward transaction labels remain mapped`
  );
  assert.doesNotMatch(
    transactionLabels[1],
    miningWords,
    `${file}: remove PoW wording`
  );
  assert.strictEqual(
    transactionLabels[2],
    transactionLabels[1],
    `${file}: service-node rewards use the block-reward label`
  );
  assert.doesNotMatch(locale, /180\s*(?:days|giorni|日|일|dagen|天)/i);
  assert.match(
    locale,
    /unlockServiceNode:\s*\{[\s\S]*?confirmMessage:/,
    `${file}: unlock confirmation is localized`
  );
  assert.match(
    locale,
    /unlockServiceNodeSuccess:/,
    `${file}: unlock success is localized`
  );
}

const txList = fs.readFileSync(
  path.join(root, "src/components/tx_list.vue"),
  "utf8"
);
assert.match(
  txList,
  /case "miner":/,
  "historical miner transfer type remains supported"
);

const timeago = fs.readFileSync(path.join(root, "src/boot/timeago.js"), "utf8");
for (const locale of [
  "en-us",
  "zh-tw",
  "zh-cn",
  "de",
  "ja",
  "ko",
  "it",
  "nl",
  "ru",
  "es",
  "fr",
  "pt-br"
]) {
  assert.match(
    timeago,
    new RegExp(`(?:["']${locale}["']|${locale})\\s*:`),
    `timeago: register ${locale}`
  );
}

const unlock = fs.readFileSync(
  path.join(root, "src/components/service_node/service_node_unlock.vue"),
  "utf8"
);
assert.match(unlock, /dialog\.unlockServiceNode\.confirmMessage/);

const backend = fs.readFileSync(
  path.join(root, "src-electron/main-process/modules/backend.js"),
  "utf8"
);
for (const host of [
  "node1.judecoin.pro",
  "node2.judecoin.pro",
  "node.judecoin.info"
]) {
  assert.match(backend, new RegExp(host.replace(/\./g, "\\.")));
}
assert.match(backend, /remote_host:\s*"node1\.judecoin\.pro"/);
assert.strictEqual((backend.match(/67\.230\.167\.187/g) || []).length, 1);
assert.match(
  backend,
  /\[\s*"localhost",[\s\S]*?"67\.230\.167\.187"[\s\S]*?\]\.includes\(mainnetDaemon\.remote_host\)/
);
assert.strictEqual((backend.match(/node1\.judecoin\.com/g) || []).length, 1);
assert.strictEqual(
  (backend.match(/node\.judecoinworld\.com/g) || []).length,
  1
);

const productVersionFiles = [
  "package.json",
  "src/pages/init/index.vue",
  "src/gateway/gateway.js",
  "electron-builder-final.yml",
  "electron-builder-final-linux.yml",
  "packaging/windows/organized/installer.nsi",
  "packaging/windows/organized/build-organized-installer.cmd",
  "packaging/windows/organized/README.md",
  "BUILDING.md",
  "FINAL-BUILD.md",
  "PACKAGE-NOTICE.txt",
  "RELEASE-TAG.txt"
];
for (const file of productVersionFiles) {
  const contents = fs.readFileSync(path.join(root, file), "utf8");
  assert.doesNotMatch(contents, /3\.2\.0/, `${file}: stale wallet version`);
}
const packageJson = require(path.join(root, "package.json"));
assert.strictEqual(packageJson.version, "4.0.0");
assert.match(packageJson.scripts.windows, /(?:^|\s)-A x64(?:\s|$)/);

const sha256 = file =>
  crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(root, file)))
    .digest("hex");
assert.strictEqual(
  sha256("bin/win32/judecoind.exe"),
  "cee2491b895d90a7176947f7e2f0ff10efe422ff814676fdbce796653d049441"
);
assert.strictEqual(
  sha256("bin/win32/judecoin-wallet-rpc.exe"),
  "f03e82191e9721ef5275692e504afd78f5d3959df6f76bee3164954340d2cd1b"
);

console.log("Jude Wallet v4 release checks passed");
