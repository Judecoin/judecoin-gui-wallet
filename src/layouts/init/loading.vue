<template>
  <q-layout>
    <q-header class="titlebar-only">
      <TitleBar />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TitleBar from "components/titlebar";
export default {
  components: {
    TitleBar
  },
  data() {
    return {};
  }
};
</script>

<style></style>
