import type { RouteRecordRaw } from "vue-router"
import Main from "@/views/Main.vue"

export const single: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/single/login/index.vue")
  },
  {
    path: "/login-qr",
    name: "LoginQr",
    meta: {
      title: "扫码登录 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/single/login-qr/index.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/single/register/index.vue")
  },
  {
    path: "/register-result",
    name: "RegisterResult",
    meta: {
      title: "注册结果 - XBoot前后端分离开发平台"
    },
    component: () => import("../views/single/register-result/index.vue")
  }
]
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// 静态权限路由，无需调接口
export const other: RouteRecordRaw[] = [
  {
    path: "/",
    name: "otherRouter",
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "home",
        name: "HomeIndex",
        meta: {
          title: "首页",
          localize: true,
          i18n: "home"
        },
        component: () => import("@/views/other/home/index.vue")
      }
      /* ,
      {
        path: "sys",
        name: "sys",
        meta: {
          title: "系统管理",
          localize: true,
          i18n: "sys"
        },
        redirect: "/home",
        // component: Main,
        children: [
          {
            path: "user-manage",
            name: "user-manage",
            meta: {
              title: "用户管理",
              localize: true,
              i18n: "user-manage"
            },
            component: () => import("@/views/sys/user-manage/userManage.vue")
          }
        ]
      } */
      // {
      //   path: "ownspace",
      //   name: "OwnspaceIndex",
      //   meta: {
      //     title: "个人中心"
      //   },
      //   component: () => import("@/views/other/ownspace/index.vue")
      // },
      // {
      //   path: "message",
      //   name: "MessageIndex",
      //   meta: {
      //     title: "消息中心"
      //   },
      //   component: () => import("@/views/other/message/index.vue")
      // },
      // {
      //   path: "add",
      //   name: "add",
      //   meta: {
      //     title: "添加"
      //   },
      //   component: () => import("@/views/xboot-vue-template/new-window/add.vue")
      // },
      // {
      //   path: "edit",
      //   name: "edit",
      //   meta: {
      //     title: "编辑"
      //   },
      //   component: () =>
      //     import("@/views/xboot-vue-template/new-window/edit.vue")
      // },
      // {
      //   path: "leave",
      //   name: "leave",
      //   meta: {
      //     title: "请假申请"
      //   },
      //   component: () => import("@/views/activiti/business/leave.vue")
      // },
      // {
      //   path: "historic-detail",
      //   name: "historic_detail",
      //   meta: {
      //     title: "流程进度历史详情"
      //   },
      //   component: () =>
      //     import("@/views/activiti/historic-detail/historicDetail.vue")
      // }
    ]
  }
  // ,
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "error-404",
  //   meta: {
  //     title: "404-页面不存在"
  //   },
  //   component: () => import("../views/error-page/404.vue")
  // }
]
