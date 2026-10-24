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
  for (const key of ["confirmSharedMessage", "confirmServiceMessage"]) {
    const message = locale.match(
      new RegExp(`${key}:\\s*(?:\\n\\s*)?"([^"]+)"`)
    );
    assert.ok(message, `${file}: ${key} is localized`);
    assert.match(message[1], /\{height\}/, `${file}: ${key} shows height`);
    assert.match(message[1], /\{days\}/, `${file}: ${key} shows days`);
  }
  assert.match(
    locale,
    /unlockServiceNodeSuccess:/,
    `${file}: unlock success is localized`
  );
}

const zhCn = fs.readFileSync(path.join(i18nDir, "zh-cn.js"), "utf8");
assert.match(
  zhCn,
  /您正在申请解锁这笔共享节点质押，预计将在区块高度 \{height\} 解锁，约需 \{days\} 天。[^\n]*是否解锁？/
);
assert.match(
  zhCn,
  /您正在申请解锁这笔服务节点质押，预计将在区块高度 \{height\} 解锁，约需 \{days\} 天。[^\n]*是否解锁？/
);
const zhTw = fs.readFileSync(path.join(i18nDir, "zh-tw.js"), "utf8");
assert.doesNotMatch(
  zhTw,
  /[，。！？：；]/,
  "zh-tw: use baseline punctuation for horizontal Linux rendering"
);
assert.match(
  zhTw,
  /您正在申請解鎖這筆共享節點質押,預計將在區塊高度 \{height\} 解鎖,約需 \{days\} 天\.[^\n]*是否解鎖\?/
);
assert.match(
  zhTw,
  /您正在申請解鎖這筆服務節點質押,預計將在區塊高度 \{height\} 解鎖,約需 \{days\} 天\.[^\n]*是否解鎖\?/
);

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

const i18nBoot = fs.readFileSync(path.join(root, "src/boot/i18n.js"), "utf8");
for (const [locale, quasarLocale] of [
  ["zh-cn", "zh-hans"],
  ["zh-tw", "zh-hant"],
  ["ko", "ko-kr"]
]) {
  assert.match(
    i18nBoot,
    new RegExp(`(?:["']${locale}["']|${locale})\\s*:\\s*"${quasarLocale}"`),
    `Quasar locale maps ${locale} to ${quasarLocale}`
  );
}

const unlock = fs.readFileSync(
  path.join(root, "src/components/service_node/service_node_unlock.vue"),
  "utf8"
);
assert.match(unlock, /dialog\.unlockServiceNode\.confirmSharedMessage/);
assert.match(unlock, /dialog\.unlockServiceNode\.confirmServiceMessage/);
assert.match(unlock, /unlockHeight/);
assert.match(unlock, /Math\.ceil/);
assert.match(unlock, /180/);

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
assert.strictEqual(packageJson.version, "4.0.1");
assert.strictEqual(packageJson.devDependencies.electron, "43.8.3");
for (const builderConfig of [
  "electron-builder-final.yml",
  "electron-builder-final-linux.yml"
]) {
  assert.match(
    fs.readFileSync(path.join(root, builderConfig), "utf8"),
    /^electronVersion: 43\.8\.3$/m,
    `${builderConfig}: Electron version matches package.json`
  );
}
assert.match(packageJson.scripts.windows, /(?:^|\s)-A x64(?:\s|$)/);
const pnpmLock = fs.readFileSync(path.join(root, "pnpm-lock.yaml"), "utf8");
assert.match(pnpmLock, /electron@43\.8\.3:/);
assert.doesNotMatch(pnpmLock, /electron@41\.10\.3/);

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
