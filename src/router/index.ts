import { createRouter, createWebHistory } from "vue-router"
import Cookie from "js-cookie"
import NProgress from "nprogress"
import { single } from "./routers"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/index.vue")
    },
    ...single
  ]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  // 开启顶部加载条
  NProgress.start()
  // 目标路由名称
  const name = to.name
  // 是否为权限路由
  // const isPermission =
  //   name != "login" &&
  //   name != "regist" &&
  //   name != "regist-result" &&
  //   name != "authorize"
  const isPermission =
    name &&
    ![
      "login",
      "login-qr",
      "register",
      "register-result",
      "relate",
      "reset",
      "authorize"
    ].includes(name as string)
  if (!Cookie.get("userinfo") && isPermission) {
    // 未登录且访问权限路由
    next({
      name: "login"
    })
  } else if (Cookie.get("userinfo") && name === "login") {
    // 已登录访问登录页直接跳转至首页
    next({
      name: "home"
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
