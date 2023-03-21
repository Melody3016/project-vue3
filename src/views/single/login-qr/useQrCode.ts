import { ref } from "vue"
import QRCode from "qrcode"
import { message as Message } from "ant-design-vue"
import { getLoginQRCode, checkQRStatus } from "@/api"
import utils from "@/utils/utils"

// 二维码功能
export default () => {
  const qrUrl = ref("")
  const qrStatus = ref("0")
  // 定时器标识
  const checkQRId = ref(0)

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
    if (checkQRId.value) {
      window.clearInterval(checkQRId.value)
    }
    checkQRId.value = window.setInterval(async () => {
      // 查询二维码状态
      const [err, res] = await utils.awaitWrap(checkQRStatus(token))
      if (err) return
      if (!res?.success) return
      qrStatus.value = res.result?.status || "0"
      if (qrStatus.value < "0") {
        window.clearInterval(checkQRId.value)
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
    // 获取二维码url
    const [err, res] = await utils.awaitWrap(getLoginQRCode())
    if (err) {
      console.log(err, "useQrCode.ts")
      Message.error("加载验证码失败！")
      qrStatus.value = "-3"
      return
    }
    const success = res?.success
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
  }

  return {
    qrUrl,
    qrStatus,
    checkQRId,
    getQRCode
  }
}
