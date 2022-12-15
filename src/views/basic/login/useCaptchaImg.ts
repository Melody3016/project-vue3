import { ref } from "vue"
import { initCaptcha, drawCodeImage } from "@/api/index"

export default () => {
  const loadingCaptcha = ref(true)
  const captchaImg = ref("")
  const captchaId = ref("")
  const getCaptchaImg = async () => {
    try {
      // 获取验证码
      loadingCaptcha.value = true
      const res = await initCaptcha()
      loadingCaptcha.value = false
      if (res.result) {
        captchaId.value = res.result
        captchaImg.value = drawCodeImage + captchaId.value
      }
    } catch (e) {
      console.log(e, "error")
    }
  }
  return {
    loadingCaptcha,
    captchaImg,
    captchaId,
    getCaptchaImg
  }
}
