import { app, ipcMain, BrowserWindow, Menu, dialog } from "electron";
import { version, productName } from "../../package.json";
import { Backend } from "./modules/backend";
import { checkForUpdate } from "./auto-updater";
import menuTemplate from "./menu";
import isDev from "electron-is-dev";
const net = require("net");
const windowStateKeeper = require("electron-window-state");
const path = require("upath");

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
  global.__ryo_bin = path.join(process.cwd(), "bin").replace(/\\/g, "\\\\");
}

let mainWindow, backend;
let showConfirmClose = true;
let forceQuit = false;
let installUpdate = false;

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
  selectionMenu = Menu.buildFromTemplate([
    { role: "copy", label: labels.copy },
    { type: "separator" },
    { role: "selectall", label: labels.selectAll }
  ]);

  inputMenu = Menu.buildFromTemplate([
    { role: "cut", label: labels.cut },
    { role: "copy", label: labels.copy },
    { role: "paste", label: labels.paste },
    { type: "separator" },
    { role: "selectall", label: labels.selectAll }
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
    // Frameless: window chrome is drawn by the renderer (components/titlebar.vue)
    frame: false,
    backgroundColor: "#0D1117",
    icon: require("path").join(__statics, "icon.png"),
    title,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      zoomFactor: 1.25,
      // anything we want preloaded, e.g. global vars
      preload: path.resolve(__dirname, "electron-preload.js")
    }
  });

  // Electron 4 sometimes ignores webPreferences.zoomFactor; enforce after load
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.setZoomFactor(1.25);
  });

  mainWindow.on("close", e => {
    // Don't ask for confirmation if we're installing an update
    if (installUpdate) {
      return;
    }

    if (process.platform === "darwin") {
      if (forceQuit) {
        forceQuit = false;
        if (showConfirmClose) {
          e.preventDefault();
          mainWindow.show();
          mainWindow.webContents.send("confirmClose");
        } else {
          e.defaultPrevented = false;
        }
      } else {
        e.preventDefault();
        mainWindow.hide();
      }
    } else {
      if (showConfirmClose) {
        e.preventDefault();
        mainWindow.webContents.send("confirmClose");
      } else {
        e.defaultPrevented = false;
      }
    }
  });

  ipcMain.on("confirmClose", (e, restart) => {
    showConfirmClose = false;

    // In dev mode, this will launch a blank white screen
    if (restart && !isDev) app.relaunch();

    const promise = backend ? backend.quit() : Promise.resolve();
    promise.then(() => {
      backend = null;
      app.quit();
    });
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
          dialog.showMessageBox(
            mainWindow,
            {
              title: "Startup error",
              message: "Jude Wallet could not open an internal port",
              type: "error",
              buttons: ["ok"]
            },
            () => {
              showConfirmClose = false;
              app.quit();
            }
          );
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
  checkForUpdate(
    () => mainWindow,
    autoUpdater => {
      if (mainWindow) {
        mainWindow.webContents.send("showQuitScreen");
      }

      const promise = backend ? backend.quit() : Promise.resolve();
      promise.then(() => {
        installUpdate = true;
        backend = null;
        autoUpdater.quitAndInstall();
      });
    }
  );
  if (process.platform === "darwin") {
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  } else if (process.platform === "darwin") {
    mainWindow.show();
  }
});

app.on("before-quit", () => {
  // Quit instantly if we are installing an update
  if (installUpdate) {
    return;
  }

  if (process.platform === "darwin") {
    forceQuit = true;
  } else {
    if (backend) {
      backend.quit().then(() => {
        mainWindow.close();
      });
    }
  }
});

app.on("quit", () => {});
