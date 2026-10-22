import { ipcRenderer } from "src/electron-api";
import { Notify, Dialog, Loading, LocalStorage } from "quasar";
import { i18n, changeLanguage } from "src/boot/i18n";
const { emitAddressValidation } = require("src/utils/address-validation-event");

class EventEmitter {
  constructor() {
    this.listeners = Object.create(null);
  }

  once(event, callback) {
    if (typeof callback !== "function") return this;
    const wrapped = (...args) => {
      this.removeListener(event, wrapped);
      callback(...args);
    };
    (this.listeners[event] || (this.listeners[event] = [])).push(wrapped);
    return this;
  }

  removeListener(event, callback) {
    const callbacks = this.listeners[event];
    if (callbacks) {
      this.listeners[event] = callbacks.filter(item => item !== callback);
    }
    return this;
  }

  emit(event, ...args) {
    const callbacks = this.listeners[event];
    if (!callbacks) return false;
    callbacks.slice().forEach(callback => callback(...args));
    return callbacks.length > 0;
  }
}

export class Gateway extends EventEmitter {
  constructor(app, router) {
    super();
    this.app = app;
    this.router = router;
    this.token = null;

    // The wallet always opens in English; switching language via the
    // titlebar applies to the current session only (client requirement)
    this.setLanguage("en-us");

    // Windows uninstallers normally retain Chromium's LocalStorage. Use a
    // release-specific one-time marker so the first launch of this final
    // 4.0.0 package is dark even when an older test build left a light-theme
    // cache behind. After initialization, the user's theme choice is kept.
    const darkDefaultMarker = "jude-4.0.0-dark-default-initialized";
    const isDarkDefaultInitialized = LocalStorage.has(darkDefaultMarker);
    const theme = isDarkDefaultInitialized
      ? LocalStorage.has("theme")
        ? LocalStorage.getItem("theme")
        : "dark"
      : "dark";
    if (!isDarkDefaultInitialized) {
      LocalStorage.set("theme", "dark");
      LocalStorage.set(darkDefaultMarker, true);
    }
    this.app.store.commit("gateway/set_app_data", {
      config: {
        appearance: {
          theme
        }
      }
    });
    this.app.store.watch(
      state => state.gateway.app.config.appearance.theme,
      theme => {
        LocalStorage.set("theme", theme);
      }
    );

    this.closeDialog = false;
    ipcRenderer.send("renderer-ready", true);

    this.app.store.commit("gateway/set_app_data", {
      status: {
        code: 1 // Connecting to backend
      }
    });

    ipcRenderer.on("initialize", (event, data) => {
      this.token = data.token;
      setTimeout(() => {
        const token = encodeURIComponent(data.token);
        this.ws = new WebSocket(
          `ws://127.0.0.1:${data.port}/wallet?token=${token}`
        );
        this.ws.addEventListener("open", () => {
          this.open();
        });
        this.ws.addEventListener("message", e => {
          this.receive(e.data);
        });
      }, 1000);
    });

    ipcRenderer.on("confirmClose", () => {
      this.confirmClose(i18n.t("dialog.exit.message"));
    });

    ipcRenderer.on("showQuitScreen", () => {
      if (this.router) {
        this.router.replace({ path: "/quit" });
      }
    });
  }

  open() {
    this.app.store.commit("gateway/set_app_data", {
      status: {
        code: 2 // Loading config
      }
    });
    this.send("core", "init");
  }

  confirmClose(msg, restart = false) {
    if (this.closeDialog) {
      return;
    }
    this.closeDialog = true;

    const key = restart ? "restart" : "exit";

    Dialog.create({
      title: i18n.t(`dialog.${key}.title`),
      message: msg,
      ok: {
        label: i18n.t(`dialog.${key}.ok`),
        color: "primary"
      },
      cancel: {
        flat: true,
        label: i18n.t("dialog.buttons.cancel"),
        color: "grey"
      }
    })
      .onOk(() => {
        this.closeDialog = false;
        Loading.hide();
        this.router.replace({ path: "/quit" });
        ipcRenderer.send("confirmClose", restart);
      })
      .onCancel(() => {
        this.closeDialog = false;
      });
  }

  send(module, method, data = {}) {
    let message = {
      module,
      method,
      data
    };
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  geti18n(key) {
    return Array.isArray(key) ? i18n.t(...key) : i18n.t(key);
  }

  receive(message) {
    let decrypted_data;
    try {
      decrypted_data = JSON.parse(message);
    } catch (error) {
      return;
    }

    if (
      typeof decrypted_data !== "object" ||
      !decrypted_data.hasOwnProperty("event") ||
      !decrypted_data.hasOwnProperty("data")
    ) {
      return;
    }

    switch (decrypted_data.event) {
      case "set_language": {
        const { lang } = decrypted_data.data;
        this.setLanguage(lang);
        break;
      }
      case "set_has_password":
        this.emit("has_password", decrypted_data.data);
        break;
      case "set_valid_address":
        emitAddressValidation(this, decrypted_data.data);
        break;
      case "set_decrypt_record_result":
        this.emit("decrypt_record_result", decrypted_data.data);
        break;
      case "set_app_data":
        this.app.store.commit("gateway/set_app_data", decrypted_data.data);
        break;

      case "set_daemon_data":
        this.app.store.commit("gateway/set_daemon_data", decrypted_data.data);
        break;

      case "set_wallet_data":
      case "set_wallet_error":
        this.app.store.commit("gateway/set_wallet_data", decrypted_data.data);
        break;

      case "reset_wallet_error":
        this.app.store.dispatch("gateway/resetWalletStatus");
        break;

      case "set_tx_status": {
        const data = { ...decrypted_data.data };
        if (data.i18n) {
          data.message = this.geti18n(data.i18n);
        }
        this.app.store.commit("gateway/set_tx_status", data);
        break;
      }

      case "set_sweep_all_status": {
        const data = { ...decrypted_data.data };
        if (data.i18n) {
          data.message = this.geti18n(data.i18n);
        }
        this.app.store.commit("gateway/set_sweep_all_status", data);
        break;
      }

      case "set_ons_status": {
        const data = { ...decrypted_data.data };
        if (data.i18n) {
          data.message = this.geti18n(data.i18n);
        }

        this.app.store.commit("gateway/set_ons_status", data);
        break;
      }

      case "set_snode_status": {
        const data = { ...decrypted_data.data };

        // We have multiple nested objects in service_node_status
        for (const key in data) {
          if (data[key].i18n) {
            data[key].message = this.geti18n(data[key].i18n);
          }
        }

        this.app.store.commit("gateway/set_snode_status", data);
        break;
      }
      case "set_prove_transaction_status": {
        const data = { ...decrypted_data.data };

        if (data.i18n) {
          data.message = this.geti18n(data.i18n);
        }

        this.app.store.commit("gateway/set_prove_transaction_status", data);
        break;
      }
      case "set_check_transaction_status": {
        const data = { ...decrypted_data.data };

        if (data.i18n) {
          data.message = this.geti18n(data.i18n);
        }

        this.app.store.commit("gateway/set_check_transaction_status", data);
        break;
      }
      case "set_sign_status": {
        this.app.store.commit("gateway/set_sign_status", decrypted_data.data);
        break;
      }
      case "set_verify_status": {
        this.app.store.commit("gateway/set_verify_status", decrypted_data.data);
        break;
      }
      case "set_old_gui_import_status":
        this.app.store.commit(
          "gateway/set_old_gui_import_status",
          decrypted_data.data
        );
        break;

      case "wallet_list":
        this.app.store.commit("gateway/set_wallet_list", decrypted_data.data);
        break;

      case "settings_changed_reboot":
        this.confirmClose(i18n.t("dialog.restart.message"), true);
        break;

      case "show_notification": {
        let notification = {
          type: "positive",
          timeout: 1000,
          message: ""
        };
        const data =
          decrypted_data.data && typeof decrypted_data.data === "object"
            ? decrypted_data.data
            : {};
        if (data.i18n) {
          notification.message = this.geti18n(data.i18n);
        }
        Notify.create(Object.assign(notification, data));
        break;
      }

      case "show_loading":
        Loading.show({ ...(decrypted_data.data || {}) });
        break;

      case "hide_loading":
        Loading.hide();
        break;

      case "return_to_wallet_select":
        this.router.replace({ path: "/wallet-select" });
        setTimeout(() => {
          // short delay to prevent wallet data reaching the
          // websocket moments after we close and reset data
          this.app.store.dispatch("gateway/resetWalletData");
        }, 250);
        break;

      case "set_update_required":
        this.app.store.commit(
          "gateway/set_update_required",
          decrypted_data.data
        );
        break;
    }
  }

  setLanguage(lang) {
    changeLanguage(lang)
      .then(() => {
        // Native right-click menus live in the main process; keep their
        // labels in sync with the renderer language
        ipcRenderer.send("update-context-menu-labels", {
          cut: i18n.t("menuItems.cut"),
          copy: i18n.t("menuItems.copy"),
          paste: i18n.t("menuItems.paste"),
          selectAll: i18n.t("menuItems.selectAll")
        });
      })
      .catch(() => {
        Notify.create({
          type: "negative",
          timeout: 2000,
          message: i18n.t("notification.errors.failedToSetLanguage", {
            lang
          })
        });
      });
  }
}
