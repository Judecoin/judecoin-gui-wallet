<template>
  <q-page>
    <div class="init-screen-page text-center">
      <div class="absolute-center">
        <video
          :src="splashVideo"
          class="startup-splash-logo"
          autoplay
          loop
          muted
        />

        <div class="startup-icons">
          <div ref="backend">
            <img
              src="jude-assets/startup-stages/11-startup-backend.png"
              style="width: 52px; height: 52px;"
            />
          </div>
          <div ref="settings">
            <img
              src="jude-assets/startup-stages/12-startup-settings.png"
              style="width: 52px; height: 52px;"
            />
          </div>
          <div ref="daemon">
            <img
              src="jude-assets/startup-stages/13-startup-daemon-sync.png"
              style="width: 52px; height: 52px;"
            />
          </div>
          <div ref="wallet">
            <img
              src="jude-assets/startup-stages/14-startup-wallet-ready.png"
              style="width: 52px; height: 52px;"
            />
          </div>
        </div>

        <div class="message">
          {{ message }}
        </div>

        <div v-if="version" class="startup-version">
          {{ version }}
        </div>

        <div v-if="daemonStatus" class="q-mt-xs">
          {{ $t("strings.syncingDaemon") }}: {{ daemonStatus }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      version: ""
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    splashVideo() {
      return this.theme === "light"
        ? "jude-assets/brand/splash-loop-light-v12-alpha.webm"
        : "jude-assets/brand/splash-loop-v12-alpha.webm";
    },
    status: state => state.gateway.app.status,
    config: state => state.gateway.app.config,
    isLocalDaemon() {
      if (!this.config || !this.config.app.net_type) return false;
      return this.config.daemons[this.config.app.net_type].type === "local";
    },
    daemon: state => state.gateway.daemon,
    daemonStatus() {
      // Check to see if config is loaded
      if (this.status.code < 3 || !this.isLocalDaemon) return null;

      const currentHeight = this.daemon.info.height_without_bootstrap;
      const targetHeight = Math.max(
        this.daemon.info.height,
        this.daemon.info.target_height
      );
      const percentage = ((100 * currentHeight) / targetHeight).toFixed(1);

      if (targetHeight === 0 || currentHeight >= targetHeight) return null;

      return `${currentHeight}/${targetHeight} (${percentage}%)`;
    }
  }),
  watch: {
    status: {
      handler() {
        this.updateStatus();
      },
      deep: true
    }
  },
  mounted() {
    this.updateStatus();
  },
  methods: {
    updateStatus() {
      switch (this.status.code) {
        case -1: // config not found, go to welcome screen
          this.$router.replace({ path: "welcome" });
          break;
        case 0: // start-up complete, go to wallet-select
          this.$router.replace({ path: "wallet-select" });
          break;
        case 1:
          this.message = this.$t("strings.connectingToBackend");
          this.$refs.backend.className = "pulse";
          this.$refs.settings.className = "grey";
          this.$refs.daemon.className = "grey";
          this.$refs.wallet.className = "grey";
          break;
        case 2:
          this.message = this.$t("strings.loadingSettings");
          this.$refs.backend.className = "solid";
          this.$refs.settings.className = "pulse";
          this.$refs.daemon.className = "grey";
          this.$refs.wallet.className = "grey";
          break;
        case 3:
          this.message = this.$t("strings.startingDaemon");
          this.$refs.backend.className = "solid";
          this.$refs.settings.className = "solid";
          this.$refs.daemon.className = "pulse";
          this.$refs.wallet.className = "grey";
          break;
        case 4:
          this.version = "Jude Wallet GUI (v4.0.1-release)";
          break;
        case 5:
          this.$q.notify({
            type: "warning",
            timeout: 2000,
            message:
              "Warning: " + this.$t("notification.warnings.usingRemoteNode")
          });
          break;
        case 6:
          this.message = this.$t("strings.startingWallet");
          this.$refs.backend.className = "solid";
          this.$refs.settings.className = "solid";
          this.$refs.daemon.className = "solid";
          this.$refs.wallet.className = "pulse";
          break;
        case 7:
          this.message = this.$t("strings.readingWalletList");
          this.$refs.backend.className = "solid";
          this.$refs.settings.className = "solid";
          this.$refs.daemon.className = "solid";
          this.$refs.wallet.className = "solid";
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.message {
  color: var(--jude-text);
  font-size: 23px;
  font-weight: 700;
}
.init-screen-page {
  height: 100vh;
  position: relative;
  background: #0c1117;
}
body.light .init-screen-page {
  background: #dce1e5;
}
.absolute-center {
  width: 100%;
  max-width: 760px;
}
.startup-splash-logo {
  display: block;
  width: min(520px, 72vw);
  margin: 0 auto -44px;
  object-fit: contain;
}
.startup-version {
  margin-top: 12px;
  color: var(--jude-text);
  font-size: 18px;
  font-weight: 600;
}
.startup-icons {
  margin-bottom: 20px;

  & > div {
    display: inline-block;
    margin: 0 15px;
  }
  .grey {
    opacity: 0.25;
  }
  .solid {
    opacity: 1;
  }
  .pulse {
    opacity: 0.6;
    animation: fade 2s infinite;
  }
}

@keyframes fade {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
