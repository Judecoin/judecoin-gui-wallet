<template>
  <q-item @click.native="openWallet(wallet)">
    <q-item-section avatar>
      <img
        src="jude-assets/wallet-actions/15-create-new-wallet.png"
        style="width:48px;height:48px;"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="wallet-name" caption>{{ wallet.name }}</q-item-label>
      <q-item-label class="monospace ellipsis" caption>{{
        wallet.address
      }}</q-item-label>
    </q-item-section>
    <ContextMenu
      :menu-items="menuItems"
      @openWallet="openWallet(wallet)"
      @copyAddress="copyAddress(wallet.address)"
    />
  </q-item>
</template>

<script>
const { clipboard } = require("electron");
import { mapState } from "vuex";
export default {
  name: "WalletListItem",
  props: {
    wallet: {
      type: Object,
      required: true
    },
    openWallet: {
      type: Function,
      required: true
    }
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    info: state => state.gateway.wallet.info
  }),
  methods: {
    copyAddress() {
      event.stopPropagation();
      for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].tagName == "BUTTON") {
          event.path[i].blur();
          break;
        }
      }
      clipboard.writeText(this.wallet.address);
      this.$q.notify({
        type: "positive",
        timeout: 1000,
        message: this.$t("notification.positive.addressCopied")
      });
    }
  }
};
</script>

<style lang="scss"></style>
