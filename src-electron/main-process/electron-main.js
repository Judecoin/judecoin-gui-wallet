import {
  app,
  ipcMain,
  BrowserWindow,
  Menu,
  clipboard,
  dialog,
  nativeImage,
  shell
} from "electron";
import { version, productName } from "../../package.json";
import { Backend } from "./modules/backend";
import isDev from "electron-is-dev";
const net = require("net");
const windowStateKeeper = require("electron-window-state");
const path = require("upath");
const fs = require("fs");

function sanitizeLogText(value) {
  return String(value)
    .replace(
      /(mnemonic|seed|passphrase|password|secret|(?:private|spend|view)[ _-]?key)(\s*[=:]\s*)[^\s,;]+/gi,
      "$1$2[REDACTED]"
    )
    .replace(/C:\\Users\\[^\\\s]+/gi, "C:\\Users\\[REDACTED]")
    .replace(/\/Users\/[^/\s]+/g, "/Users/[REDACTED]")
    .replace(/\/home\/[^/\s]+/g, "/home/[REDACTED]")
    .slice(0, 16384);
}

function writeStartupFailure(kind, error) {
  try {
    const logDir = path.join(app.getPath("userData"), "jude", "logs");
    fs.mkdirSync(logDir, { recursive: true });
    const detail = sanitizeLogText(
      error && error.stack ? error.stack : String(error || "unknown error")
    );
    fs.appendFileSync(
      path.join(logDir, "startup-crash.log"),
      `${new Date().toISOString()} [${kind}] ${detail}\n`,
      "utf8"
    );
  } catch (_) {
    // A logging failure must never become a second startup failure.
  }
}

process.on("uncaughtException", error => {
  writeStartupFailure("uncaughtException", error);
  if (app.isReady()) {
    dialog.showErrorBox(
      "Jude Wallet startup error",
      "The wallet could not start. Details were written to startup-crash.log."
    );
  }
});

process.on("unhandledRejection", error => {
  writeStartupFailure("unhandledRejection", error);
});

app.on("render-process-gone", (_event, _webContents, details) => {
  writeStartupFailure("render-process-gone", JSON.stringify(details));
});

app.on("child-process-gone", (_event, details) => {
  writeStartupFailure("child-process-gone", JSON.stringify(details));
});

// The wallet does not need GPU acceleration. Software rendering also avoids
// startup crashes caused by outdated or remotely-provided Windows GPU drivers.
app.disableHardwareAcceleration();

// The splash screens autoplay a looping <video>; Chromium's autoplay policy
// would otherwise leave it paused on first paint
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

// A connect-probe (portscanner) can't detect Windows excluded port ranges:
// the port looks free but bind() fails with EACCES. Probe by actually binding.
// Final candidate 0 lets the OS pick any free port.
function findBindablePort(candidates) {
  return new Promise((resolve, reject) => {
    const tryNext = i => {
      if (i >= candidates.length) {
        reject(new Error("no bindable port found"));
        return;
      }
      const probe = net.createServer();
      probe.once("error", () => tryNext(i + 1));
      probe.once("listening", () => {
        const port = probe.address().port;
        probe.close(() => resolve(port));
      });
      probe.listen(candidates[i]);
    };
    tryNext(0);
  });
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = path.join(__dirname, "").replace(/\\/g, "\\\\");
  global.__ryo_bin = path.join(__dirname, "..", "bin").replace(/\\/g, "\\\\");
} else {
  global.__ryo_bin = path
    .join(process.cwd(), "bin", process.platform)
    .replace(/\\/g, "\\\\");
}

let mainWindow, backend;
let showConfirmClose = true;
let shutdownInProgress = false;
let rendererReady = false;
let closeFallbackTimer = null;

function isTrustedRenderer(event) {
  return Boolean(
    mainWindow &&
      !mainWindow.isDestroyed() &&
      event.sender === mainWindow.webContents
  );
}

function shutdownApplication(restart = false) {
  if (shutdownInProgress) return;
  shutdownInProgress = true;
  showConfirmClose = false;

  const activeBackend = backend;
  backend = null;
  const cleanup = activeBackend ? activeBackend.quit() : Promise.resolve();
  const cleanupDeadline = new Promise(resolve => setTimeout(resolve, 20000));

  Promise.race([
    Promise.resolve(cleanup).catch(() => {}),
    cleanupDeadline
  ]).then(() => {
    // Do not schedule the replacement process until wallet-rpc and daemon
    // have released their ports. This is required for reliable node-mode
    // switching on Windows.
    if (restart && !isDev) {
      console.info("[node-switch-restart-v2] child cleanup complete");
      app.relaunch();
    }
    setTimeout(() => app.exit(0), restart ? 350 : 0);
  });
}

function cleanMenuLabel(value, fallback) {
  if (typeof value !== "string") return fallback;
  const valueClean = value.replace(/[\r\n\t]/g, " ").trim();
  return valueClean.slice(0, 80) || fallback;
}

const title = `${productName} v${version}`;

let selectionMenu = Menu.buildFromTemplate([
  { role: "copy" },
  { type: "separator" },
  { role: "selectall" }
]);

let inputMenu = Menu.buildFromTemplate([
  { role: "cut" },
  { role: "copy" },
  { role: "paste" },
  { type: "separator" },
  { role: "selectall" }
]);

// Right-click menus use Electron roles whose default labels are English;
// the renderer pushes translated labels here whenever the app language changes
ipcMain.on("update-context-menu-labels", (e, labels) => {
  if (!isTrustedRenderer(e) || !labels || typeof labels !== "object") return;
  selectionMenu = Menu.buildFromTemplate([
    { role: "copy", label: cleanMenuLabel(labels.copy, "Copy") },
    { type: "separator" },
    {
      role: "selectall",
      label: cleanMenuLabel(labels.selectAll, "Select All")
    }
  ]);

  inputMenu = Menu.buildFromTemplate([
    { role: "cut", label: cleanMenuLabel(labels.cut, "Cut") },
    { role: "copy", label: cleanMenuLabel(labels.copy, "Copy") },
    { role: "paste", label: cleanMenuLabel(labels.paste, "Paste") },
    { type: "separator" },
    {
      role: "selectall",
      label: cleanMenuLabel(labels.selectAll, "Select All")
    }
  ]);
});

function createWindow() {
  /**
   * Initial window options
   */

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1100,
    defaultHeight: 750
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 880,
    minHeight: 580,
    show: false,
    // Frameless: window chrome is drawn by the renderer (components/titlebar.vue)
    frame: false,
    backgroundColor: "#0D1117",
    icon: require("path").join(__statics, "icon.png"),
    title,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      sandbox: true,
      enableRemoteModule: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      zoomFactor: 1,
      // anything we want preloaded, e.g. global vars
      preload: path.resolve(__dirname, "electron-preload.js")
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    // Quasar 1's desktop drawer occasionally measures the initial Windows
    // viewport before the frameless window is visible. A one-pixel native
    // resize triggers the same correct reflow users previously got by
    // maximizing and restoring, without changing the persisted window size.
    setTimeout(() => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      const [width, height] = mainWindow.getSize();
      mainWindow.setSize(width + 1, height);
      mainWindow.setSize(width, height);
      mainWindow.webContents.invalidate();
    }, 50);
  });

  const applicationUrl = new URL(process.env.APP_URL);
  mainWindow.webContents.on("will-navigate", (event, targetUrl) => {
    try {
      const target = new URL(targetUrl);
      if (
        target.protocol !== applicationUrl.protocol ||
        target.origin !== applicationUrl.origin ||
        target.pathname !== applicationUrl.pathname
      ) {
        event.preventDefault();
      }
    } catch (error) {
      event.preventDefault();
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    try {
      const parsed = new URL(targetUrl);
      const allowedHosts = new Set([
        "judeblock.net",
        "www.judeblock.net",
        "judecoin.info",
        "www.judecoin.info"
      ]);
      if (parsed.protocol === "https:" && allowedHosts.has(parsed.hostname)) {
        shell.openExternal(parsed.toString());
      }
    } catch (error) {
      // Invalid and non-HTTPS destinations remain blocked.
    }
    return { action: "deny" };
  });

  // The former Electron 4 build forced 125% zoom. On current Electron that
  // makes Quasar calculate a viewport narrower than the native window until a
  // maximize/restore cycle. Keep the renderer at its CSS-native 100% scale.
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.setZoomFactor(1);
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (isMainFrame) {
        writeStartupFailure(
          "did-fail-load",
          `${errorCode} ${errorDescription} ${validatedURL}`
        );
      }
    }
  );

  mainWindow.webContents.on(
    "console-message",
    (_event, level, message, line, sourceId) => {
      if (level >= 2) {
        writeStartupFailure(
          "renderer-console",
          `${message} (${sourceId}:${line})`
        );
      }
    }
  );

  ipcMain.on("renderer-ready", event => {
    if (!isTrustedRenderer(event)) return;
    rendererReady = true;
    writeStartupFailure("renderer-ready", "renderer initialized");
    // Reflow only after Vue/Quasar has mounted. This mirrors the layout update
    // caused by maximizing and restoring without changing the saved bounds.
    const [width, height] = mainWindow.getSize();
    mainWindow.setSize(width + 1, height);
    mainWindow.setSize(width, height);
    mainWindow.webContents.invalidate();
  });

  mainWindow.on("close", e => {
    if (showConfirmClose) {
      e.preventDefault();
      if (!rendererReady) {
        shutdownApplication(false);
        return;
      }
      mainWindow.webContents.send("confirmClose");
      clearTimeout(closeFallbackTimer);
      closeFallbackTimer = setTimeout(() => shutdownApplication(false), 5000);
    }
  });

  ipcMain.on("confirmClose", (e, restart) => {
    if (!isTrustedRenderer(e) || typeof restart !== "boolean") return;
    clearTimeout(closeFallbackTimer);
    shutdownApplication(restart);
  });

  ipcMain.on("window-command", (event, command) => {
    event.returnValue = false;
    if (!isTrustedRenderer(event) || typeof command !== "string") return;
    if (command === "isMaximized") {
      event.returnValue = mainWindow.isMaximized();
    } else if (command === "minimize") {
      mainWindow.minimize();
    } else if (command === "toggleMaximize") {
      mainWindow.isMaximized()
        ? mainWindow.unmaximize()
        : mainWindow.maximize();
    } else if (command === "close") {
      mainWindow.close();
    }
  });

  ipcMain.on("clipboard-write-text", (event, value) => {
    if (
      isTrustedRenderer(event) &&
      typeof value === "string" &&
      value.length <= 1024 * 1024
    ) {
      clipboard.writeText(value);
    }
  });

  ipcMain.on("clipboard-write-image", (event, value) => {
    if (
      isTrustedRenderer(event) &&
      typeof value === "string" &&
      value.length <= 10 * 1024 * 1024 &&
      /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(value)
    ) {
      clipboard.writeImage(nativeImage.createFromDataURL(value));
    }
  });

  ipcMain.handle("select-path", async (event, kind) => {
    if (!isTrustedRenderer(event) || !["file", "directory"].includes(kind)) {
      return null;
    }
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: [kind === "directory" ? "openDirectory" : "openFile"]
    });
    return result.canceled ? null : result.filePaths[0] || null;
  });

  mainWindow.webContents.on("did-finish-load", () => {
    // Set the title
    mainWindow.setTitle(title);

    require("crypto").randomBytes(64, (err, buffer) => {
      // if err, then we may have to use insecure token generation perhaps
      if (err) throw err;

      // single-instance is guaranteed by requestSingleInstanceLock(); the
      // renderer learns the actual port via the "initialize" IPC message
      findBindablePort([12313, 12413, 12613, 12813, 0])
        .then(port => {
          let config = {
            port,
            token: buffer.toString("hex")
          };
          backend = new Backend(mainWindow);
          backend.init(config);
          mainWindow.webContents.send("initialize", config);
        })
        .catch(() => {
          dialog
            .showMessageBox(mainWindow, {
              title: "Startup error",
              message: "Jude Wallet could not open an internal port",
              type: "error",
              buttons: ["ok"]
            })
            .finally(() => {
              showConfirmClose = false;
              app.quit();
            });
        });
    });
  });

  mainWindow.webContents.on("context-menu", (e, props) => {
    const { selectionText, isEditable } = props;
    if (isEditable) {
      inputMenu.popup(mainWindow);
    } else if (selectionText && selectionText.trim() !== "") {
      selectionMenu.popup(mainWindow);
    }
  });

  mainWindow.loadURL(process.env.APP_URL);
  setTimeout(() => {
    if (!rendererReady && mainWindow && !mainWindow.isDestroyed()) {
      writeStartupFailure(
        "renderer-timeout",
        "renderer did not report ready within 15 seconds"
      );
      dialog
        .showMessageBox(mainWindow, {
          title: "Jude Wallet startup problem",
          message:
            "The wallet interface could not start. You can close the window normally. Diagnostic details were written to startup-crash.log.",
          type: "error",
          buttons: ["Close wallet"]
        })
        .then(() => shutdownApplication(false));
    }
  }, 15000);
  mainWindowState.manage(mainWindow);
}

const gotInstanceLock = app.requestSingleInstanceLock();

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

app.on("ready", () => {
  if (!gotInstanceLock) {
    showConfirmClose = false;
    app.quit();
    return;
  }
  createWindow();
  const session = mainWindow.webContents.session;
  session.setPermissionRequestHandler((_webContents, _permission, callback) =>
    callback(false)
  );
  session.setPermissionCheckHandler(() => false);
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("before-quit", () => {
  if (backend) {
    backend.quit().then(() => {
      mainWindow.close();
    });
  }
});

app.on("quit", () => {});
