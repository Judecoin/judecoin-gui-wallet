<template>
  <div class="jude-titlebar row items-center no-wrap">
    <div class="titlebar-actions row items-center no-wrap">
      <slot name="left" />
      <q-btn
        v-if="walletActions"
        flat
        dense
        size="sm"
        icon="exit_to_app"
        class="titlebar-btn"
        @click="logout"
      />
      <q-btn
        v-if="walletActions || languageSelect"
        flat
        dense
        size="sm"
        icon="language"
        class="titlebar-btn"
      >
        <q-menu anchor="bottom left" self="top left">
          <q-list separator class="menu-list titlebar-lang-list">
            <q-item
              v-for="option in languages"
              :key="option.code"
              v-close-popup
              clickable
              :class="{ 'lang-active': $i18n.locale === option.code }"
              @click.native="setLanguage(option.code)"
            >
              <span :class="`flag-icon flag-icon-${option.flag}`" />
              <span class="lang-name">{{ option.name }}</span>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn
        flat
        dense
        size="sm"
        :icon="theme === 'dark' ? 'brightness_2' : 'wb_sunny'"
        class="titlebar-btn"
        @click="toggleTheme"
      />
    </div>

    <div class="titlebar-title col ellipsis">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="titlebar-actions row items-center no-wrap">
      <q-btn
        flat
        dense
        size="sm"
        icon="remove"
        class="titlebar-btn"
        @click="minimize"
      />
      <q-btn
        flat
        dense
        size="sm"
        :icon="isMaximized ? 'filter_none' : 'crop_square'"
        class="titlebar-btn"
        @click="toggleMaximize"
      />
      <q-btn
        flat
        dense
        size="sm"
        icon="close"
        class="titlebar-btn close-btn"
        @click="close"
      />
    </div>
  </div>
</template>

<script>
import { remote } from "electron";
import { mapState } from "vuex";
import { languages } from "src/i18n";

export default {
  name: "TitleBar",
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    walletActions: {
      type: Boolean,
      required: false,
      default: false
    },
    languageSelect: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isMaximized: remote.getCurrentWindow().isMaximized(),
      languages
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    isRPCSyncing: state => state.gateway.wallet.isRPCSyncing
  }),
  mounted() {
    window.addEventListener("resize", this.updateMaximized);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMaximized);
  },
  methods: {
    updateMaximized() {
      this.isMaximized = remote.getCurrentWindow().isMaximized();
    },
    minimize() {
      remote.getCurrentWindow().minimize();
    },
    toggleMaximize() {
      const win = remote.getCurrentWindow();
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
      this.isMaximized = win.isMaximized();
    },
    close() {
      remote.getCurrentWindow().close();
    },
    setLanguage(lang) {
      this.$gateway.send("core", "set_language", { lang });
    },
    toggleTheme() {
      this.$store.commit("gateway/set_app_data", {
        config: {
          appearance: {
            theme: this.theme === "dark" ? "light" : "dark"
          }
        }
      });
    },
    logout() {
      // Same restart flow as the old MainMenu switchWallet — wallet-rpc long
      // polling prevents an in-session wallet switch (upstream workaround)
      if (this.isRPCSyncing) {
        this.$gateway.confirmClose(
          this.$t("dialog.switchWallet.restartMessage"),
          true
        );
        return;
      }
      this.$gateway.confirmClose(
        this.$t("dialog.switchWallet.restartWalletMessage"),
        true
      );
    }
  }
};
</script>

<style lang="scss">
.jude-titlebar {
  height: 36px;
  min-height: 36px;
  background: var(--jude-bg-header);
  color: var(--jude-text);
  border-bottom: 1px solid var(--jude-border);
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;

  .titlebar-title {
    text-align: center;
    font-size: 14px;
    font-weight: 500;

    .titlebar-brand-logo {
      height: 20px;
      vertical-align: middle;
      margin-right: 8px;
      -webkit-user-drag: none;
    }
  }

  .titlebar-actions {
    -webkit-app-region: no-drag;
  }

  .titlebar-btn {
    width: 40px;
    height: 36px;
    border-radius: 0;
    color: var(--jude-text-dim);

    &:hover {
      color: var(--jude-text);
    }
  }

  .close-btn:hover {
    background: #e81123;
    color: #ffffff;
  }
}

.titlebar-lang-list {
  min-width: 170px;

  .q-item {
    padding: 8px 16px;

    .flag-icon {
      margin-right: 10px;
    }

    .lang-name {
      font-size: 13px;
    }

    &.lang-active {
      color: var(--jude-accent);
      font-weight: 700;
    }
  }
}
</style>
