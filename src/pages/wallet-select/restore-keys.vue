<template>
  <q-page>
    <div class="q-mx-md">
      <JudecoinField
        class="q-mt-md"
        :label="$t('fieldLabels.walletName')"
        :error="$v.wallet.name.$error"
      >
        <q-input
          v-model="wallet.name"
          borderless
          dense
          @keyup.enter="restore"
          @blur="$v.wallet.name.$touch"
        />
      </JudecoinField>

      <JudecoinField
        class="q-mt-md"
        :label="$t('fieldLabels.walletAddress')"
        :error="$v.wallet.address.$error"
      >
        <q-input
          v-model="wallet.address"
          :placeholder="$t('placeholders.publicWalletAddress')"
          borderless
          dense
          @blur="$v.wallet.address.$touch"
        />
      </JudecoinField>

      <JudecoinField
        class="q-mt-md"
        :label="$t('fieldLabels.privateViewKey')"
        :error="$v.wallet.viewkey.$error"
      >
        <q-input
          v-model="wallet.viewkey"
          :placeholder="$t('placeholders.hexCharacters', { count: 64 })"
          borderless
          dense
          @blur="$v.wallet.viewkey.$touch"
        />
      </JudecoinField>

      <JudecoinField
        class="q-mt-md"
        :label="$t('fieldLabels.privateSpendKey')"
        :error="$v.wallet.spendkey.$error"
      >
        <q-input
          v-model="wallet.spendkey"
          :placeholder="$t('placeholders.hexCharacters', { count: 64 })"
          borderless
          dense
          @blur="$v.wallet.spendkey.$touch"
        />
      </JudecoinField>

      <div class="row items-end q-mt-md">
        <div class="col-md-9 col-sm-8">
          <JudecoinField
            v-if="wallet.refresh_type == 'date'"
            :label="$t('fieldLabels.restoreFromDate')"
          >
            <q-input
              v-model="wallet.refresh_start_date"
              mask="date"
              borderless
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="wallet.refresh_start_date"
                      :options="dateRangeOptions"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </JudecoinField>
          <JudecoinField
            v-else-if="wallet.refresh_type == 'height'"
            :label="$t('fieldLabels.restoreFromBlockHeight')"
            :error="$v.wallet.refresh_start_height.$error"
          >
            <q-input
              v-model="wallet.refresh_start_height"
              type="number"
              min="0"
              :dark="theme == 'dark'"
              borderless
              dense
              @blur="$v.wallet.refresh_start_height.$touch"
            />
          </JudecoinField>
        </div>
        <div class="col-sm-4 col-md-3">
          <template v-if="wallet.refresh_type == 'date'">
            <q-btn
              class="restore-from-button"
              flat
              @click="wallet.refresh_type = 'height'"
            >
              <div class="column justify-center items-center">
                <q-icon name="clear_all" />
                {{ $t("strings.switchToHeightSelect") }}
              </div>
            </q-btn>
          </template>
          <template v-else-if="wallet.refresh_type == 'height'">
            <q-btn
              class="restore-from-button"
              flat
              @click="wallet.refresh_type = 'date'"
            >
              <div class="column justify-center items-center">
                <q-icon name="today" />
                {{ $t("strings.switchToDateSelect") }}
              </div>
            </q-btn>
          </template>
        </div>
      </div>

      <JudecoinField class="q-mt-md" :label="$t('fieldLabels.password')">
        <q-input
          v-model="wallet.password"
          :placeholder="$t('placeholders.walletPassword')"
          type="password"
          :dark="theme == 'dark'"
          borderless
          dense
          @keyup.enter="restore"
        />
      </JudecoinField>

      <JudecoinField class="q-mt-md" :label="$t('fieldLabels.confirmPassword')">
        <q-input
          v-model="wallet.password_confirm"
          type="password"
          :dark="theme == 'dark'"
          borderless
          dense
          @keyup.enter="restore"
        />
      </JudecoinField>
      <q-btn
        class="submit-button"
        color="primary"
        :label="$t('buttons.restoreWallet')"
        @click="restore"
      />
    </div>
  </q-page>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import { privkey, address } from "src/validators/common";
import { mapState } from "vuex";
import JudecoinField from "components/judecoin_field";
import { date } from "quasar";
import _ from "lodash";

const timeStampFirstBlock = 1525305600000;
const qDateFormat = "YYYY/MM/DD";
let dateFirstBlock = date.formatDate(timeStampFirstBlock, qDateFormat);

export default {
  components: {
    JudecoinField
  },
  data() {
    return {
      wallet: {
        name: "",
        address: "",
        viewkey: "",
        spendkey: "",
        refresh_type: "date",
        refresh_start_height: 0,
        refresh_start_date: dateFirstBlock,
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
      address: {
        required,
        isAddress(value) {
          if (value === "") return true;
          return new Promise(resolve => {
            address(value, this.$gateway)
              .then(() => resolve(true))
              .catch(() => resolve(false));
          });
        }
      },
      viewkey: { required, privkey },
      spendkey: { required, privkey },
      refresh_start_height: { numeric }
    }
  },
  methods: {
    restore() {
      this.$v.wallet.$touch();

      if (this.$v.wallet.name.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.enterWalletName")
        });
        return;
      }
      if (this.$v.wallet.address.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidPublicAddress")
        });
        return;
      }
      if (this.$v.wallet.viewkey.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidPrivateViewKey")
        });
        return;
      }
      if (this.$v.wallet.spendkey.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidPrivateSpendKey")
        });
        return;
      }
      if (this.$v.wallet.refresh_start_height.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidRestoreHeight")
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

      const wallet_data = _.cloneDeep(this.wallet);
      const dateSeconds = date
        .extractDate(this.wallet.refresh_start_date, "YYYY/MM/DD")
        .getTime();
      wallet_data["refresh_start_date"] = dateSeconds;

      this.$gateway.send("wallet", "restore_wallet_from_keys", wallet_data);
    },
    dateRangeOptions(dateSelected) {
      const now = Date.now();
      const formattedNow = date.formatDate(now, qDateFormat);
      return dateSelected >= dateFirstBlock && dateSelected < formattedNow;
    },
    cancel() {
      this.$router.replace({ path: "/wallet-select" });
    }
  }
};
</script>

<style>
.restore-from-button {
  width: 100%;
  height: 54px;
}
</style>
