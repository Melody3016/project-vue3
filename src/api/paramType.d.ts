// 登录接口param对象类型
interface ILoginParam {
  code: string
  mobile?: string
  username?: string
  password?: string
  captchaId?: string
  saveLogin?: boolean
}
