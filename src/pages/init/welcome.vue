<template>
  <q-page class="welcome">
    <q-stepper
      ref="stepper"
      v-model="step"
      class="welcome-stepper"
      flat
      :dark="theme == 'dark'"
    >
      <q-step
        :name="1"
        :title="$t('titles.welcome')"
        :done="step > 1"
        class="first-step"
      >
        <div class="welcome-container">
          <video
            :src="splashVideo"
            style="width: 300px;"
            class="q-mb-md splash-logo"
            autoplay
            loop
            muted
          />
          <div>Wallet Version: v{{ version }}</div>
          <div>Daemon Version: {{ daemonVersion }}</div>
          <LanguageSelect class="q-mt-lg" @select="onLanguageSelected" />
        </div>
      </q-step>

      <q-step :name="2" :title="$t('titles.configure')">
        <SettingsGeneral ref="settingsGeneral" :randomise-remote="true" />
      </q-step>
    </q-stepper>

    <q-footer v-if="!(step === 1)" class="no-shadow q-pa-sm">
      <div class="row justify-end">
        <div>
          <q-btn flat :label="$t('buttons.back')" @click="clickPrev()" />
        </div>
        <div>
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('buttons.next')"
            @click="clickNext()"
          />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import { version } from "../../../package.json";
import { formatDaemonProtocolVersion } from "src/daemon-version";
import { mapState } from "vuex";
import LanguageSelect from "components/language_select";
import SettingsGeneral from "components/settings_general";

export default {
  components: {
    LanguageSelect,
    SettingsGeneral
  },
  data() {
    return {
      step: 1,
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
    pending_config: state => state.gateway.app.pending_config,
    config_daemon() {
      return this.pending_config.daemons[this.pending_config.app.net_type];
    },
    daemon: state => state.gateway.daemon,

    daemonVersion() {
      const daemonVersion = formatDaemonProtocolVersion(
        this.daemon.info.version
      );
      return daemonVersion === "N/A" ? daemonVersion : "v" + daemonVersion;
    }
  }),
  mounted() {
    this.version = version;

    // set add status back to 2
    this.$store.commit("gateway/set_app_data", {
      status: {
        code: 2 // Loading config
      }
    });
  },
  methods: {
    clickNext() {
      // if the last step i s active, then we want to initialise the config
      if (this.step === 2) {
        this.$gateway.send("core", "save_config_init", this.pending_config);
        this.$router.replace({ path: "/" });
      } else {
        this.$refs.stepper.next();
      }
    },
    clickPrev() {
      this.$refs.stepper.previous();
    },
    onLanguageSelected() {
      this.clickNext();
    }
  }
};
</script>

<style lang="scss">
.welcome {
  /* min- so the page grows with content and the layout's footer padding
     applies; a fixed 100vh made overflowing content slide under the footer */
  min-height: 100vh;

  .welcome-stepper {
    height: 100%;
    background: transparent;
  }

  .welcome-container {
    padding-top: 14vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .first-step .q-stepper-step-inner {
    min-height: 250px;
    height: calc(100vh - 102px);
  }
}

.language-item {
  padding: 10px 30px 10px 20px;
  border: 1px solid var(--jude-border);
  cursor: pointer;

  .language-item-circle {
    background: var(--jude-accent);
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    color: white;
    margin-right: 10px;
  }
}

.q-stepper-header {
  min-height: 10vh;
}
</style>
