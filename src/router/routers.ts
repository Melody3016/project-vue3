import type { RouteRecordRaw } from "vue-router"
export const single: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录 - XBoot前后端分离开发平台 "
    },
    component: () => import("../views/basic/login/index.vue")
  },
  {
    path: "/login-qr",
    name: "login-qr",
    meta: {
      title: "扫码登录 - XBoot前后端分离开发平台 "
    },
    component: () => import("../views/basic/login-qr/index.vue")
  }
]
