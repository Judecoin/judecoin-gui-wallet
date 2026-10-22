const assert = require("assert");
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");

const packageJson = JSON.parse(read("package.json"));
assert.strictEqual(
  packageJson.dependencies.axios,
  "1.20.0",
  "axios must use the reviewed security update"
);
for (const [dependency, version] of Object.entries({
  "follow-redirects": "1.16.1",
  nanoid: "3.3.18",
  "source-map-js": "1.2.2"
})) {
  const installed = JSON.parse(read(`node_modules/${dependency}/package.json`))
    .version;
  assert.strictEqual(
    installed,
    version,
    `${dependency} must use the patched transitive version`
  );
}

const gatewayState = read("src/store/gateway/state.js");
assert.doesNotMatch(
  gatewayState,
  /^\s*difficulty:\s*0,?$/m,
  "unused daemon difficulty state remains"
);

for (const asset of [
  "03-about-banner.png",
  "splash-loop-v11.webm",
  "splash-loop-light-v11.webm"
]) {
  assert.strictEqual(
    fs.existsSync(path.join(root, "public/jude-assets/brand", asset)),
    false,
    `unused legacy asset remains: ${asset}`
  );
}

const builder = read("electron-builder-final.yml");
const quasarConfig = read("quasar.conf.js");
for (const exclusion of [
  "!**/*.map",
  "!**/{test,tests}/**/*",
  "!**/{example,examples}/**/*",
  "!**/docs/**/*",
  "!**/.github/**/*"
]) {
  assert.ok(
    builder.includes(exclusion),
    `release package exclusion is missing: ${exclusion}`
  );
  assert.ok(
    quasarConfig.includes(exclusion),
    `Quasar package exclusion is missing: ${exclusion}`
  );
}

const missingMediaTool = spawnSync(
  process.execPath,
  ["scripts/check-splash-alpha.js", "missing.webm"],
  {
    cwd: root,
    env: { ...process.env, FFMPEG_PATH: "missing-ffmpeg-for-test" },
    encoding: "utf8"
  }
);
assert.notStrictEqual(missingMediaTool.status, 0);
assert.match(
  `${missingMediaTool.stdout}${missingMediaTool.stderr}`,
  /Unable to run media checker: missing-ffmpeg-for-test/
);

console.log("Release hygiene checks passed");
