import { reactive } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { Form, message as Message } from "ant-design-vue"
import { userRuleEmpty, pwdRuleEmpty, codeRuleEmpty } from "@/utils/langs"
import { loginReq } from "@/api"
import utils from "@/utils/utils"

const useForm = Form.useForm
// 账户密码登录
interface AccLoginState {
  username: string
  password: string
  code: string
}
export default (cb: Function) => {
  const accLoginModel = reactive<AccLoginState>({
    username: "",
    password: "",
    code: ""
  })
  const accLoginRules: Record<string, Rule[]> = reactive({
    username: [
      {
        required: true,
        message: userRuleEmpty.value,
        trigger: "change"
      }
    ],
    password: [
      {
        required: true,
        message: pwdRuleEmpty.value,
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
    validateInfos: validateInfosAcc
  } = useForm(accLoginModel, accLoginRules, {
    // onValidate: (...args) => console.log(...args)
  })

  const loginByAccount = async (saveLogin: boolean, captchaId: string) => {
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
      captchaId,
      saveLogin
    }
    const [error, loginRes] = await utils.awaitWrap(loginReq(params))
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
      if (loginRes.result === null) {
        resetFields({
          username: accLoginModel.username
        })
        cb()
      } else {
        accLoginModel.code = ""
        cb()
      }
    }
  }

  return {
    accLoginModel,
    accLoginRules,
    validateInfosAcc,
    loginByAccount
  }
}
