const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const uploadMode = process.argv.includes("--upload");
const sourceRoots = ["src", "src-electron", "scripts"];
const allowedFiles = new Set([
  "scripts/check-linux-release.js",
  "src-electron/main-process/modules/user-facing-brand.js"
]);

function filesBelow(relative) {
  const absolute = path.join(root, relative);
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap(entry => {
    const child = path.join(relative, entry.name);
    return entry.isDirectory() ? filesBelow(child) : [child];
  });
}

const legacy = [];
for (const relative of sourceRoots.flatMap(filesBelow)) {
  if (relative === "scripts/check-unified-source.js") continue;
  let contents = fs.readFileSync(path.join(root, relative), "utf8");
  contents = contents.replace(/oxenmq/gi, "");
  if (allowedFiles.has(relative)) contents = contents.replace(/oxen/gi, "");
  if (/0xen|oxen/i.test(contents)) legacy.push(relative);
}

assert.deepStrictEqual(
  legacy,
  [],
  `non-protocol legacy brand tokens remain:\n${legacy.join("\n")}`
);

const appStyles = fs.readFileSync(path.join(root, "src/css/app.styl"), "utf8");
assert.match(
  appStyles,
  /\.primary-address\s*\{[\s\S]*?\.q-item,\s*\.q-item-side\s*\{[\s\S]*?background:\s*transparent/,
  "primary address card must use one continuous accent background"
);
for (const icon of ["qr-code.svg", "qr-code-grey.svg"]) {
  assert.strictEqual(
    fs.existsSync(path.join(root, "public", icon)),
    true,
    `referenced QR icon is missing: public/${icon}`
  );
}

const forbiddenRoots = [".DS_Store", ".quasar", "dist", "coverage"];
if (uploadMode) forbiddenRoots.push("bin", "node_modules");
for (const forbidden of forbiddenRoots) {
  assert.strictEqual(
    fs.existsSync(path.join(root, forbidden)),
    false,
    `forbidden upload artifact exists: ${forbidden}`
  );
}

if (uploadMode) {
  const uploadFiles = fs
    .readdirSync(root, { withFileTypes: true })
    .flatMap(entry =>
      entry.isDirectory() ? filesBelow(entry.name) : [entry.name]
    );
  const forbiddenFiles = uploadFiles.filter(relative =>
    /(^|\/)(\.DS_Store|\.env(?:\..*)?|.*\.(?:log|tmp|bak|swp|exe|deb)|.*\.AppImage)$/i.test(
      relative
    )
  );
  assert.deepStrictEqual(
    forbiddenFiles,
    [],
    `forbidden upload files remain:\n${forbiddenFiles.join("\n")}`
  );

  const privacyPatterns = [
    /\/Users\/(?!\[REDACTED\])[^/\s"'`]+/,
    /\/home\/(?!\[REDACTED\])[^/\s"'`]+/,
    /[A-Za-z]:\\Users\\(?!\[REDACTED\])[^\\\s"'`]+/,
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/
  ];
  const textExtensions = new Set([
    ".bat",
    ".cmd",
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".nsi",
    ".styl",
    ".txt",
    ".vue",
    ".xml",
    ".yaml",
    ".yml"
  ]);
  const privacyLeaks = uploadFiles.filter(relative => {
    if (!textExtensions.has(path.extname(relative))) return false;
    const contents = fs.readFileSync(path.join(root, relative), "utf8");
    return privacyPatterns.some(
      (pattern, index) =>
        !(index === 3 && /(?:^|-)lock\.yaml$/.test(relative)) &&
        pattern.test(contents)
    );
  });
  assert.deepStrictEqual(
    privacyLeaks,
    [],
    `privacy-sensitive literals remain:\n${privacyLeaks.join("\n")}`
  );

  const oversized = uploadFiles.filter(
    relative => fs.statSync(path.join(root, relative)).size > 25 * 1024 * 1024
  );
  assert.deepStrictEqual(
    oversized,
    [],
    `files exceed GitHub browser upload limit:\n${oversized.join("\n")}`
  );
}

console.log(
  uploadMode ? "Upload source audit passed" : "Unified source audit passed"
);
