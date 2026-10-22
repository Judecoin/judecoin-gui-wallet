const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const { isSafeWalletName } = require(path.join(
  root,
  "src-electron/main-process/modules/wallet-name"
));
const { normalizeUserFacingPayload, replaceUpstreamBrand } = require(path.join(
  root,
  "src-electron/main-process/modules/user-facing-brand"
));

assert.strictEqual(
  replaceUpstreamBrand("7 Oxen left to distribute"),
  "7 Jude left to distribute"
);
assert.strictEqual(
  replaceUpstreamBrand("lokinet and oxenmq remain protocol identifiers"),
  "lokinet and oxenmq remain protocol identifiers"
);
assert.deepStrictEqual(
  normalizeUserFacingPayload({
    message: "Oxen warning",
    status: { message: "Contact the Oxen developers" }
  }),
  {
    message: "Jude warning",
    status: { message: "Contact the Jude developers" }
  }
);
assert.deepStrictEqual(
  normalizeUserFacingPayload({
    unlock: { code: 1, message: "Unlock 23600 Oxen from the network" }
  }),
  {
    unlock: { code: 1, message: "Unlock 23600 JUDE from the network" }
  }
);
const walletList = ["wallet-1"];
assert.strictEqual(normalizeUserFacingPayload(walletList), walletList);

for (const name of ["wallet", "我的钱包", "wallet 01", "wallet.meta"]) {
  assert.strictEqual(isSafeWalletName(name), true, `should allow ${name}`);
}
for (const name of [
  "",
  ".",
  "..",
  "../wallet",
  "a/b",
  "a\\b",
  "/tmp/wallet",
  null
]) {
  assert.strictEqual(isSafeWalletName(name), false, `should reject ${name}`);
}

const config = require(path.join(root, "quasar.conf"))();
const packageJson = require(path.join(root, "package.json"));
const linuxBuilderConfig = fs.readFileSync(
  path.join(root, "electron-builder-final-linux.yml"),
  "utf8"
);
assert.strictEqual(packageJson.desktopName, "jude-wallet-gui.desktop");
assert.strictEqual(
  packageJson.description,
  "Desktop GUI wallet for Judecoin cryptocurrency"
);
assert.ok(
  linuxBuilderConfig.includes("deb:\n  packageName: jude-wallet-gui\n")
);
assert.ok(
  linuxBuilderConfig.includes(
    "synopsis: Desktop GUI wallet for Judecoin cryptocurrency"
  )
);
assert.ok(
  linuxBuilderConfig.includes(
    "packaging/linux/jude-wallet-gui.metainfo.xml=/usr/share/metainfo/jude-wallet-gui.metainfo.xml"
  )
);
const metainfoPath = path.join(
  root,
  "packaging/linux/jude-wallet-gui.metainfo.xml"
);
assert.ok(fs.existsSync(metainfoPath));
const metainfo = fs.readFileSync(metainfoPath, "utf8");
for (const text of [
  "<id>jude-wallet-gui.desktop</id>",
  "<name>Judecoin Wallet</name>",
  "<summary>Desktop GUI wallet for Judecoin cryptocurrency</summary>",
  '<icon type="stock">jude-wallet-gui</icon>',
  '<launchable type="desktop-id">jude-wallet-gui.desktop</launchable>'
]) {
  assert.ok(metainfo.includes(text), `missing metainfo: ${text}`);
}
assert.strictEqual(config.electron.builder.linux.syncDesktopName, true);
assert.strictEqual(
  config.electron.builder.linux.executableName,
  "jude-wallet-gui"
);
assert.strictEqual(config.electron.builder.deb.packageName, "jude-wallet-gui");
for (const relation of [
  "--replaces=jude-desktop-wallet",
  "--conflicts=jude-desktop-wallet",
  "--provides=jude-desktop-wallet"
]) {
  assert.ok(config.electron.builder.deb.fpm.includes(relation));
  assert.ok(linuxBuilderConfig.includes(`    - ${relation}`));
}
assert.deepStrictEqual(config.electron.builder.win.extraResources, [
  { from: "bin/win32", to: "bin" },
  { from: "src-electron/icons/icon.ico", to: "Jude-Wallet.ico" }
]);
assert.deepStrictEqual(config.electron.builder.linux.extraResources, [
  { from: "bin/linux", to: "bin" }
]);
assert.strictEqual(config.electron.builder.extraResources, undefined);

const expected = new Map([
  [
    "bin/linux/judecoind",
    "bf45fa182aa5b5b2046a620d00f91587ce6ebdfa08b5a30161313379e1bb675a"
  ],
  [
    "bin/linux/judecoin-wallet-rpc",
    "3fa8c302227d77c0136a710bd287d1220a34a959490b33bc12fb452b098934c1"
  ],
  [
    "bin/win32/judecoind.exe",
    "cee2491b895d90a7176947f7e2f0ff10efe422ff814676fdbce796653d049441"
  ],
  [
    "bin/win32/judecoin-wallet-rpc.exe",
    "f03e82191e9721ef5275692e504afd78f5d3959df6f76bee3164954340d2cd1b"
  ]
]);

for (const [relative, hash] of expected) {
  const filename = path.join(root, relative);
  const contents = fs.readFileSync(filename);
  assert.strictEqual(
    crypto
      .createHash("sha256")
      .update(contents)
      .digest("hex"),
    hash,
    `${relative} hash mismatch`
  );
  if (relative.startsWith("bin/linux/")) {
    assert.strictEqual(contents.subarray(0, 4).toString("hex"), "7f454c46");
    assert.ok(
      fs.statSync(filename).mode & 0o111,
      `${relative} is not executable`
    );
  }
}

const rendererSources = [
  "src/pages/wallet-select/import.vue",
  "src/components/settings_general.vue",
  "src/components/menus/wallet_settings.vue"
].map(relative => fs.readFileSync(path.join(root, relative), "utf8"));
assert.ok(rendererSources.every(source => !source.includes("files[0].path")));

const userFacingSources = [
  "src/components/ons/ons_purchase.vue",
  ...fs
    .readdirSync(path.join(root, "src/i18n"))
    .filter(filename => filename.endsWith(".js"))
    .map(filename => `src/i18n/${filename}`)
].map(relative => fs.readFileSync(path.join(root, relative), "utf8"));
assert.ok(userFacingSources.every(source => !/\bOXEN\b/.test(source)));
assert.ok(userFacingSources.every(source => !/GUI Loki/i.test(source)));

const main = fs.readFileSync(
  path.join(root, "src-electron/main-process/electron-main.js"),
  "utf8"
);
const preload = fs.readFileSync(
  path.join(root, "src-electron/main-process/electron-preload.js"),
  "utf8"
);
assert.ok(main.includes('ipcMain.handle("select-path"'));
assert.ok(preload.includes('ipcRenderer.invoke("select-path"'));

console.log("Linux release regression checks passed");
