import { ref } from "vue"
import utils from "@/utils/utils"
import { initCaptcha, drawCodeImage } from "@/api/index"

export default () => {
  const loadingCaptcha = ref(true)
  const captchaImg = ref("")
  const captchaId = ref("")
  const getCaptchaImg = async () => {
    // 获取验证码
    loadingCaptcha.value = true
    const [err, res] = await utils.awaitWrap(initCaptcha())
    if (err) {
      loadingCaptcha.value = false
      return
    }
    loadingCaptcha.value = false
    if (res?.result) {
      captchaId.value = res.result
      captchaImg.value = drawCodeImage + captchaId.value
    }
  }
  return {
    loadingCaptcha,
    captchaImg,
    captchaId,
    getCaptchaImg
  }
}
