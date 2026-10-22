<template>
  <q-page>
    <div
      class="tx-toolbar row q-pt-sm q-mx-md q-mb-sm items-end non-selectable"
    >
      <div class="tx-heading col-7">
        {{ $t("titles.transactions") }}
      </div>

      <WalletField
        class="tx-filter col-3 q-px-sm"
        :label="$t('fieldLabels.filter')"
      >
        <q-input
          v-model="tx_filter"
          :placeholder="$t('placeholders.filterTx')"
          borderless
          dense
        />
      </WalletField>

      <WalletField
        class="tx-type-filter col-2"
        :label="$t('fieldLabels.filterTransactionType')"
      >
        <q-select
          v-model="tx_type"
          :options="tx_type_options"
          borderless
          dense
          emit-value
          map-options
        />
      </WalletField>
    </div>
    <TxList :type="tx_type" :filter="tx_filter" />
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import TxList from "components/tx_list";
import WalletField from "components/wallet_field";
export default {
  components: {
    TxList,
    WalletField
  },
  data() {
    return {
      tx_type: "all",
      tx_filter: ""
    };
  },
  computed: {
    ...mapState({
      theme: state => state.gateway.app.config.appearance.theme,
      tx_list: state => state.gateway.wallet.transactions.tx_list
    }),
    // computed (not data) so the labels re-translate on live language switch
    tx_type_options() {
      return [
        {
          label: this.$t("strings.transactions.types.all"),
          value: "all"
        },
        {
          label: this.$t("strings.transactions.types.incoming"),
          value: "in"
        },
        {
          label: this.$t("strings.transactions.types.outgoing"),
          value: "out"
        },
        {
          label: this.$t("strings.transactions.types.pending"),
          value: "all_pending"
        },
        {
          label: this.$t("strings.transactions.types.serviceNode"),
          value: "snode"
        },
        {
          label: this.$t("strings.transactions.types.stake"),
          value: "stake"
        },
        {
          label: this.$t("strings.transactions.types.failed"),
          value: "failed"
        }
      ];
    }
  }
};
</script>

<style lang="scss">
.tx-toolbar {
  flex-wrap: nowrap;
  gap: 10px;

  .tx-heading {
    flex: 1 1 auto;
    min-width: 130px;
    font-size: clamp(16px, 1.1vw, 20px);
    font-weight: 600;
    padding-bottom: 10px;
  }

  .tx-filter {
    flex: 0 1 330px;
    max-width: 330px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .tx-type-filter {
    flex: 0 0 clamp(170px, 14vw, 220px);
    max-width: 220px;
  }
}

@media (max-width: 1100px) {
  .tx-toolbar {
    flex-wrap: wrap;

    .tx-heading {
      flex-basis: 100%;
      padding-bottom: 0;
    }

    .tx-filter {
      flex: 1 1 240px;
      max-width: none;
    }

    .tx-type-filter {
      flex: 0 1 190px;
    }
  }
}
</style>
