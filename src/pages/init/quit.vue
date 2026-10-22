<template>
  <q-page>
    <div class="init-screen-page text-center">
      <div class="absolute-center">
        <video
          :src="splashVideo"
          class="quit-splash-logo"
          autoplay
          loop
          muted
        />

        <div class="q-mt-xl q-mb-lg">
          <q-spinner color="primary" :size="30" />
        </div>

        <div class="message">{{ $t("strings.closing") }}...</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    splashVideo() {
      return this.theme === "light"
        ? "jude-assets/brand/splash-loop-light-v12-alpha.webm"
        : "jude-assets/brand/splash-loop-v12-alpha.webm";
    }
  })
};
</script>

<style lang="scss">
.init-screen-page {
  height: 100vh;
  position: relative;
  background: #0c1117;
}
body.light .init-screen-page {
  background: #dce1e5;
}
.quit-splash-logo {
  display: block;
  width: min(520px, 72vw);
  margin: 0 auto -44px;
  object-fit: contain;
}
</style>
