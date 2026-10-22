const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const startup = fs.readFileSync(
  path.join(root, "src/pages/init/index.vue"),
  "utf8"
);
const quit = fs.readFileSync(
  path.join(root, "src/pages/init/quit.vue"),
  "utf8"
);

assert(
  startup.includes("splash-loop-light-v12-alpha.webm") &&
    startup.includes("splash-loop-v12-alpha.webm"),
  "startup page must use the transparent light and dark animations"
);
assert(
  startup.includes('class="startup-splash-logo"') &&
    !startup.includes('class="splash-logo startup-splash-logo"'),
  "startup splash must not use the circular global splash style"
);
assert(
  startup.includes(".startup-splash-logo") &&
    startup.includes("width: min(520px, 72vw)"),
  "startup splash size rule is missing"
);
assert(
  quit.includes("splash-loop-light-v12-alpha.webm") &&
    quit.includes("splash-loop-v12-alpha.webm"),
  "quit page must use the transparent light and dark animations"
);
assert(
  quit.includes('class="quit-splash-logo"') &&
    !quit.includes("splash-logo quit-splash-logo"),
  "quit splash must not use the circular global splash style"
);
assert(
  quit.includes(".quit-splash-logo") &&
    quit.includes("width: min(520px, 72vw)"),
  "quit splash must match the startup splash size"
);
assert(
  startup.includes("background: #0c1117") &&
    startup.includes("background: #dce1e5") &&
    quit.includes("background: #0c1117") &&
    quit.includes("background: #dce1e5"),
  "startup and quit backgrounds must blend with both animation variants"
);

console.log("Splash page asset and layout checks passed");
