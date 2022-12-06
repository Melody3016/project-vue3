import { createRouter, createWebHistory } from "vue-router"
import Cookie from "js-cookie"
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
  // 目标路由名称
  const name = to.name
  // 是否为权限路由
  const isPermission =
    name != "login" &&
    name != "regist" &&
    name != "regist-result" &&
    name != "authorize"
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

export default router
