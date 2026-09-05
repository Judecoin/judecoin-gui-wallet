<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme
  }),
  watch: {
    theme: function() {
      this.applyTheme();
    }
  },
  mounted() {
    this.applyTheme();
  },
  methods: {
    applyTheme() {
      const classes = document.body.classList;
      const isDark = this.theme == "dark";
      if (isDark) {
        classes.add("dark");
        classes.remove("light");
      } else {
        classes.remove("dark");
        classes.add("light");
      }
      // the scrollbar gutter paints the <html> background (falls back to the
      // native window color, which is dark) — keep it in sync with the theme
      document.documentElement.style.background = isDark
        ? "#0D1117"
        : "#FFFFFF";
    }
  }
};
</script>

<style></style>
