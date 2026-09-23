import enUS from "./en-us";

// ADD LANGUAGES HERE
const languages = [
  { name: "English", code: "en-us", flag: "gb" },
  { name: "繁體中文", code: "zh-tw", flag: "hk" },
  { name: "Deutsch", code: "de", flag: "de" },
  { name: "日本語", code: "ja", flag: "jp" },
  { name: "한국어", code: "ko", flag: "kr" },
  { name: "Italiano", code: "it", flag: "it" },
  { name: "Nederlands", code: "nl", flag: "nl" },
  { name: "Русский", code: "ru", flag: "ru" },
  { name: "Español", code: "es", flag: "es" }
];

export { languages };

// DO NOT MODIFY THIS EXPORT, LANGUAGE FILES CAN BE DYNAMICALLY LOADED
export default {
  "en-us": enUS
};
