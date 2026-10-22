// Quasar copies the preload entry into app.asar without its sibling files, so
// keep the renderer logging bridge in this entry instead of requiring it.
const { contextBridge, ipcRenderer } = require("electron");
const SEND_CHANNELS = new Set([
  "clipboard-write-image",
  "clipboard-write-text",
  "confirmClose",
  "renderer-ready",
  "update-context-menu-labels",
  "window-command"
]);
const RECEIVE_CHANNELS = new Set([
  "confirmClose",
  "initialize",
  "showQuitScreen"
]);

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

function cleanArgsForIPC(args) {
  const text = args
    .map(item => {
      if (typeof item === "string") return item;
      try {
        return JSON.stringify(item);
      } catch (error) {
        return item;
      }
    })
    .join(" ");
  return sanitizeLogText(text);
}

function logAtLevel(level, prefix, ...args) {
  const consoleMethod = `_${level}`;
  const safeText = cleanArgsForIPC(args);
  console[consoleMethod](prefix, new Date().toJSON(), safeText);
  ipcRenderer.send(`log-${level}`, safeText);
}

if (window.console) {
  console._log = console.log;
  console._trace = console.trace;
  console._debug = console.debug;
  console._info = console.info;
  console._warn = console.warn;
  console._error = console.error;
  console._fatal = console.error;
  console.log = (...args) => logAtLevel("info", "INFO ", ...args);
}

const log = {
  fatal: (...args) => logAtLevel("fatal", "FATAL", ...args),
  error: (...args) => logAtLevel("error", "ERROR", ...args),
  warn: (...args) => logAtLevel("warn", "WARN ", ...args),
  info: (...args) => logAtLevel("info", "INFO ", ...args),
  debug: (...args) => logAtLevel("debug", "DEBUG", ...args),
  trace: (...args) => logAtLevel("trace", "TRACE", ...args)
};

function safeSend(channel, value) {
  if (SEND_CHANNELS.has(channel)) ipcRenderer.send(channel, value);
}

function safeOn(channel, callback) {
  if (!RECEIVE_CHANNELS.has(channel) || typeof callback !== "function") return;
  ipcRenderer.on(channel, (_event, ...args) => callback(...args));
}

contextBridge.exposeInMainWorld("electronAPI", {
  ipc: {
    on: safeOn,
    send: safeSend
  },
  clipboard: {
    writeText(value) {
      if (typeof value === "string" && value.length <= 1024 * 1024) {
        safeSend("clipboard-write-text", value);
      }
    },
    writeImageDataUrl(value) {
      if (
        typeof value === "string" &&
        value.length <= 10 * 1024 * 1024 &&
        /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(value)
      ) {
        safeSend("clipboard-write-image", value);
      }
    }
  },
  dialog: {
    selectFile: () => ipcRenderer.invoke("select-path", "file"),
    selectDirectory: () => ipcRenderer.invoke("select-path", "directory")
  },
  window: {
    close: () => safeSend("window-command", "close"),
    isMaximized: () => ipcRenderer.sendSync("window-command", "isMaximized"),
    minimize: () => safeSend("window-command", "minimize"),
    toggleMaximize: () => safeSend("window-command", "toggleMaximize")
  },
  log
});

window.onerror = (message, script, line, col, error) => {
  const errorInfo = error && error.stack ? error.stack : JSON.stringify(error);
  log.error(`Top-level unhandled error: ${errorInfo}`);
};

window.addEventListener("unhandledrejection", rejectionEvent => {
  const error = rejectionEvent.reason;
  const errorInfo = error && error.stack ? error.stack : error;
  log.error("Top-level unhandled promise rejection:", errorInfo);
});
