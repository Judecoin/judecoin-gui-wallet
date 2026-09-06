<template>
  <div class="sidebar-status" :class="[status]">
    <div class="sync-block">
      <div class="sync-label">
        {{
          wallet_synced
            ? $t("nav.walletSynced")
            : $t("nav.walletSyncing", { pct: wallet_pct })
        }}
      </div>
      <div class="sync-bar">
        <div class="fill" :style="{ width: wallet_pct + '%' }"></div>
      </div>
    </div>

    <div class="sync-block">
      <div class="sync-label">
        {{
          daemon_synced
            ? $t("nav.daemonSynced", { height: daemon_height })
            : $t("nav.daemonSyncing", { pct: daemon_pct })
        }}
      </div>
      <div class="sync-bar">
        <div class="fill" :style="{ width: daemon_pct + '%' }"></div>
      </div>
    </div>

    <div class="network-status row items-center no-wrap">
      <q-icon name="flash_on" size="22px" class="bolt" />
      <div class="column">
        <span class="caption">{{ $t("nav.networkStatus") }}</span>
        <span class="value">
          {{
            config_daemon.type === "remote"
              ? $t("nav.remoteNode")
              : $t("nav.localNode")
          }}
          <template v-if="status !== 'ready'">
            — {{ $t(`footer.${status}`) }}
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SidebarStatus",
  computed: mapState({
    config: state => state.gateway.app.config,
    daemon: state => state.gateway.daemon,
    wallet: state => state.gateway.wallet,
    update_required: state => state.gateway.update_required,

    config_daemon() {
      return this.config.daemons[this.config.app.net_type];
    },
    target_height() {
      if (this.config_daemon.type === "local")
        return Math.max(
          this.daemon.info.height,
          this.daemon.info.target_height
        );
      else return this.daemon.info.height;
    },
    daemon_height() {
      return this.daemon.info.height;
    },
    daemon_pct() {
      if (this.config_daemon.type === "remote") {
        return this.daemon.info.height > 0 ? 100 : 0;
      }
      let pct = (
        (100 * this.daemon.info.height_without_bootstrap) /
        this.target_height
      ).toFixed(1);
      if (
        pct == 100.0 &&
        this.daemon.info.height_without_bootstrap < this.target_height
      )
        return 99.9;
      else return pct;
    },
    daemon_synced() {
      return this.daemon_pct >= 100;
    },
    wallet_pct() {
      if (!this.target_height) return 0;
      let pct = ((100 * this.wallet.info.height) / this.target_height).toFixed(
        1
      );
      if (pct == 100.0 && this.wallet.info.height < this.target_height)
        return 99.9;
      else return pct;
    },
    wallet_synced() {
      return this.wallet_pct >= 100;
    },
    status() {
      const daemonType = this.config_daemon.type;
      const isSyncing =
        this.daemon.info.height_without_bootstrap < this.target_height;
      const isScanning =
        this.wallet.info.height < this.target_height - 1 &&
        this.wallet.info.height != 0;

      if (this.update_required) {
        return "updateRequired";
      }

      if (daemonType === "local") {
        if (isSyncing) {
          return "syncing";
        } else if (isScanning) {
          return "scanning";
        } else {
          return "ready";
        }
      } else {
        if (isScanning) {
          return "scanning";
        } else if (daemonType === "local_remote" && isSyncing) {
          return "syncing";
        } else {
          return "ready";
        }
      }
    }
  })
};
</script>

<style lang="scss">
.sidebar-status {
  padding: 12px 16px 16px;

  .sync-block {
    margin-bottom: 10px;

    .sync-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--jude-text);
      margin-bottom: 5px;
    }

    .sync-bar {
      height: 4px;
      border-radius: 2px;
      background: var(--jude-border-light);
      overflow: hidden;

      .fill {
        height: 100%;
        border-radius: 2px;
        background: var(--jude-accent);
        -webkit-transition: width 0.5s ease-out;
        transition: width 0.5s ease-out;
      }
    }
  }

  .network-status {
    margin-top: 14px;

    .bolt {
      color: var(--jude-accent);
      margin-right: 8px;
    }

    .caption {
      font-size: 11px;
      color: var(--jude-text-dim);
    }

    .value {
      font-size: 15px;
      font-weight: 600;
      color: var(--jude-text);
    }
  }
}
</style>
