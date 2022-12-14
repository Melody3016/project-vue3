import { defineStore } from "pinia"
import useLang from "./hooks/useLang"

export const useAppStore = defineStore("app", () => {
  // 语言 国际化
  const { lang, switchLang } = useLang()
  return { lang, switchLang }
})
