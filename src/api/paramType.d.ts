// 登录
interface ILoginParam {
  code: string
  mobile?: string
  username?: string
  password?: string
  captchaId?: string
  saveLogin?: boolean
}

// 注册
interface IRegisterParam {
  username: string
  email: string
  password: string
  mobile: string
  code: string
  passStrength: string
}

// 短信验证码
interface ISmsParam {
  mobile: string
  captchaId?: string
  code?: string
}
