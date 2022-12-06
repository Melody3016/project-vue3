import { createI18n } from "vue-i18n"
import zhLocale from "./lang/zh-CN"
import enLocale from "./lang/en-US"

// 根据浏览器信息自动设置语言
const navLang = navigator.language
const localLang = navLang == "zh-CN" || navLang == "en-US" ? navLang : false
if (localStorage.lang == "undefined") {
  localStorage.lang = ""
}
const lang = localStorage.lang || localLang || "zh-CN"
if (!localStorage.lang) {
  localStorage.lang = lang
}

// 多语言配置 vue-i18n
const messages = {
  "zh-CN": zhLocale,
  "en-US": enLocale
}
const i18n = createI18n({
  allowComposition: true, // you need to specify that!
  locale: lang,
  messages
})

export default i18n
