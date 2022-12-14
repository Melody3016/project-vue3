import { ref } from "vue"
import { setStore } from "@/libs/localStroage"
import type { Langs } from "@/utils/enums"

export default () => {
  // 语言
  const lang = ref("")
  // 切换语言
  const switchLang = (v: Langs) => {
    lang.value = v
    setStore("lang", v)
  }

  return {
    lang,
    switchLang
  }
}
