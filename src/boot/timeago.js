import VueTimeago from "vue-timeago";
export default ({ Vue }) => {
  Vue.use(VueTimeago, {
    name: "Timeago",
    locale: "en",
    locales: {
      "en-us": require("date-fns/locale/en"),
      "zh-tw": require("date-fns/locale/zh_tw"),
      "zh-cn": require("date-fns/locale/zh_cn"),
      ru: require("date-fns/locale/ru"),
      de: require("date-fns/locale/de"),
      fr: require("date-fns/locale/fr"),
      es: require("date-fns/locale/es"),
      "pt-br": require("date-fns/locale/pt"),
      ja: require("date-fns/locale/ja"),
      ko: require("date-fns/locale/ko"),
      it: require("date-fns/locale/it"),
      nl: require("date-fns/locale/nl")
    }
  });
};
