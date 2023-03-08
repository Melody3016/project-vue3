import { reactive } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { Form, message as Message } from "ant-design-vue"
import {
  validateMobile,
  validatePassword,
  validateEmail
} from "@/libs/validate"
import { userRuleEmpty, codeRuleEmpty } from "@/utils/langs"
import { registerReq } from "@/api"
import utils from "@/utils/utils"
import useSendSms from "@/hooks/useSendSms"

const useForm = Form.useForm
// 注册
interface modelRefState {
  username: string
  email: string
  password: string
  password2: string
  mobile: string
  code: string
  passStrength: string
}
export default () => {
  const modelRef = reactive<modelRefState>({
    username: "",
    email: "",
    password: "",
    password2: "",
    mobile: "",
    code: "",
    passStrength: "无"
  })
  const rules: Record<string, Rule[]> = reactive({
    username: [
      {
        required: true,
        message: userRuleEmpty.value,
        trigger: "change"
      }
    ],
    email: [
      {
        required: true,
        validator: validateEmail,
        trigger: "change"
      }
    ],
    password: [
      {
        required: true,
        validator: validatePassword,
        trigger: "change"
      }
    ],
    password2: [
      {
        required: true,
        validator: (rule: Rule, value: string) => {
          if (value !== modelRef.password) {
            return Promise.reject("两次输入的密码不一致！")
          } else {
            return Promise.resolve()
          }
        },
        trigger: "change"
      }
    ],
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
  const { validate, resetFields, validateInfos } = useForm(modelRef, rules, {
    // onValidate: (...args) => console.log(...args)
  })

  // 发送验证码
  const { sending, autoCountDown, onSendSmsCode } = useSendSms()

  // 校验手机
  const onValMobile = async () => {
    // 校验
    const [validateErr, validateRes] = await utils.awaitWrap(
      validate<IRegisterParam>("mobile")
    )
    // 错误处理
    if (validateErr) {
      Message.error("请填写正确的手机号码！")
      return
    }
    return validateRes?.mobile
  }

  const sendSmsCode = async (captchaId: string, code: string) => {
    const mobile = (await onValMobile()) || ""
    // 请求发送验证码
    const res = await onSendSmsCode({ mobile, captchaId, code }, 2)
    if (res) {
      Message.success("验证码发送成功！")
      return res
    }
  }

  const onRegister = async () => {
    // 校验
    const [validateErr, validateRes] = await utils.awaitWrap(
      validate<IRegisterParam>()
    )
    // 错误处理
    if (validateErr) {
      Message.error("请填写完整！")
      return false
    }
    if (!validateRes) return false
    // 注册参数
    const params = {
      ...modelRef
    }
    const [error, registerRes] = await utils.awaitWrap(registerReq(params))
    if (error) {
      // 错误处理
      resetFields()
      return false
    }
    if (!registerRes) return false
    if (registerRes.success) {
      Message.success("注册成功！")
      return true
    } else {
      return false
    }
  }

  return {
    sending,
    autoCountDown,
    modelRef,
    validateInfos,
    sendSmsCode,
    onValMobile,
    onRegister
  }
}
