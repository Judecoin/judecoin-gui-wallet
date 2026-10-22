<template>
  <q-page>
    <div class="q-mx-md import-wallet">
      <WalletField
        :label="$t('fieldLabels.newWalletName')"
        :error="$v.wallet.name.$error"
      >
        <q-input
          v-model="wallet.name"
          @input="$v.wallet.name.$reset()"
          :dark="theme == 'dark'"
          borderless
          dense
          @keyup.enter="import_wallet"
        />
      </WalletField>

      <WalletField
        :label="$t('fieldLabels.walletFile')"
        disable-hover
        :error="$v.wallet.path.$error"
      >
        <q-input
          v-model="wallet.path"
          :placeholder="$t('placeholders.selectAFile')"
          disable
          :dark="theme == 'dark'"
          borderless
          dense
        />
        <q-btn
          color="primary"
          :label="$t('buttons.selectWalletFile')"
          @click="selectFile"
        />
      </WalletField>

      <WalletField :label="$t('fieldLabels.password')">
        <q-input
          v-model="wallet.password"
          :placeholder="$t('placeholders.walletPassword')"
          type="password"
          :dark="theme == 'dark'"
          borderless
          dense
          @keyup.enter="import_wallet"
        />
      </WalletField>

      <WalletField :label="$t('fieldLabels.confirmPassword')">
        <q-input
          v-model="wallet.password_confirm"
          type="password"
          :dark="theme == 'dark'"
          borderless
          dense
          @keyup.enter="import_wallet"
        />
      </WalletField>
      <q-btn
        class="submit-button"
        color="primary"
        :label="$tc('buttons.importWallet', 1)"
        @click="import_wallet"
      />
    </div>
  </q-page>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import WalletField from "components/wallet_field";
import { walletDialog } from "src/electron-api";
export default {
  components: {
    WalletField
  },
  data() {
    return {
      wallet: {
        name: "",
        path: "",
        password: "",
        password_confirm: ""
      }
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    status: state => state.gateway.wallet.status
  }),
  watch: {
    status: {
      handler(val, old) {
        if (val.code == old.code) return;
        const { code, message } = val;
        switch (code) {
          case 1:
            break;
          case 0:
            this.$q.loading.hide();
            this.$router.replace({
              path: "/wallet-select/created"
            });
            break;
          default:
            this.$q.loading.hide();
            this.$q.notify({
              type: "negative",
              timeout: 1000,
              message
            });
            break;
        }
      },
      deep: true
    }
  },
  validations: {
    wallet: {
      name: { required },
      path: { required }
    }
  },
  methods: {
    async selectFile() {
      const selected = await walletDialog.selectFile();
      if (selected) {
        this.wallet.path = selected;
        this.$v.wallet.path.$reset();
      }
    },
    import_wallet() {
      this.$v.wallet.$touch();

      if (this.$v.wallet.name.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.enterWalletName")
        });
        return;
      }

      if (this.$v.wallet.path.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.selectWalletFile")
        });
        return;
      }

      if (this.wallet.password != this.wallet.password_confirm) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.passwordNoMatch")
        });
        return;
      }

      this.$q.loading.show({
        delay: 0
      });

      this.$gateway.send("wallet", "import_wallet", this.wallet);
    },
    cancel() {
      this.$router.replace({ path: "/wallet-select" });
    }
  }
};
</script>

<style lang="scss">
.import-wallet {
  .q-if-disabled {
    cursor: default !important;
    .q-input-target {
      cursor: default !important;
    }
  }

  .wallet-field {
    margin-top: 16px;
  }
}
</style>
