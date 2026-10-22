<template>
  <div class="wallet-card wallet-navy">
    <div class="row items-center no-wrap">
      <img class="card-logo" src="jude-logo.png" />
      <div class="col card-titles">
        <div class="card-name ellipsis">{{ info.name }}</div>
        <div class="card-sub ellipsis">
          {{ $t("strings.judeUnlockedShort") }}:
          <FormatJude :amount="info.unlocked_balance" />
        </div>
      </div>
    </div>
    <div class="card-balance row items-baseline no-wrap">
      <span class="value"><FormatJude :amount="info.balance"/></span>
    </div>
    <div
      v-if="info.accrued_balance > 0"
      class="card-rewards row items-center no-wrap"
    >
      <span class="ellipsis"
        >{{ $t("strings.judeAccumulatedRewards") }}:
        <FormatJude :amount="info.accrued_balance" /> •
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
import FormatJude from "components/format_jude";
import FormatNextPayout from "components/format_next_payout";
export default {
  name: "WalletDetails",
  components: {
    FormatJude,
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
  margin: clamp(10px, 1vw, 16px);
  padding: clamp(12px, 1.1vw, 18px);
  border-radius: 8px;

  .card-logo {
    width: 48px;
    height: 48px;
    margin-right: clamp(10px, 1vw, 14px);
  }

  .card-titles {
    min-width: 0;
  }

  .card-name {
    font-size: clamp(19px, 1.15vw, 22px);
    font-weight: 700;
  }

  .card-sub {
    font-size: clamp(15px, 0.9vw, 17px);
    font-weight: 600;
    opacity: 0.9;
  }

  .card-balance {
    margin-top: clamp(10px, 1vh, 14px);

    .unit {
      font-size: 16px;
      font-weight: 700;
      margin-right: 6px;
    }

    .value {
      font-size: clamp(30px, 2.25vw, 40px);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-rewards {
    margin-top: 6px;
    font-size: clamp(14px, 0.85vw, 16px);
    opacity: 0.85;
  }

  @media (max-width: 1200px) {
    .card-name {
      font-size: 18px;
    }

    .card-sub {
      font-size: 14px;
    }

    .card-balance .value {
      font-size: 30px;
    }
  }
}
</style>
