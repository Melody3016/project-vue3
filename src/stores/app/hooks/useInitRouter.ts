import { reactive, ref } from "vue"
import { useRouter, type RouteRecordRaw } from "vue-router"
import Cookies from "js-cookie"
import utils from "@/utils/utils"
import { getMenuList } from "@/api"
import { getStore } from "@/libs/localStroage"
import lazyLoading from "@/libs/lazyLoading"
import { useAppStore } from ".."

interface INav {
  name: string
  title: string
  icon: string
  isMenu: boolean
  url: string
  description: string
  component: string
  localize: boolean
  i18n: string
}
export default () => {
  const $router = useRouter()
  const isLoading = ref(true)
  const menuData = ref<IMenuListRes[]>([])
  const navList = ref<INav[]>([])
  const menuList = ref<IMenuListRes[]>([])
  const currNavName = ref("")
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  const otherRoutes = reactive<RouteRecordRaw[]>([
    {
      path: "/:pathMatch(.*)*",
      name: "error-404",
      meta: {
        title: "404-页面不存在 - XBoot一站式前后端分离快速开发平台 By: Exrick",
        permTypes: null,
        url: null
      },
      component: lazyLoading("error-page/404")
    }
  ])
  const hasMenuData = ref(false)

  // 获取菜单数据
  const getMenuData = async () => {
    // 判断用户是否登录
    const userInfo = Cookies.get("userInfo")
    if (!userInfo) {
      // 未登录
      return
    }
    // 判断是否已经获取过菜单数据
    if (hasMenuData.value) return
    // 获取菜单数据
    const [err, res] = await utils.awaitWrap(getMenuList())
    isLoading.value = false
    // 错误处理
    if (err || !res) {
      return
    }
    menuData.value = res.result || []
    // 标识已经获取菜单数据
    hasMenuData.value = true
  }

  // 动态添加路由
  const dynamicAddRoute = (routes: RouteRecordRaw[], parentName?: string) => {
    // 遍历递归
    for (const item of routes) {
      if (parentName) {
        $router.addRoute(parentName, item)
      } else {
        $router.addRoute(item)
      }
    }
    // 设置动态路由添加状态
    const { setHasAddRoute } = useAppStore()
    setHasAddRoute(true)
  }

  // 处理路由数据
  const getDynamicRoutes = (
    dynamicRoutes: RouteRecordRaw[],
    menuData: IMenuListRes[]
  ) => {
    for (const item of menuData) {
      if (item.type === -1 && item.children) {
        handleRoute(dynamicRoutes, item.children)
      }
    }
  }

  // 将后台返回的数据封装为路由格式
  const handleRoute = (routes: RouteRecordRaw[], data: IMenuListRes[]) => {
    if (!data) return
    for (const item of data) {
      const route: any = {}
      route.name = item.name
      route.path = item.path
      // menu.component = import(`@/views/${menu.component}.vue`);
      // level为1代表无需组件，只需重定向至home
      if (item.level === 1) {
        route.redirect = "/home"
      } else if (item.level === 2) {
        route.component = lazyLoading(item.component)
        // route.component = modules[`../../../views/${item.component}.vue`]
      }

      if (item.children && item.children.length > 0) {
        route.children = []
        handleRoute(route.children, item.children)
      }

      const meta: any = {}
      // 用于subMenu处于展示状态
      const sub = item.component.split("/")[0]
      meta.sub = sub
      // 给页面添加权限、标题、第三方网页链接
      meta.permTypes = item.permTypes ? item.permTypes : null
      meta.title = item.title
        ? item.title + " - XBoot一站式前后端分离快速开发平台 By: Exrick"
        : null
      meta.url = item.url ? item.url : null
      route.meta = meta
      routes.push(route)
    }
  }

  // 封装导航条navList数据
  const handleNavList = (data: IMenuListRes[]) => {
    if (!data) return
    // 类型 -1顶部菜单
    for (const item of data) {
      if (item.type === -1) {
        const nav = {
          name: item.name,
          title: item.title,
          icon: item.icon,
          isMenu: item.isMenu,
          url: item.url,
          description: item.description,
          component: item.component,
          localize: item.localize,
          i18n: item.i18n
        }
        navList.value.push(nav)
      }
    }
  }

  // 封装左侧菜单menuList数据
  const handleMenuList = (name: string | number, menuData: IMenuListRes[]) => {
    for (const item of menuData) {
      if (item.name == name) {
        // 过滤
        menuList.value = item.children || []
      }
    }
    currNavName.value = name as string
  }

  const getCurrNavName = () => {
    // currNavName默认第一项
    currNavName.value = getStore("currNavName") || ""
    if (!currNavName.value) currNavName.value = menuData.value[0].name
  }

  /* if (!vm.$store.state.app.added) {
    vm.$Loading.start()
    // 第一次加载 读取数据
    let accessToken = window.localStorage.getItem("accessToken")
    // 加载菜单
    axios
      .get(getMenuList, { headers: { accessToken: accessToken } })
      .then((res) => {
        vm.$Loading.finish()
        let menuData = res.result
        if (!menuData) {
          return
        }
        util.initAllMenuData(constRoutes, menuData)
        util.initRouterNode(otherRoutes, otherRouter)
        // 添加所有主界面路由
        vm.$store.commit(
          "updateAppRouter",
          constRoutes.filter((item) => item.children.length > 0)
        )
        // 添加全局路由
        vm.$store.commit("updateDefaultRouter", otherRoutes)
        // 添加菜单路由
        util.initMenuData(vm, menuData)
        // 缓存数据 修改加载标识
        window.localStorage.setItem("menuData", JSON.stringify(menuData))
        vm.$store.commit("setAdded", true)
      })
  } else {
    // 读取缓存数据
    let data = window.localStorage.getItem("menuData")
    if (!data) {
      vm.$store.commit("setAdded", false)
      return
    }
    let menuData = JSON.parse(data)
    // 添加菜单路由
    util.initMenuData(vm, menuData)
  } */
  return {
    menuData,
    navList,
    currNavName,
    menuList,
    otherRoutes,
    dynamicRoutes,
    getMenuData,
    getCurrNavName,
    getDynamicRoutes,
    handleMenuList,
    handleNavList,
    dynamicAddRoute
  }
}
