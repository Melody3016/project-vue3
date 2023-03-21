import type { ComponentInternalInstance } from "vue"
import Cookies from "js-cookie"
import { userInfo } from "@/api"
import utils from "@/utils/utils"
import { useUserStore } from "@/stores"


export default (instance: ComponentInternalInstance | null) => {
  // 登录成功，获取到token，获取用户信息，进行路由动态加载
  const afterLogin = async (token: string, saveLogin: boolean) => {
    // 将token存入localStorage中
    // debugger
    instance?.proxy?.$setStore("accessToken", token)

    //  "result": {
    //     "blacklist": "",
    //     "domain": "",
    //     "ssoDomain": ""
    //   },
    // 获取信息接口： 黑名单ip 单点登录域名
    // getOtherSet().then((res) => {
    //   if (res.result) {
    //     let domain = res.result.ssoDomain
    //     Cookies.set("accessToken", accessToken, {
    //       domain: domain,
    //       expires: 7
    //     })
    //   }
    // })

    // 获取用户信息
    const [error, res] = await utils.awaitWrap(userInfo())
    if (error || !res) {
      // 错误处理
      return
    }
    if (res.success && res.result) {
      // 避免超过大小限制
      delete res.result.permissions
      // 当前用户拥有的角色
      const roles: string[] = []
      res.result.roles?.forEach((e) => {
        roles.push(e.name)
      })
      delete res.result.roles
      // 本地存储
      instance?.proxy?.$setStore("roles", roles)
      instance?.proxy?.$setStore("saveLogin", saveLogin)
      instance?.proxy?.$setStore("userInfo", res.result)
      // 设置cookie
      if (saveLogin) {
        // 保存7天
        Cookies.set("userInfo", JSON.stringify(res.result), {
          expires: 7
        })
      } else {
        Cookies.set("userInfo", JSON.stringify(res.result))
      }
      // result存入store中
      const { setUserInfo } = useUserStore()
      setUserInfo(res.result)
      // 加载菜单
      // util.initRouter(this)
      // window.location.reload();
      instance?.proxy?.$router.push({
        name: "HomeIndex"
      })
    }
  }
  return {
    afterLogin
  }
}
