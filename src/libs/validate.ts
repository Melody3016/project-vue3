import type { Rule } from "ant-design-vue/es/form"
import {
  userRuleLen,
  userRuleType,
  pwdRuleLen,
  phoneRuleEmpty,
  phoneRuleType,
  idCardRuleType
} from "@/utils/langs"

/**
 * 用户名
 * @param rule 验证规则（不含特殊字符）
 * @param value 需要验证的值
 */
export const validateUsername = (rule: Rule, value: string) => {
  const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/
  if (value.length > 16) {
    return Promise.reject(userRuleLen.value)
  } else if (!reg.test(value)) {
    return Promise.reject(userRuleType.value)
  } else {
    return Promise.resolve()
  }
}

/**
 * 密码格式验证
 * @param rule 验证规则（不少于6位）
 * @param value 需要验证的值
 */
export const validatePassword = (rule: Rule, value: string) => {
  if (value.length < 6) {
    return Promise.reject(pwdRuleLen.value)
  } else {
    return Promise.resolve()
  }
}

/**
 * 手机号码格式验证
 * @param rule 验证规则
 * @param value 需要验证的值
 */
export const validateMobile = (rule: Rule, value: string) => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!value) {
    return Promise.reject(phoneRuleEmpty.value)
  } else if (!reg.test(value)) {
    return Promise.reject(phoneRuleType.value)
  } else {
    return Promise.resolve()
  }
}

/**
 * 身份证号码格式验证
 * @param rule 验证规则（是否满足18位）
 * @param value 需要验证的值
 */
export const validateIDCard = (rule: Rule, value: string) => {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!reg.test(value)) {
    return Promise.reject(idCardRuleType.value)
  } else {
    return Promise.resolve()
  }
}
