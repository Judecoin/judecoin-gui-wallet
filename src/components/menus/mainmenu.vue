<template>
  <div>
    <q-btn class="titlebar-btn" icon="menu" size="sm" flat dense>
      <q-menu>
        <q-list separator class="menu-list">
          <q-item
            v-if="!disableSwitchWallet"
            v-close-popup
            clickable
            @click.native="switchWallet"
          >
            <q-item-label header>{{
              $t("menuItems.switchWallet")
            }}</q-item-label>
          </q-item>
          <q-item v-close-popup clickable @click.native="openSettings">
            <q-item-label header>{{ $t("menuItems.settings") }}</q-item-label>
          </q-item>
          <q-item v-close-popup clickable @click.native="showAbout(true)">
            <q-item-label header>{{ $t("menuItems.about") }}</q-item-label>
          </q-item>
          <q-item v-close-popup clickable @click.native="exit">
            <q-item-label header>{{ $t("menuItems.exit") }}</q-item-label>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <SettingsModal ref="settingsModal" />
    <q-dialog ref="aboutModal" minimized>
      <div class="about-modal">
        <img
          :src="aboutBanner"
          style="width: 100%; max-width: 400px;"
          class="q-mb-md"
        />
        <p class="q-my-sm">Wallet Version: v{{ version }}</p>
        <p class="q-my-sm">Daemon Version: v{{ daemonVersion }}</p>
        <p class="q-my-sm">Copyright (c) 2024-2026, Judecoin Community</p>
        <p class="q-my-sm">All rights reserved.</p>
        <q-btn
          class="q-mt-md"
          color="primary"
          label="Close"
          @click="showAbout(false)"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { version } from "../../../package.json";
import { formatDaemonProtocolVersion } from "src/daemon-version";
import { mapState } from "vuex";
import SettingsModal from "components/settings";
export default {
  name: "MainMenu",
  components: {
    SettingsModal
  },
  props: {
    disableSwitchWallet: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      version: ""
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    aboutBanner() {
      return this.theme === "light"
        ? "jude-assets/brand/03-about-banner-light.png"
        : "jude-assets/brand/03-about-banner-dark.png";
    },
    isRPCSyncing: state => state.gateway.wallet.isRPCSyncing,
    daemon: state => state.gateway.daemon,
    daemonVersion() {
      return formatDaemonProtocolVersion(this.daemon.info.version);
    }
  }),
  mounted() {
    this.version = version;
  },
  methods: {
    showAbout(toggle) {
      if (toggle) this.$refs.aboutModal.show();
      else this.$refs.aboutModal.hide();
    },
    openSettings() {
      this.$refs.settingsModal.isVisible = true;
    },
    switchWallet() {
      // If the rpc is syncing then we want to tell the user to restart
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
    },
    exit() {
      this.$gateway.confirmClose(this.$t("dialog.exit.message"));
    }
  }
};
</script>

<style lang="scss">
.about-modal {
  padding: 25px;
  background-color: var(--jude-bg-alt);
  color: var(--jude-text);

  .external-links {
    a {
      color: var(--jude-accent2);
      text-decoration: none;

      &:hover,
      &:active,
      &:visited {
        text-decoration: underline;
      }
    }
  }
}
</style>
