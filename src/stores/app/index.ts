import { defineStore } from "pinia"
import useLang from "./hooks/useLang"
import useInitRouter from "./hooks/useInitRouter"
import { ref } from "vue"

export const useAppStore = defineStore("app", () => {
  // 语言 国际化
  const { lang, switchLang } = useLang()

  // 标识是否已经添加动态路由
  const hasAddRoute = ref(false)

  const setHasAddRoute = (bool: boolean) => {
    hasAddRoute.value = bool
  }

  // 菜单路由相关
  // const {
  //   menuData,
  //   navList,
  //   currNavName,
  //   menuList,
  //   otherRoutes,
  //   dynamicRoutes,
  //   getMenuData,
  //   getCurrNavName,
  //   getDynamicRoutes,
  //   handleMenuList,
  //   handleNavList,
  //   dynamicAddRoute
  // } = useInitRouter()
  const routeStore = useInitRouter()

  return {
    lang,
    hasAddRoute,
    switchLang,
    setHasAddRoute,
    ...routeStore
  }
})
