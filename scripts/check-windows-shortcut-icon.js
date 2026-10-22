const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const ResEdit = require("resedit");

const installRoot = process.argv[2];
assert(
  installRoot,
  "usage: node scripts/check-windows-shortcut-icon.js <unpacked-install-root>"
);

const sourceIcon = path.resolve(__dirname, "../src-electron/icons/icon.ico");
const installedIcon = path.resolve(installRoot, "resources/Jude-Wallet.ico");
const installedExe = path.resolve(installRoot, "jude-wallet-gui.exe");
const sha256 = file =>
  crypto
    .createHash("sha256")
    .update(fs.readFileSync(file))
    .digest("hex");

const validateIco = file => {
  const icon = fs.readFileSync(file);
  assert.strictEqual(icon.readUInt16LE(0), 0, `${file}: invalid ICO header`);
  assert.strictEqual(icon.readUInt16LE(2), 1, `${file}: not an ICO file`);

  const count = icon.readUInt16LE(4);
  assert(count > 0, `${file}: ICO has no images`);

  for (let index = 0; index < count; index += 1) {
    const entry = 6 + index * 16;
    assert.strictEqual(
      icon.readUInt16LE(entry + 4),
      1,
      `${file}: ICO image ${index} has an invalid color-plane value`
    );
  }
};

assert(fs.existsSync(installedIcon), "installed shortcut icon is missing");
assert(fs.existsSync(installedExe), "installed wallet executable is missing");
validateIco(sourceIcon);
validateIco(installedIcon);
assert.strictEqual(
  sha256(installedIcon),
  sha256(sourceIcon),
  "installed shortcut icon differs from the Jude source icon"
);

const executable = ResEdit.NtExecutable.from(fs.readFileSync(installedExe));
const resources = ResEdit.NtExecutableResource.from(executable);
const iconGroups = ResEdit.Resource.IconGroupEntry.fromEntries(
  resources.entries
);
assert(iconGroups.length > 0, "wallet executable has no embedded icon group");
for (const group of iconGroups) {
  for (const icon of group.icons) {
    assert.strictEqual(
      icon.planes,
      1,
      "wallet executable has an invalid embedded icon"
    );
  }
}

console.log("Windows shortcut icon payload passed");
