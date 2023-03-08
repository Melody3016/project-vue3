import type { RouteRecordRaw } from "vue-router"
export const single: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/basic/login/index.vue")
  },
  {
    path: "/login-qr",
    name: "LoginQr",
    meta: {
      title: "扫码登录 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/basic/login-qr/index.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/basic/register/index.vue")
  },
  {
    path: "/register-result",
    name: "RegisterResult",
    meta: {
      title: "注册结果 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/basic/register-result/index.vue")
  }
]
