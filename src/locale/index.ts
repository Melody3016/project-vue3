import { createI18n } from "vue-i18n"
import { setStore, getStore } from "@/libs/localStroage"
import zhLocale from "./lang/zh-CN.json"
import enLocale from "./lang/en-US.json"
import jaLocale from "./lang/ja-JP.json"
import { Langs } from "@/utils/enums"
// 根据浏览器信息自动设置语言
const navLang = navigator.language
const localLang =
  navLang == Langs.zhCN || navLang == Langs.enUS || navLang == Langs.jaJP
    ? navLang
    : false
if (getStore("lang") == "undefined") {
  setStore("lang", "")
}
const lang = localStorage.lang || localLang || Langs.zhCN
if (!localStorage.lang) {
  setStore("lang", lang)
}
// Type-define 'zh-CN' as the master schema for the resource
type MessageSchema = typeof zhLocale
// 多语言配置 vue-i18n
const messages = {
  [Langs.zhCN]: zhLocale,
  [Langs.enUS]: enLocale,
  [Langs.jaJP]: jaLocale
}
const i18n = createI18n<[MessageSchema], Langs.zhCN | Langs.enUS | Langs.jaJP>({
  locale: lang,
  legacy: false,
  messages
})

export default i18n
