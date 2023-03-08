import { reactive } from "vue"
import { Form, message as Message } from "ant-design-vue"
import type { Rule } from "ant-design-vue/es/form"
import { validateMobile } from "@/libs/validate"
import { codeRuleEmpty } from "@/utils/langs"
import { smsLogin } from "@/api"
import utils from "@/utils/utils"
import useSendSms from "@/hooks/useSendSms"

const useForm = Form.useForm
// 手机验证码登录
interface MobLoginState {
  mobile: string
  code: string
}
export default () => {
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

  // 发送验证码
  const { sending, autoCountDown, onSendSmsCode } = useSendSms()

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
    const res = await onSendSmsCode({ mobile }, 1)
    if (res) {
      Message.success("验证码发送成功！")
      return res
    }
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
    validateInfosMob,
    sending,
    autoCountDown,
    sendSmsCode,
    loginByPhone
  }
}
