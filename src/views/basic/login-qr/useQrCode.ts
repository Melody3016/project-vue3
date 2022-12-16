import { ref } from "vue"
import QRCode from "qrcode"
import { message as Message } from "ant-design-vue"
import { getLoginQRCode, checkQRStatus } from "@/api"

// 二维码功能
export default () => {
  const qrUrl = ref("")
  const qrStatus = ref("0")
  // 定时器标识
  let intervalID: any = 0

  // 生成二维码图片
  const generateQR = (text: string) => {
    try {
      return QRCode.toDataURL(text, { margin: 0 })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // 轮询查询二维码状态
  const checkLoginQRStatus = (token: string) => {
    // 定时器存在则先清除
    if (intervalID) {
      clearInterval(intervalID)
    }
    intervalID = setInterval(async () => {
      // 查询二维码状态
      const res = await checkQRStatus(token)
      if (!res.success) return
      qrStatus.value = res.result?.status || "0"
      if (qrStatus.value < "0") {
        clearInterval(intervalID)
      }
      if (qrStatus.value == "2") {
        const accessToken = res.result?.accessToken
        console.log(accessToken, "accessToken")
        Message.success("扫码登录成功")
        // this.setStore("accessToken", accessToken)
        // this.afterLogin(accessToken)
      }
    }, 3000)
  }

  const getQRCode = async () => {
    try {
      // 获取二维码url
      const res = await getLoginQRCode()
      const success = res.success
      if (!success) return
      const url = res.result
      if (!url) return
      // 获取url中的checkToken
      const checkToken = url.substring(url.indexOf("=") + 1, url.length)
      // 将url转为二维码图片
      qrUrl.value = await generateQR(url)
      qrStatus.value = "0"
      // 进行轮询
      checkLoginQRStatus(checkToken)
    } catch (err) {
      console.log(err, "useQrCode.ts")
      Message.error("加载验证码失败！")
      qrStatus.value = "-3"
    }
  }

  return {
    qrUrl,
    qrStatus,
    getQRCode
  }
}
