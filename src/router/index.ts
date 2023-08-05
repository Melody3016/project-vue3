import { createRouter, createWebHistory } from "vue-router"
import Cookie from "js-cookie"
import NProgress from "nprogress"
import { storeToRefs } from "pinia"
import { single, other } from "./routers"
import util from "@/utils/utils"
import { useAppStore } from "@/stores"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...single, ...other]
})
const singleName = [
  "Login",
  "LoginQr",
  "Register",
  "RegisterResult",
  "Relate",
  "Reset",
  "Authorize"
]

// 路由拦截
router.beforeEach(async (to, from, next) => {
  util.title(to.meta.title as string)
  // 开启顶部加载条
  NProgress.start()
  // 目标路由名称
  const name = to.name
  // 是否为单独路由
  const isSingle = name && singleName.includes(name as string)
  if (!Cookie.get("userInfo") && !isSingle) {
    // 未登录且访问的不是单独路由
    next({
      name: "Login"
    })
  } else if (Cookie.get("userInfo") && name === "Login") {
    // 已登录访问登录页直接跳转至首页
    next({
      name: "HomeIndex"
    })
  } else if (Cookie.get("userInfo") && name !== "Login") {
    // 未添加动态路由则先添加再跳转
    const appStore = useAppStore()
    const { setHasAddRoute, dynamicAddRoute, getMenuData, getDynamicRoutes } =
      appStore
    const { hasAddRoute, dynamicRoutes, otherRoutes, menuData } =
      storeToRefs(appStore)
    if (!hasAddRoute.value) {
      // 动态添加路由
      await getMenuData()
      getDynamicRoutes(dynamicRoutes.value, menuData.value)
      dynamicAddRoute(dynamicRoutes.value, "otherRouter")
      dynamicAddRoute(otherRoutes.value)
      setHasAddRoute(true)
      // next({ ...to, replace: true })
      // router.push(to.path)
      next(to.path)
    } else {
      next()
    }
    // next()
  } else {
    next()
  }
})

// 全局后置守卫
router.afterEach((to) => {
  // 结束顶部加载条
  NProgress.done()
  // 添加tags
  // 目标路由名称
  const name = to.name
  // 是否为单独路由
  const isSingle = name && singleName.includes(name as string)
  if (!isSingle) {
    // 代表是后台界面中的动态路由
    const appStore = useAppStore()
    const { addTags } = appStore
    if (to.name && to.meta.oriTitle) {
      addTags({ name: to.name as string, title: to.meta.oriTitle as string })
    }
  }
})

export default router
