import { createRouter, createWebHistory } from "vue-router"
import Cookie from "js-cookie"
import NProgress from "nprogress"
import { single, other } from "./routers"
import util from "@/utils/utils"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...single, ...other]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  util.title(to.meta.title as string)
  // 开启顶部加载条
  NProgress.start()
  // 目标路由名称
  const name = to.name
  // 是否为权限路由
  const isPermission =
    name &&
    ![
      "Login",
      "LoginQr",
      "Register",
      "RegisterResult",
      "Relate",
      "Reset",
      "Authorize"
    ].includes(name as string)
  if (!Cookie.get("userInfo") && isPermission) {
    // 未登录且访问权限路由
    next({
      name: "Login"
    })
  } else if (Cookie.get("userInfo") && name === "Login") {
    // 已登录访问登录页直接跳转至首页
    next({
      name: "HomeIndex"
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  // 结束顶部加载条
  NProgress.done()
})

export default router
