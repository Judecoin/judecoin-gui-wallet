<template>
  <q-page class="service-node-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="accent"
        :options="[
          {
            label: $t('titles.serviceNode.myStakes'),
            value: 'myStakes'
          },
          {
            label: $t('titles.serviceNode.staking'),
            value: 'staking'
          }
        ]"
      />
    </div>
    <ServiceNodeUnlock v-if="screen === 'myStakes'" />
    <ServiceNodeStaking v-if="screen === 'staking'" />
  </q-page>
</template>

<script>
import ServiceNodeStaking from "components/service_node/service_node_staking";
import ServiceNodeUnlock from "components/service_node/service_node_unlock";
export default {
  components: {
    ServiceNodeStaking,
    ServiceNodeUnlock
  },
  data() {
    return {
      screen: "staking"
    };
  }
};
</script>

<style lang="scss"></style>
