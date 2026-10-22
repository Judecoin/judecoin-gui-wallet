<template>
  <q-page class="send">
    <template v-if="view_only">
      <div class="q-pa-md">
        {{ $t("strings.viewOnlyMode") }}
      </div>
    </template>
    <template v-else>
      <div class="q-pa-lg send-form">
        <!-- Recipients: address on top, amount + priority below (Monero layout) -->
        <div
          v-for="(recipient, index) in newTx.recipients"
          :key="index"
          class="recipient-group"
        >
          <div
            v-if="newTx.recipients.length > 1"
            class="row items-center q-mb-xs"
          >
            <span class="text-weight-medium">
              {{ $t("strings.recipientN", { index: index + 1 }) }}
            </span>
            <q-btn
              flat
              dense
              icon="close"
              size="sm"
              color="negative"
              class="q-ml-sm"
              @click="removeRecipient(index)"
            />
          </div>

          <WalletField
            :label="$t('fieldLabels.address')"
            :error="
              validationAttempted &&
                $v.newTx.recipients.$each[index] &&
                $v.newTx.recipients.$each[index].address.$error
            "
          >
            <q-input
              v-model.trim="recipient.address"
              :placeholder="address_placeholder"
              borderless
              dense
              @input="clearRecipientValidation"
            />
            <q-btn
              v-if="index === 0"
              flat
              dense
              icon="contacts"
              class="field-icon-btn"
              to="addressbook"
            />
          </WalletField>

          <div class="row q-mt-sm">
            <div class="col-7 amount">
              <WalletField
                :label="$t('fieldLabels.amount')"
                :error="
                  validationAttempted &&
                    $v.newTx.recipients.$each[index] &&
                    $v.newTx.recipients.$each[index].amount.$error
                "
              >
                <img class="coin-icon" src="jude-logo.png" />
                <q-input
                  v-model="recipient.amount"
                  type="number"
                  min="0"
                  :max="unlocked_balance / 1e9"
                  placeholder="0.00"
                  borderless
                  dense
                  @input="clearRecipientValidation"
                />
                <q-btn
                  v-if="newTx.recipients.length === 1"
                  dense
                  class="all-btn"
                  @click="setAllAmount(recipient)"
                >
                  {{ $t("buttons.all") }}
                </q-btn>
              </WalletField>
            </div>
            <div v-if="index === 0" class="col-5 priority">
              <WalletField :label="$t('fieldLabels.priority')">
                <q-select
                  v-model="newTx.priority"
                  emit-value
                  map-options
                  :options="priorityOptions"
                  borderless
                  dense
                />
              </WalletField>
            </div>
          </div>
        </div>

        <!-- "+" rows, Monero style -->
        <div class="q-mt-md add-rows">
          <q-btn
            flat
            dense
            no-caps
            icon="add_circle_outline"
            :label="$t('nav.addRecipient')"
            @click="addRecipient"
          />
          <q-btn
            v-if="!showDescription"
            flat
            dense
            no-caps
            icon="add_circle_outline"
            :label="$t('nav.addDescription')"
            @click="showDescription = true"
          />
        </div>

        <!-- Description / notes -->
        <div v-if="showDescription" class="col q-mt-sm">
          <WalletField :label="$t('fieldLabels.notes')" optional>
            <q-input
              v-model="newTx.note"
              class="full-width text-area-wallet"
              type="textarea"
              :placeholder="$t('placeholders.transactionNotes')"
              borderless
              dense
            />
          </WalletField>
        </div>

        <!-- Send -->
        <div class="q-mt-md">
          <q-btn
            class="send-btn"
            no-caps
            :disable="!is_able_to_send"
            color="primary"
            icon-right="arrow_forward"
            :label="$t('nav.send')"
            @click="send()"
          />
        </div>

        <!-- Advanced options: save to address book -->
        <q-expansion-item
          class="advanced-options q-mt-md"
          :label="$t('strings.advancedOptions')"
          dense
        >
          <q-checkbox
            v-model="newTx.address_book.save"
            :label="$t('strings.saveToAddressBook')"
          />
          <div v-if="newTx.address_book.save">
            <WalletField :label="$t('fieldLabels.name')" optional>
              <q-input
                v-model="newTx.address_book.name"
                :placeholder="$t('placeholders.addressBookName')"
                borderless
                dense
              />
            </WalletField>
            <WalletField
              class="q-mt-sm"
              :label="$t('fieldLabels.notes')"
              optional
            >
              <q-input
                v-model="newTx.address_book.description"
                type="textarea"
                class="full-width text-area-wallet"
                rows="2"
                :placeholder="$t('placeholders.additionalNotes')"
                borderless
                dense
              />
            </WalletField>
          </div>
        </q-expansion-item>
      </div>
      <ConfirmTransactionDialog
        :show="confirmTransaction"
        :amount="confirmFields.totalAmount"
        :is-blink="confirmFields.isBlink"
        :send-to="confirmFields.destination"
        :fee="confirmFields.totalFees"
        :on-confirm-transaction="onConfirmTransaction"
        :on-cancel-transaction="onCancelTransaction"
      />
      <q-inner-loading :showing="tx_status.sending">
        <q-spinner color="primary" size="30" />
      </q-inner-loading>
    </template>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { required, decimal } from "vuelidate/lib/validators";
import { address, greater_than_zero } from "src/validators/common";
import WalletField from "components/wallet_field";
import WalletPassword from "src/mixins/wallet_password";
import ConfirmDialogMixin from "src/mixins/confirm_dialog_mixin";
import ConfirmTransactionDialog from "components/confirm_tx_dialog";
const objectAssignDeep = require("object-assign-deep");

// the case for doing nothing on a tx_status update
const DO_NOTHING = 10;

export default {
  components: {
    WalletField,
    ConfirmTransactionDialog
  },
  mixins: [WalletPassword, ConfirmDialogMixin],
  data() {
    return {
      newTx: {
        recipients: [{ amount: 0, address: "" }],
        priority: 0,
        note: "",
        address_book: {
          save: false,
          name: "",
          description: ""
        }
      },
      showDescription: false,
      validationAttempted: false,
      confirmFields: {
        isBlink: false,
        totalAmount: -1,
        destination: "",
        totalFees: 0
      }
    };
  },
  computed: {
    ...mapState({
      theme: state => state.gateway.app.config.appearance.theme,
      view_only: state => state.gateway.wallet.info.view_only,
      unlocked_balance: state => state.gateway.wallet.info.unlocked_balance,
      tx_status: state => state.gateway.tx_status,
      is_ready() {
        return this.$store.getters["gateway/isReady"];
      },
      is_able_to_send() {
        return this.$store.getters["gateway/isAbleToSend"];
      },
      address_placeholder(state) {
        const wallet = state.gateway.wallet.info;
        const prefix = (wallet && wallet.address && wallet.address[0]) || "L";
        return `${prefix}..`;
      },
      confirmTransaction: state => state.gateway.tx_status.code === 1
    }),
    // Same tiers as the official Android wallet (PalmWallet); raw values are
    // the wallet-rpc `priority` scale. On the jude chain everything except
    // Slow(1) is treated as blink. Computed (not data) so the labels
    // re-translate on live language switch.
    priorityOptions() {
      return [
        { label: this.$t("strings.priorityOptions.slow"), value: 1 },
        { label: this.$t("strings.priorityOptions.automatic"), value: 0 },
        { label: this.$t("strings.priorityOptions.normal"), value: 2 },
        { label: this.$t("strings.priorityOptions.fast"), value: 3 },
        { label: this.$t("strings.priorityOptions.fastest"), value: 4 }
      ];
    }
  },
  validations: {
    newTx: {
      recipients: {
        $each: {
          amount: {
            required,
            decimal,
            greater_than_zero
          },
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
          }
        }
      }
    }
  },
  watch: {
    tx_status: {
      handler(val, old) {
        if (val.code == old.code) return;
        const { code, message } = val;
        switch (code) {
          // the "nothing", so we can update state without doing anything
          // in particular
          case DO_NOTHING:
            break;
          case 1:
            this.buildDialogFieldsSend(val);
            break;
          case 0:
            this.$q.notify({
              type: "positive",
              timeout: 1000,
              message
            });
            this.$v.$reset();
            this.validationAttempted = false;
            this.newTx = {
              recipients: [{ amount: 0, address: "" }],
              priority: 0,
              address_book: {
                save: false,
                name: "",
                description: ""
              },
              note: ""
            };
            this.showDescription = false;
            break;
          case -1:
            this.$q.notify({
              type: "negative",
              timeout: 3000,
              message
            });
            break;
        }
      },
      deep: true
    },
    $route(to) {
      if (to.path == "/wallet/send") {
        this.clearRecipientValidation();
        if (to.query.hasOwnProperty("address")) {
          this.autoFill(to.query);
        }
      }
    }
  },
  mounted() {
    this.clearRecipientValidation();
    if (
      this.$route.path == "/wallet/send" &&
      this.$route.query.hasOwnProperty("address")
    ) {
      this.autoFill(this.$route.query);
    }
  },
  methods: {
    clearRecipientValidation() {
      // A failed submit marks Vuelidate's whole transaction tree as dirty.
      // Reset it as soon as the user edits a recipient so stale red borders do
      // not remain on screen; the next Send click performs a fresh validation.
      this.validationAttempted = false;
      this.$v.newTx.$reset();
    },
    setAllAmount(recipient) {
      recipient.amount = this.unlocked_balance / 1e9;
      this.clearRecipientValidation();
    },
    addRecipient() {
      this.newTx.recipients.push({ amount: 0, address: "" });
      this.clearRecipientValidation();
    },
    removeRecipient(index) {
      this.newTx.recipients.splice(index, 1);
      this.clearRecipientValidation();
    },
    autoFill: function(info) {
      this.newTx.recipients[0].address = info.address;
      this.clearRecipientValidation();
    },
    buildDialogFieldsSend(txData) {
      // build using mixin method
      this.confirmFields = this.buildDialogFields(txData);
    },
    onConfirmTransaction() {
      // put the loading spinner up
      this.$store.commit("gateway/set_tx_status", {
        code: DO_NOTHING,
        message: "Getting transaction information",
        sending: true
      });
      const { name, description, save } = this.newTx.address_book;
      const addressSave = {
        address: this.newTx.recipients[0].address,
        address_book: {
          description,
          name,
          save
        }
      };

      const note = this.newTx.note;
      const isBlink = this.confirmFields.isBlink;

      const relayTxData = {
        isBlink,
        addressSave,
        note,
        // you may be sending all (which calls sweep_all RPC), but this refers to
        // if the relay is coming from "sweep all" on the SN tab
        isSweepAll: false
      };

      // Commit the transaction
      this.$gateway.send("wallet", "relay_tx", relayTxData);
    },
    onCancelTransaction() {
      this.$store.commit("gateway/set_tx_status", {
        code: DO_NOTHING,
        message: "Cancel the transaction from confirm dialog",
        sending: false
      });
    },

    async send() {
      this.validationAttempted = true;
      this.$v.newTx.$touch();

      for (let i = 0; i < this.newTx.recipients.length; i++) {
        const r = this.newTx.recipients[i];
        if (r.amount < 0) {
          this.$q.notify({
            type: "negative",
            timeout: 1000,
            message: this.$t("notification.errors.negativeAmount")
          });
          return;
        } else if (r.amount == 0) {
          this.$q.notify({
            type: "negative",
            timeout: 1000,
            message: this.$t("notification.errors.zeroAmount")
          });
          return;
        }
      }

      const totalAmount = this.newTx.recipients.reduce(
        (sum, r) => sum + parseFloat(r.amount || 0),
        0
      );
      if (totalAmount > this.unlocked_balance / 1e9) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.notEnoughBalance")
        });
        return;
      }

      if (this.$v.newTx.recipients.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidAmount")
        });
        return;
      }

      let passwordDialog = await this.showPasswordConfirmation({
        title: this.$t("dialog.transfer.title"),
        noPasswordMessage: this.$t("dialog.transfer.message"),
        ok: {
          label: this.$t("dialog.transfer.ok"),
          color: "primary"
        }
      });
      passwordDialog
        .onOk(password => {
          password = password || "";
          this.$store.commit("gateway/set_tx_status", {
            code: DO_NOTHING,
            message: "Getting transaction information",
            sending: true
          });
          const newTx = objectAssignDeep.noMutate(this.newTx, {
            password
          });

          this.$gateway.send("wallet", "transfer", newTx);
        })
        .onDismiss(() => {})
        .onCancel(() => {});
    }
  }
};
</script>

<style lang="scss">
.send {
  .send-form {
    max-width: 700px;
  }

  .send-btn {
    margin-top: 6px;
    min-width: 140px;
  }

  .coin-icon {
    width: 22px;
    height: 22px;
    margin-left: 4px;
  }

  .all-btn {
    background: var(--jude-bg-alt);
    color: var(--jude-text);
    border: 1px solid var(--jude-border);
    min-width: 44px;
  }

  .field-icon-btn {
    color: var(--jude-text-dim);
  }

  .add-rows {
    .q-btn {
      display: block;
      color: var(--jude-text);
      margin-bottom: 4px;

      .q-icon {
        color: var(--jude-accent);
        margin-right: 8px;
      }
    }
  }

  .advanced-options {
    width: -webkit-fit-content;
    max-width: 400px;
    color: var(--jude-text);

    .q-item {
      padding-left: 0;
    }
  }
}

.amount {
  padding-right: 10px;
}

.recipient-group {
  padding: 8px 0;
  border-bottom: 1px solid var(--jude-border-light);
  margin-bottom: 4px;
}

.recipient-group:last-of-type {
  border-bottom: none;
}
</style>
