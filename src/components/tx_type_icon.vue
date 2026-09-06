<template>
  <div v-if="type == 'in'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/19-tx-received.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div v-else-if="type == 'out'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/20-tx-sent.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div v-else-if="type == 'pool'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/21-tx-pending.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div v-else-if="type == 'pending'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/21-tx-pending.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div v-else-if="type == 'failed'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/22-tx-failed.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div
    v-else-if="type == 'miner' || type == 'snode' || type == 'gov'"
    class="tx-icon"
  >
    <img
      src="jude-assets/transaction-status/19-tx-received.png"
      style="width:40px;height:40px;"
    />
  </div>
  <div v-else-if="type == 'stake'" class="tx-icon">
    <img
      src="jude-assets/transaction-status/23-tx-stake-locked.png"
      style="width:40px;height:40px;"
    />
  </div>
</template>

<script>
export default {
  name: "TxTypeIcon",
  props: {
    type: {
      type: String,
      required: true
    },
    tooltip: {
      type: Boolean,
      default: true,
      required: false
    }
  }
};
</script>

<style>
.tx-icon {
  width: 32px;
  height: 32px;
  position: relative;
}
.tx-icon .main-icon {
  margin: -4px 0 0 -4px;
}
.tx-icon .sub-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  bottom: -3px;
  right: 0;
}
</style>
