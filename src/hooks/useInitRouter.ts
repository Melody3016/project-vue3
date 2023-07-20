import { ref, reactive } from "vue"
import Cookies from "js-cookie"
import utils from "@/utils/utils"
import { getMenuList } from "@/api"
import { getStore } from "@/libs/localStroage"

interface IRoute {
  path: string
  name: string
  component: string
  meta?: object
}
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
  const isLoading = ref(true)
  let menuData: IMenuListRes[] = []
  const navList: INav[] = []
  let menuList: IMenuListRes[] = []
  const currNavName = ref("")
  const dynamicRoutes = []

  // 404路由需要和动态路由一起加载
  const otherRoutes = reactive<IRoute[]>([
    {
      path: "/*",
      name: "error-404",
      meta: {
        title: "404-页面不存在"
      },
      component: "error-page/404"
    }
  ])

  // 获取菜单数据
  const getMenuData = async () => {
    // 判断用户是否登录
    const userInfo = Cookies.get("userInfo")
    if (!userInfo) {
      // 未登录
      return
    }
    // 获取菜单数据
    const [err, res] = await utils.awaitWrap(getMenuList())
    isLoading.value = false
    // 错误处理
    if (err || !res) {
      return
    }
    menuData = res.result || []
    console.log("menuData", menuData)
    // 处理导航条数据
    handleNavList()
    // 处理菜单数据
    currNavName.value = getStore("currNavName") || ""
    // 默认第一项
    if (!currNavName.value) currNavName.value = menuData[0].name
    handleMenuList(currNavName.value)
  }

  // 封装导航条navList数据
  const handleNavList = () => {
    if (!menuData) return
    // 类型 -1顶部菜单
    for (const item of menuData) {
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
        navList.push(nav)
      }
    }
    console.log("navList", navList)
  }

  // 封装左侧菜单menuList数据
  const handleMenuList = (currNavName: string | number) => {
    for (const item of menuData) {
      if (item.name == currNavName) {
        // 过滤
        menuList = item.children || []
      }
    }
    console.log("menuList", menuList)
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
    getMenuData,
    handleMenuList
  }
}
