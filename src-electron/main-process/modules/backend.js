import { Daemon } from "./daemon";
import { WalletRPC } from "./wallet-rpc";
import { dialog } from "electron";

const WebSocket = require("ws");
const electron = require("electron");
const crypto = require("crypto");
const os = require("os");
const fs = require("fs-extra");
const path = require("upath");
const objectAssignDeep = require("object-assign-deep");
const { persistConfig } = require("./config-writer");

const { ipcMain: ipc } = electron;

const LOG_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace"];
const ALLOWED_EXTERNAL_HOSTS = new Set([
  "judeblock.net",
  "www.judeblock.net",
  "judecoin.info",
  "www.judecoin.info"
]);

function openTrustedExternal(rawUrl) {
  if (typeof rawUrl !== "string" || rawUrl.length > 2048) return false;
  try {
    const url = new URL(rawUrl);
    if (
      url.protocol !== "https:" ||
      !ALLOWED_EXTERNAL_HOSTS.has(url.hostname)
    ) {
      return false;
    }
    electron.shell.openExternal(url.toString());
    return true;
  } catch (error) {
    return false;
  }
}

function validRemoteHost(value) {
  return (
    typeof value === "string" &&
    value.length <= 253 &&
    /^(localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)$/i.test(
      value
    )
  );
}

function validPort(value) {
  const port = Number(value);
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

export class Backend {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.daemon = null;
    this.walletd = null;
    this.wss = null;
    this.token = null;
    this.config_dir = null;
    this.wallet_dir = null;
    this.config_file = null;
    this.config_data = {};
    this.log = null;
  }

  init(config) {
    const configDir = path.join(electron.app.getPath("userData"), "jude");
    this.wallet_dir =
      os.platform() === "win32"
        ? `${os.homedir()}\\Documents\\Jude`
        : path.join(os.homedir(), "Jude");

    {
      this.config_dir = configDir;
      if (!fs.existsSync(configDir)) {
        fs.mkdirpSync(configDir);
      }
    }

    if (!fs.existsSync(path.join(this.config_dir, "gui"))) {
      fs.mkdirpSync(path.join(this.config_dir, "gui"));
    }

    this.config_file = path.join(this.config_dir, "gui", "config.json");

    const daemon = {
      type: "local",
      p2p_bind_ip: "0.0.0.0",
      p2p_bind_port: 16060,
      rpc_bind_ip: "127.0.0.1",
      rpc_bind_port: 16061,
      zmq_rpc_bind_ip: "127.0.0.1",
      out_peers: -1,
      in_peers: -1,
      limit_rate_up: -1,
      limit_rate_down: -1,
      log_level: 0
    };

    const daemons = {
      mainnet: {
        ...daemon,
        // Local-by-default avoids disclosing wallet activity to a centralized
        // plaintext RPC endpoint. Users may explicitly configure a remote.
        type: "local",
        remote_host: "node1.judecoin.pro",
        remote_port: 16061
      },
      stagenet: {
        ...daemon,
        type: "local",
        p2p_bind_port: 36060,
        rpc_bind_port: 36061
      },
      testnet: {
        ...daemon,
        type: "local",
        p2p_bind_port: 26060,
        rpc_bind_port: 26061
      }
    };

    // Default values
    this.defaults = {
      daemons: objectAssignDeep({}, daemons),
      app: {
        data_dir: this.config_dir,
        wallet_data_dir: this.wallet_dir,
        ws_bind_port: 12313,
        net_type: "mainnet"
      },
      wallet: {
        rpc_bind_port: 16065,
        log_level: 0
      }
    };

    this.config_data = {
      // Copy all the properties of defaults
      ...objectAssignDeep({}, this.defaults)
    };

    this.remotes = [
      { host: "node1.judecoin.pro", port: 16061 },
      { host: "node2.judecoin.pro", port: 16061 },
      { host: "node.judecoin.info", port: 16061 }
    ];

    this.token = config.token;
    const expectedToken = Buffer.from(this.token, "utf8");

    this.wss = new WebSocket.Server({
      host: "127.0.0.1",
      port: config.port,
      maxPayload: 1024 * 1024,
      verifyClient: ({ req }) => {
        try {
          const requestUrl = new URL(req.url, "ws://127.0.0.1");
          if (requestUrl.pathname !== "/wallet") return false;
          const suppliedToken = Buffer.from(
            requestUrl.searchParams.get("token") || "",
            "utf8"
          );
          return (
            suppliedToken.length === expectedToken.length &&
            crypto.timingSafeEqual(suppliedToken, expectedToken)
          );
        } catch (error) {
          return false;
        }
      }
    });

    this.wss.on("connection", ws => {
      const rate = { windowStart: Date.now(), count: 0 };
      ws.on("message", data => {
        const now = Date.now();
        if (now - rate.windowStart >= 1000) {
          rate.windowStart = now;
          rate.count = 0;
        }
        rate.count += 1;
        if (rate.count > 100) {
          ws.close(1008, "rate limit");
          return;
        }
        this.receive(data);
      });
    });
  }

  send(event, data = {}) {
    let message = {
      event,
      data
    };

    const serialized = JSON.stringify(message);

    this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    });
  }

  reportConfigWriteError(error) {
    if (this.log) {
      this.log.error(`Failed to save wallet settings: ${error.message}`);
    } else {
      console.error(`Failed to save wallet settings: ${error.message}`);
    }
    this.send("show_notification", {
      type: "negative",
      i18n: "notification.errors.internalError",
      timeout: 3000
    });
  }

  receive(data) {
    if (!data || data.length > 1024 * 1024) return;
    let decrypted_data;
    try {
      decrypted_data = JSON.parse(data.toString("utf8"));
    } catch (error) {
      return;
    }
    if (
      !decrypted_data ||
      typeof decrypted_data !== "object" ||
      typeof decrypted_data.module !== "string" ||
      typeof decrypted_data.method !== "string"
    ) {
      return;
    }

    // route incoming request to either the daemon, wallet, or here
    switch (decrypted_data.module) {
      case "core":
        this.handle(decrypted_data);
        break;
      case "daemon":
        if (this.daemon) {
          this.daemon.handle(decrypted_data);
        }
        break;
      case "wallet":
        if (this.walletd) {
          this.walletd.handle(decrypted_data);
        }
        break;
    }
  }

  handle(data) {
    const params = data.data && typeof data.data === "object" ? data.data : {};

    // check if config has changed
    let config_changed = false;

    switch (data.method) {
      case "set_language":
        this.send("set_language", { lang: params.lang });
        break;
      case "quick_save_config":
        // save only partial config settings
        {
          const previousConfig = this.config_data;
          this.config_data = objectAssignDeep(
            {},
            this.config_data || {},
            params
          );
          persistConfig(fs, this.config_file, this.config_data)
            .then(() => {
              this.send("set_app_data", {
                config: params,
                pending_config: params
              });
            })
            .catch(error => {
              this.config_data = previousConfig;
              this.reportConfigWriteError(error);
            });
        }
        break;
      case "save_config_init":
      case "save_config": {
        const previousConfigData = this.config_data;
        const previousConfig = JSON.stringify(previousConfigData || {});
        this.config_data = objectAssignDeep({}, this.config_data || {}, params);
        config_changed =
          data.method === "save_config" &&
          previousConfig !== JSON.stringify(this.config_data);

        const validated = Object.keys(this.defaults)
          .filter(k => k in this.config_data)
          .map(k => [
            k,
            this.validate_values(this.config_data[k], this.defaults[k])
          ])
          .reduce((map, obj) => {
            map[obj[0]] = obj[1];
            return map;
          }, {});

        // Validate daemon data
        this.config_data = {
          ...this.config_data,
          ...validated
        };
        Object.keys(this.config_data.daemons || {}).forEach(network => {
          const daemon = this.config_data.daemons[network];
          const defaults = this.defaults.daemons[network];
          if (!daemon || !defaults) return;
          if (!["local", "local_remote", "remote"].includes(daemon.type)) {
            daemon.type = defaults.type;
          }
          if (!validRemoteHost(daemon.remote_host)) {
            daemon.remote_host = defaults.remote_host;
          }
          [
            "p2p_bind_port",
            "remote_port",
            "rpc_bind_port",
            "zmq_rpc_bind_port"
          ].forEach(key => {
            if (!validPort(daemon[key])) daemon[key] = defaults[key];
          });
        });

        persistConfig(fs, this.config_file, this.config_data)
          .then(() => {
            if (data.method == "save_config_init") {
              this.startup();
            } else {
              this.send("set_app_data", {
                config: this.config_data,
                pending_config: this.config_data
              });
              if (config_changed) {
                this.send("settings_changed_reboot");
              }
            }
          })
          .catch(error => {
            this.config_data = previousConfigData;
            this.reportConfigWriteError(error);
          });
        break;
      }
      case "init":
        this.startup();
        break;

      case "open_explorer": {
        const { net_type } = this.config_data.app;

        let path = null;
        if (params.type === "tx") {
          path = "tx";
        } else if (params.type === "service_node") {
          path = "sn";
        }

        if (path) {
          const baseUrl =
            net_type === "testnet"
              ? "https://www.judeblock.net"
              : "https://www.judeblock.net";
          const url = `${baseUrl}/${path}/`;
          const identifier =
            typeof params.id === "string" &&
            /^[A-Za-z0-9_-]{1,128}$/.test(params.id)
              ? params.id
              : "";
          if (identifier) openTrustedExternal(url + identifier);
        }
        break;
      }

      case "open_url":
        openTrustedExternal(params.url);
        break;

      case "save_png": {
        if (
          typeof params.img !== "string" ||
          !/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(params.img) ||
          params.img.length > 10 * 1024 * 1024
        ) {
          break;
        }
        dialog
          .showSaveDialog(this.mainWindow, {
            title: "Save " + String(params.type || "image").slice(0, 80),
            filters: [{ name: "PNG", extensions: ["png"] }],
            defaultPath: os.homedir()
          })
          .then(({ canceled, filePath: filename }) => {
            if (canceled || !filename) return;
            let base64Data = params.img.replace(/^data:image\/png;base64,/, "");
            let binaryData = Buffer.from(base64Data, "base64");
            fs.writeFile(filename, binaryData, err => {
              if (err) {
                this.send("show_notification", {
                  type: "negative",
                  i18n: [
                    "notification.errors.errorSavingItem",
                    { item: params.type }
                  ],
                  timeout: 2000
                });
              } else {
                this.send("show_notification", {
                  i18n: [
                    "notification.positive.itemSaved",
                    { item: params.type, filename }
                  ],
                  timeout: 2000
                });
              }
            });
          })
          .catch(() => {});
        break;
      }

      default:
        break;
    }
  }
  async checkVersion() {
    // Disabled until Jude publishes signed update metadata from an official
    // origin. Never inherit update decisions from an unrelated repository.
    this.send("set_update_required", false);
  }

  initLogger(logPath) {
    const logFile = path.join(logPath, "electron.log");
    const write = (level, ...items) => {
      const text = items
        .map(item => {
          if (item instanceof Error) return item.stack || item.message;
          if (typeof item === "string") return item;
          try {
            return JSON.stringify(item);
          } catch (_) {
            return String(item);
          }
        })
        .join(" ");
      fs.appendFile(
        logFile,
        `${new Date().toISOString()} [${level.toUpperCase()}] ${text}\n`,
        () => {}
      );
    };
    const log = {};
    LOG_LEVELS.forEach(level => {
      log[level] = (...items) => write(level, ...items);
    });

    LOG_LEVELS.forEach(level => {
      ipc.on(`log-${level}`, (event, ...rest) => {
        if (event.sender !== this.mainWindow.webContents) {
          return;
        }
        const limited = rest
          .map(item => String(item))
          .join(" ")
          .slice(0, 16384);
        log[level](limited);
      });
    });

    this.log = log;

    process.on("uncaughtException", error => {
      log.error("Unhandled Error", error);
    });

    process.on("unhandledRejection", error => {
      log.error("Unhandled Promise Rejection", error);
    });
  }

  startup() {
    this.send("set_app_data", {
      remotes: this.remotes,
      defaults: this.defaults
    });

    this.checkVersion();

    fs.readFile(this.config_file, "utf8", (err, data) => {
      if (err) {
        this.send("set_app_data", {
          status: {
            code: -1 // Config not found
          },
          config: this.config_data,
          pending_config: this.config_data
        });
        return;
      }

      let disk_config_data;
      try {
        disk_config_data = JSON.parse(data);
      } catch (parseError) {
        this.log.error("Invalid wallet configuration JSON", parseError);
        this.send("set_app_data", {
          status: { code: -1 },
          config: this.config_data,
          pending_config: this.config_data
        });
        return;
      }

      if (
        !disk_config_data ||
        typeof disk_config_data !== "object" ||
        Array.isArray(disk_config_data)
      ) {
        this.log.error("Invalid wallet configuration root object");
        this.send("set_app_data", {
          status: { code: -1 },
          config: this.config_data,
          pending_config: this.config_data
        });
        return;
      }

      // semi-shallow object merge
      Object.keys(disk_config_data).map(key => {
        const diskValue = disk_config_data[key];
        if (
          !diskValue ||
          typeof diskValue !== "object" ||
          Array.isArray(diskValue)
        ) {
          return;
        }
        if (
          !Object.prototype.hasOwnProperty.call(this.config_data, key) ||
          !this.config_data[key] ||
          typeof this.config_data[key] !== "object" ||
          Array.isArray(this.config_data[key])
        ) {
          this.config_data[key] = {};
        }
        this.config_data[key] = Object.assign(
          this.config_data[key],
          disk_config_data[key]
        );
      });

      // here we may want to check if config data is valid, if not also send code -1
      // i.e. check ports are integers and > 1024, check that data dir path exists, etc
      const validated = Object.keys(this.defaults)
        .filter(k => k in this.config_data)
        .map(k => [
          k,
          this.validate_values(this.config_data[k], this.defaults[k])
        ])
        .reduce((map, obj) => {
          map[obj[0]] = obj[1];
          return map;
        }, {});

      // Make sure the daemon data is valid
      this.config_data = {
        ...this.config_data,
        ...validated
      };
      // Migrate only the exact retired presets when a remote mode is selected.
      const mainnetDaemon = this.config_data.daemons.mainnet;
      if (
        mainnetDaemon &&
        mainnetDaemon.type !== "local" &&
        [
          "localhost",
          "127.0.0.1",
          "node1.judecoin.com",
          "node.judecoinworld.com",
          "67.230.167.187"
        ].includes(mainnetDaemon.remote_host) &&
        Number(mainnetDaemon.remote_port) === 16061
      ) {
        mainnetDaemon.remote_host = this.remotes[0].host;
        mainnetDaemon.remote_port = this.remotes[0].port;
      }
      // save config file back to file, so updated options are stored on disk
      fs.writeFile(
        this.config_file,
        JSON.stringify(this.config_data, null, 4),
        "utf8",
        () => {}
      );

      this.send("set_app_data", {
        config: this.config_data,
        pending_config: this.config_data
      });

      // Make the wallet dir
      const { wallet_data_dir, data_dir } = this.config_data.app;
      if (!fs.existsSync(wallet_data_dir)) {
        fs.mkdirpSync(wallet_data_dir);
      }

      // Check to see if data and wallet directories exist
      const dirs_to_check = [
        {
          path: data_dir,
          error: "notification.errors.dataPathNotFound"
        },
        {
          path: wallet_data_dir,
          error: "notification.errors.walletPathNotFound"
        }
      ];

      for (const dir of dirs_to_check) {
        // Check to see if dir exists
        if (!fs.existsSync(dir.path)) {
          this.send("show_notification", {
            type: "negative",
            i18n: dir.error,
            timeout: 2000
          });

          // Go back to config
          this.send("set_app_data", {
            status: {
              code: -1 // Return to config screen
            }
          });
          return;
        }
      }

      const { net_type } = this.config_data.app;

      const dirs = {
        mainnet: this.config_data.app.data_dir,
        stagenet: path.join(this.config_data.app.data_dir, "stagenet"),
        testnet: path.join(this.config_data.app.data_dir, "testnet")
      };

      // Make sure we have the directories we need
      const net_dir = dirs[net_type];
      if (!fs.existsSync(net_dir)) {
        fs.mkdirpSync(net_dir);
      }

      const log_dir = path.join(net_dir, "logs");
      if (!fs.existsSync(log_dir)) {
        fs.mkdirpSync(log_dir);
      }

      this.initLogger(log_dir);

      this.daemon = new Daemon(this);
      this.walletd = new WalletRPC(this);

      this.send("set_app_data", {
        status: {
          code: 3 // Starting daemon
        }
      });

      // Make sure the remote node provided is accessible
      const config_daemon = this.config_data.daemons[net_type];
      let runtime_config = this.config_data;
      const checkRemoteWithFailover = async () => {
        const initialResult = await this.daemon.checkRemote(config_daemon);
        if (!initialResult.error || config_daemon.type === "local") {
          return initialResult;
        }

        for (const preset of this.remotes) {
          if (
            preset.host === config_daemon.remote_host &&
            Number(preset.port) === Number(config_daemon.remote_port)
          ) {
            continue;
          }
          const candidate = {
            ...config_daemon,
            remote_host: preset.host,
            remote_port: preset.port
          };
          const candidateResult = await this.daemon.checkRemote(candidate);
          if (!candidateResult.error) {
            config_daemon.remote_host = preset.host;
            config_daemon.remote_port = preset.port;
            fs.writeFile(
              this.config_file,
              JSON.stringify(this.config_data, null, 4),
              "utf8",
              () => {}
            );
            this.send("set_app_data", {
              config: this.config_data,
              pending_config: this.config_data
            });
            if (this.log) {
              this.log.info(
                `Selected reachable remote node ${preset.host}:${preset.port}`
              );
            }
            return candidateResult;
          }
        }
        return initialResult;
      };

      checkRemoteWithFailover().then(data => {
        if (data.error) {
          // If we can default to local then we do so, otherwise we tell the user  to re-set the node
          if (config_daemon.type === "local_remote") {
            runtime_config = {
              ...this.config_data,
              daemons: {
                ...this.config_data.daemons,
                [net_type]: {
                  ...config_daemon,
                  type: "local"
                }
              }
            };
            if (this.log) {
              this.log.warn(
                "Configured remote node was unavailable; continuing with the local node"
              );
            }
          } else {
            this.send("show_notification", {
              type: "negative",
              i18n: "notification.errors.cannotAccessRemoteNode",
              timeout: 2000
            });

            // Go back to config
            this.send("set_app_data", {
              status: {
                code: -1 // Return to config screen
              }
            });
            return;
          }
        }

        // If we got a net type back then check if ours match
        if (data.net_type && data.net_type !== net_type) {
          this.send("show_notification", {
            type: "negative",
            i18n: "notification.errors.differentNetType",
            timeout: 2000
          });

          // Go back to config
          this.send("set_app_data", {
            status: {
              code: -1 // Return to config screen
            }
          });
          return;
        }

        this.daemon
          .checkVersion()
          .then(version => {
            if (version) {
              this.send("set_app_data", {
                status: {
                  code: 4,
                  message: version
                }
              });
            } else {
              // Version probing is informational only. In particular, do not
              // overwrite the user's selected local/local+remote mode when a
              // bundled daemon returns no version text or the probe times out.
              // daemon.start() below remains responsible for starting exactly
              // the persisted mode and reporting a genuine launch failure.
              this.send("set_app_data", {
                status: {
                  code: 4,
                  message: "N/A"
                }
              });
            }

            this.daemon
              .start(runtime_config)
              .then(() => {
                this.send("set_app_data", {
                  status: {
                    code: 6 // Starting wallet
                  }
                });

                this.walletd
                  .start(runtime_config)
                  .then(() => {
                    this.send("set_app_data", {
                      status: {
                        code: 7 // Reading wallet list
                      }
                    });

                    this.walletd.listWallets(true);

                    this.send("set_app_data", {
                      status: {
                        code: 0 // Ready
                      }
                    });
                    // eslint-disable-next-line
                  })
                  .catch(error => {
                    this.daemon.killProcess();
                    this.send("show_notification", {
                      type: "negative",
                      message: error.message,
                      timeout: 3000
                    });
                    this.send("set_app_data", {
                      status: {
                        code: -1 // Return to config screen
                      }
                    });
                  });
                // eslint-disable-next-line
              })
              .catch(error => {
                if (runtime_config.daemons[net_type].type == "remote") {
                  this.send("show_notification", {
                    type: "negative",
                    i18n: "notification.errors.remoteCannotBeReached",
                    timeout: 3000
                  });
                } else {
                  this.send("show_notification", {
                    type: "negative",
                    message: error.message,
                    timeout: 3000
                  });
                }
                this.send("set_app_data", {
                  status: {
                    code: -1 // Return to config screen
                  }
                });
              });
            // eslint-disable-next-line
          })
          .catch(() => {
            this.send("set_app_data", {
              status: {
                code: -1 // Return to config screen
              }
            });
          });
      });
    });
  }

  quit() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }

    // Stop wallet-rpc first: it may still need the daemon while closing the
    // wallet. Stopping both in parallel intermittently left one child holding
    // its RPC port during an application relaunch.
    const stopWallet = this.walletd
      ? Promise.resolve(this.walletd.quit()).catch(() => {})
      : Promise.resolve();

    return stopWallet.then(() => {
      return this.daemon
        ? Promise.resolve(this.daemon.quit()).catch(() => {})
        : Promise.resolve();
    });
  }

  // Replace any invalid value with default values
  validate_values(values, defaults) {
    const isDictionary = v =>
      typeof v === "object" &&
      v !== null &&
      !(v instanceof Array) &&
      !(v instanceof Date);
    const modified = { ...values };

    // Make sure we have valid defaults
    if (!isDictionary(defaults)) return modified;

    for (const key in modified) {
      // Only modify if we have a default
      if (!(key in defaults)) continue;

      const defaultValue = defaults[key];
      const invalidDefault =
        defaultValue === null ||
        defaultValue === undefined ||
        Number.isNaN(defaultValue);
      if (invalidDefault) continue;

      const value = modified[key];

      // If we have a object then recurse through it
      if (isDictionary(value)) {
        modified[key] = this.validate_values(value, defaultValue);
      } else {
        // Check if we need to replace the value
        const isValidValue = !(
          value === undefined ||
          value === null ||
          value === "" ||
          Number.isNaN(value)
        );
        if (isValidValue) continue;

        // Otherwise set the default value
        modified[key] = defaultValue;
      }
    }
    return modified;
  }
}
