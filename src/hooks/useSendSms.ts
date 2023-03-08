import { ref } from "vue"
import { sendSms } from "@/api"
import utils from "@/utils/utils"

export default () => {
  const sending = ref(false)
  const autoCountDown = ref(false)

  const onSendSmsCode = async (params: ISmsParam, type: number) => {
    // 请求发送验证码
    sending.value = true
    const [smsErr, smsRes] = await utils.awaitWrap(sendSms(params, type))
    if (smsErr) {
      sending.value = false
      return
    }
    // 成功
    sending.value = false
    if (smsRes?.success) {
      autoCountDown.value = true
      return smsRes?.result
    }
  }

  return {
    sending,
    autoCountDown,
    onSendSmsCode
  }
}
