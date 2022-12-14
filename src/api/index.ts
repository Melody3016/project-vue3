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
  return getNoAuthRequest<INoticeRes>("/setting/notice")
}

// 获取验证码
export const initCaptcha = () => {
  return getNoAuthRequest<string>("/common/captcha/init")
}

// 登陆
export const loginReq = (params: ILoginParam) => {
  return postNoAuthRequest("/login", params)
}
