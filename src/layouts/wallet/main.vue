<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="titlebar-only">
      <TitleBar wallet-actions :title="info.name" />
    </q-header>

    <q-drawer
      :value="true"
      side="left"
      :width="drawerWidth"
      :breakpoint="0"
      behavior="desktop"
      content-class="monero-sidebar"
    >
      <div class="sidebar column no-wrap">
        <WalletDetails />

        <div class="side-nav col">
          <router-link to="/wallet/send" class="nav-item">
            <span class="label">{{ $t("nav.send") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <router-link to="/wallet/addressbook" class="nav-item sub-item">
            <span class="label">{{ $t("nav.addressBook") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <router-link to="/wallet/receive" class="nav-item">
            <span class="label">{{ $t("nav.receive") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <router-link to="/wallet" exact class="nav-item">
            <span class="label">{{ $t("nav.transactions") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <router-link to="/wallet/servicenode" class="nav-item">
            <span class="label">{{ $t("nav.staking") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <router-link to="/wallet/advanced" class="nav-item">
            <span class="label">{{ $t("nav.advanced") }}</span>
            <q-icon name="chevron_right" />
          </router-link>
          <a class="nav-item" @click="openSettings('general')">
            <span class="label">{{ $t("nav.settings") }}</span>
            <q-icon name="chevron_right" />
          </a>
        </div>

        <SidebarStatus />
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <SettingsModal ref="settingsModal" wallet-ops />
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import TitleBar from "components/titlebar";
import WalletDetails from "components/wallet_details";
import SidebarStatus from "components/sidebar_status";
import SettingsModal from "components/settings";
export default {
  name: "LayoutDefault",
  components: {
    TitleBar,
    WalletDetails,
    SidebarStatus,
    SettingsModal
  },
  data() {
    return {
      viewportWidth: window.innerWidth
    };
  },
  computed: {
    ...mapState({
      theme: state => state.gateway.app.config.appearance.theme,
      info: state => state.gateway.wallet.info
    }),
    drawerWidth() {
      return Math.min(
        520,
        Math.max(340, Math.round(this.viewportWidth * 0.34))
      );
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateViewportWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewportWidth);
  },
  methods: {
    updateViewportWidth() {
      this.viewportWidth = window.innerWidth;
    },
    openSettings(page) {
      this.$refs.settingsModal.page = page;
      this.$refs.settingsModal.isVisible = true;
    }
  }
};
</script>

<style lang="scss">
.monero-sidebar {
  background: var(--jude-bg-header) !important;
  border-right: 1px solid var(--jude-border);

  .sidebar {
    height: 100%;
  }

  .side-nav {
    overflow-y: auto;
    padding-top: clamp(2px, 0.5vh, 6px);

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 48px;
      padding: clamp(11px, 1.5vh, 16px) clamp(16px, 1.6vw, 22px);
      color: var(--jude-text);
      text-decoration: none;
      cursor: pointer;
      font-size: clamp(18px, 1.05vw, 20px);
      font-weight: 600;
      border-left: 3px solid transparent;
      border-bottom: 1px solid var(--jude-border-light);
      -webkit-user-select: none;
      user-select: none;

      .q-icon {
        color: var(--jude-text-muted);
      }

      &:hover {
        background: var(--jude-bg-hover);
      }

      &.router-link-active {
        border-left-color: var(--jude-accent);
        background: var(--jude-bg-hover);

        .q-icon {
          color: var(--jude-text);
        }
      }

      &.sub-item {
        padding-left: clamp(30px, 3vw, 44px);
        font-weight: 500;
        font-size: clamp(16px, 0.95vw, 18px);
      }
    }
  }

  @media (max-width: 1200px) {
    .side-nav .nav-item {
      font-size: 16px;

      &.sub-item {
        font-size: 15px;
      }
    }
  }
}
</style>
