<template>
  <q-dialog v-model="isVisible" maximized class="settings-modal">
    <q-layout>
      <q-header>
        <q-toolbar color="dark" inverted>
          <q-btn flat round dense icon="reply" @click="isVisible = false" />
          <q-toolbar-title shrink>{{
            $t("titles.settings.title")
          }}</q-toolbar-title>

          <div class="row col justify-center q-pr-xl">
            <q-btn-toggle
              v-model="page"
              toggle-color="primary"
              color="accent"
              size="md"
              :options="tabs"
            />
          </div>

          <q-btn color="primary" :label="$t('buttons.save')" @click="save" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div v-if="page == 'general'">
          <div class="q-pa-lg">
            <SettingsGeneral ref="settingsGeneral" :randomise-remote="false" />
          </div>
        </div>

        <div v-if="page == 'peers'">
          <q-list no-border>
            <q-item-label header>{{ $t("strings.peerList") }}</q-item-label>
            <q-item
              v-for="entry in daemon.connections"
              :key="entry.address"
              clickable
              @click.native="showPeerDetails(entry)"
            >
              <q-item-label>
                <q-item-label>{{ entry.address }}</q-item-label>
                <q-item-label
                  >{{ $t("strings.blockHeight") }}:
                  {{ entry.height }}</q-item-label
                >
              </q-item-label>
            </q-item>

            <template v-if="daemon.bans.length">
              <q-item-label header>{{
                $t("strings.bannedPeers.title")
              }}</q-item-label>
              <q-item v-for="entry in daemon.bans" :key="entry.host">
                <q-item-section>
                  <q-item-label header>{{ entry.host }}</q-item-label>
                  <q-item-label caption>
                    {{
                      $t("strings.bannedPeers.bannedUntil", {
                        time: new Date(
                          Date.now() + entry.seconds * 1000
                        ).toLocaleString()
                      })
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>

        <div v-if="page === 'wallet'" class="q-pa-lg">
          <WalletOps v-if="isVisible" />
        </div>

        <div v-if="page === 'about'" class="about-tab column items-center">
          <img
            :src="aboutBanner"
            style="width: 100%; max-width: 620px;"
            class="q-mb-lg"
          />
          <p class="q-my-sm">Wallet Version: v{{ version }}</p>
          <p class="q-my-sm">Daemon Version: v{{ daemonVersion }}</p>
          <p class="q-my-sm">Copyright (c) 2024-2026, Judecoin Community</p>
          <p class="q-my-sm">All rights reserved.</p>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { mapState } from "vuex";
import { version } from "../../package.json";
import { formatDaemonProtocolVersion } from "src/daemon-version";
import SettingsGeneral from "components/settings_general";
import WalletOps from "components/menus/wallet_settings";

export default {
  name: "SettingsModal",
  components: {
    SettingsGeneral,
    WalletOps
  },
  props: {
    walletOps: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      page: "general",
      isVisible: false,
      version
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    aboutBanner() {
      return this.theme === "light"
        ? "jude-assets/brand/03-about-banner-light.png"
        : "jude-assets/brand/03-about-banner-dark.png";
    },
    daemon: state => state.gateway.daemon,
    pending_config: state => state.gateway.app.pending_config,
    config: state => state.gateway.app.config,
    tabs: function(state) {
      const { app, daemons } = state.gateway.app.config;
      let tabs = [
        {
          label: this.$t("titles.settings.tabs.general"),
          value: "general",
          icon: "settings"
        }
      ];
      if (this.walletOps) {
        tabs.push({
          label: this.$t("titles.settings.tabs.wallet"),
          value: "wallet",
          icon: "account_balance_wallet"
        });
      }
      if (daemons[app.net_type].type != "remote") {
        tabs.push({
          label: this.$t("titles.settings.tabs.peers"),
          value: "peers",
          icon: "cloud_queue"
        });
      }
      tabs.push({
        label: this.$t("menuItems.about"),
        value: "about",
        icon: "info_outline"
      });
      return tabs;
    },
    daemonVersion(state) {
      return formatDaemonProtocolVersion(state.gateway.daemon.info.version);
    }
  }),
  watch: {
    isVisible: function() {
      if (this.isVisible == false) {
        this.$store.dispatch("gateway/resetPendingConfig");
      }
    }
  },
  methods: {
    save() {
      this.$gateway.send("core", "save_config", this.pending_config);
      this.isVisible = false;
    },
    showPeerDetails(entry) {
      this.$q
        .dialog({
          title: this.$t("dialog.banPeer.peerDetailsTitle"),
          message: JSON.stringify(entry, null, 2),
          ok: {
            label: this.$t("dialog.banPeer.ok"),
            color: "negative"
          },
          cancel: {
            flat: true,
            label: "Close",
            color: this.theme == "dark" ? "white" : "dark"
          },
          dark: this.theme === "dark"
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: this.$t("dialog.banPeer.title"),
              message: this.$t("dialog.banPeer.message"),
              prompt: {
                model: "",
                type: "number"
              },
              ok: {
                label: this.$t("dialog.banPeer.ok"),
                color: "negative"
              },
              cancel: {
                flat: true,
                label: this.$t("dialog.buttons.cancel"),
                color: this.theme == "dark" ? "white" : "dark"
              },
              dark: this.theme === "dark",
              color: this.theme === "dark" ? "white" : "dark"
            })
            .onOk(seconds => {
              this.$gateway.send("daemon", "ban_peer", {
                host: entry.host,
                seconds
              });
            })
            .onCancel(() => {})
            .onDismiss(() => null);
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    }
  }
};
</script>

<style lang="scss">
.settings-modal {
  .about-tab {
    padding: 40px 25px;
    color: var(--jude-text);

    a,
    a:visited {
      color: var(--jude-accent2);
      text-decoration: none;
    }

    a:hover,
    a:active {
      text-decoration: underline;
    }
  }
}
</style>
