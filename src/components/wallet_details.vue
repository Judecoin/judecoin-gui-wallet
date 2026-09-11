<template>
  <div class="wallet-card judecoin-navy">
    <div class="row items-center no-wrap">
      <img class="card-logo" src="jude-logo.png" />
      <div class="col card-titles">
        <div class="card-name ellipsis">{{ info.name }}</div>
        <div class="card-sub ellipsis">
          {{ $t("strings.judecoinUnlockedShort") }}:
          <FormatJudecoin :amount="info.unlocked_balance" />
        </div>
      </div>
    </div>
    <div class="card-balance row items-baseline no-wrap">
      <span class="value"><FormatJudecoin :amount="info.balance"/></span>
    </div>
    <div
      v-if="info.accrued_balance > 0"
      class="card-rewards row items-center no-wrap"
    >
      <span class="ellipsis"
        >{{ $t("strings.judecoinAccumulatedRewards") }}:
        <FormatJudecoin :amount="info.accrued_balance" /> •
        {{ $t("strings.nextPayout") }}:
        <FormatNextPayout
          :payout-block="info.accrued_balance_next_payout"
          :current-block="info.height"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FormatJudecoin from "components/format_judecoin";
import FormatNextPayout from "components/format_next_payout";
export default {
  name: "WalletDetails",
  components: {
    FormatJudecoin,
    FormatNextPayout
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    info: state => state.gateway.wallet.info
  })
};
</script>

<style lang="scss">
.wallet-card {
  margin: 14px;
  padding: 14px 16px;
  border-radius: 8px;

  .card-logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .card-titles {
    min-width: 0;
  }

  .card-name {
    font-size: 16px;
    font-weight: 700;
  }

  .card-sub {
    font-size: 12px;
    opacity: 0.8;
  }

  .card-balance {
    margin-top: 12px;

    .unit {
      font-size: 13px;
      font-weight: 700;
      margin-right: 6px;
    }

    .value {
      font-size: 28px;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-rewards {
    margin-top: 6px;
    font-size: 11px;
    opacity: 0.85;
  }
}
</style>
