// 统一请求路径前缀在api/axios.js中修改
import {
  getRequest,
  postRequest,
  getNoAuthRequest,
  postNoAuthRequest
} from "./axios"
const xbootUrl = "/xboot"
// const myWebUrl = "my-web"

// 验证码渲染图片接口
export const drawCodeImage = `${xbootUrl}/common/captcha/draw/`

// 通知提醒框
export const noticeReq = () => {
  return getNoAuthRequest<IData<INoticeRes>>("/setting/notice")
}

// 获取验证码
export const initCaptcha = () => {
  return getNoAuthRequest<IData<string>>("/common/captcha/init")
}

// 获取登录二维码url
export const getLoginQRCode = () => {
  return getNoAuthRequest<IData<string>>("/auth/getLoginQRCode")
}

// 检查二维码状态
export const checkQRStatus = (checkToken: string) => {
  return getNoAuthRequest<IData<ICheckQRStatusRes>>(
    `/auth/checkQRStatus/${checkToken}`
  )
}

// 登陆
export const loginReq = (params: ILoginParam) => {
  return postNoAuthRequest<IData<string>>("/auth/login", params)
}

// 发送短信验证码
export const sendSms = (params: ISmsParam, type: number) => {
  let url = "/common/captcha/"
  if (type === 1) {
    // 登录验证码
    url += `sendLoginSms/${params.mobile}`
  } else if (type === 2) {
    // 注册验证码
    url += `sendRegistSms/${params.mobile}`
  }
  return getNoAuthRequest<IData<string>>(url, {
    captchaId: params.captchaId,
    code: params.code
  })
}

// 短信验证码登录
export const smsLogin = (params: ILoginParam) => {
  return postNoAuthRequest<IData<string>>("/auth/smsLogin", params)
}

// 注册
export const registerReq = (params: IRegisterParam) => {
  return postNoAuthRequest<IData<object>>("/auth/register", params)
}

// 获取用户登录信息
export const userInfo = () => {
  return getRequest<IData<IUserInfoRes>>("/user/info", null)
}

// 获取菜单信息
export const getMenuList = () => {
  return getRequest<IData<IMenuListRes[]>>("/permission/getMenuList", null)
}

// 获取vaptcha配置
export const getOtherSet = () => {
  return getRequest<IData<IOtherSetRes>>("/setting/other", null)
}
