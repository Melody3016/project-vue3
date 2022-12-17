import { ref, reactive } from "vue"
import { Form, message as Message } from "ant-design-vue"
import type { Rule } from "ant-design-vue/es/form"
import { validateMobile } from "@/libs/validate"
import { codeRuleEmpty } from "@/utils/langs"
import { smsLogin, sendLoginSms } from "@/api"
import utils from "@/utils/utils"

const useForm = Form.useForm
// 手机验证码登录
interface MobLoginState {
  mobile: string
  code: string
}
export default () => {
  const sending = ref(false)
  const autoCountDown = ref(false)
  const mobLoginModel = reactive<MobLoginState>({
    mobile: "",
    code: ""
  })
  const mobLoginRules: Record<string, Rule[]> = reactive({
    mobile: [
      {
        required: true,
        validator: validateMobile,
        trigger: "change"
      }
    ],
    code: [
      {
        required: true,
        message: codeRuleEmpty.value,
        trigger: "change"
      }
    ]
  })
  const {
    validate,
    resetFields,
    validateInfos: validateInfosMob
  } = useForm(mobLoginModel, mobLoginRules, {
    // onValidate: (...args) => console.log(...args)
  })

  const sendSmsCode = async () => {
    // 校验
    const [validateErr, validateRes] = await utils.awaitWrap(
      validate<ILoginParam>("mobile")
    )
    // 错误处理
    if (validateErr) {
      Message.error("请填写手机号码！")
      return
    }
    const mobile = validateRes?.mobile || ""
    // 请求发送验证码
    sending.value = true
    const [smsErr, smsRes] = await utils.awaitWrap(sendLoginSms(mobile))
    if (smsErr) {
      sending.value = false
      return
    }
    // 成功
    if (smsRes?.success) {
      autoCountDown.value = true
      Message.success("验证码发送成功！")
    }
    sending.value = false
    return smsRes?.result
  }

  const loginByPhone = async (saveLogin: boolean) => {
    // 校验
    const [validateErr, validateRes] = await utils.awaitWrap(
      validate<ILoginParam>()
    )
    // 错误处理
    if (validateErr) {
      Message.error("请填写完整！")
      return
    }
    if (!validateRes) return
    // 登录
    const params = {
      ...validateRes,
      saveLogin
    }
    const [error, loginRes] = await utils.awaitWrap(smsLogin(params))
    if (error) {
      // 错误处理
      resetFields()
      return
    }
    if (!loginRes) return
    if (loginRes.success) {
      // 返回token
      return loginRes.result
    } else {
      mobLoginModel.code = ""
    }
  }

  return {
    mobLoginModel,
    mobLoginRules,
    validateInfosMob,
    sending,
    autoCountDown,
    sendSmsCode,
    loginByPhone
  }
}
