import { defineStore } from "pinia"
import useLang from "./hooks/useLang"
import useInitRouter from "./hooks/useInitRouter"
import useTagsList from "./hooks/useTagsList"

export const useAppStore = defineStore("app", () => {
  // 菜单路由相关
  const router = useInitRouter()
  // 语言 国际化
  const lang = useLang()
  // tagsList
  const tagsList = useTagsList()

  return {
    ...router,
    ...lang,
    ...tagsList
  }
})
