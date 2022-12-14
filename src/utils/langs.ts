import { computed } from "vue"
import i18n from "@/locale"

export const listStyle = computed(() => i18n.global.t("listStyle"))
export const getSms = computed(() => i18n.global.t("getSms"))
export const userRuleEmpty = computed(() => i18n.global.t("userRuleEmpty"))
export const pwdRuleEmpty = computed(() => i18n.global.t("pwdRuleEmpty"))
export const codeRuleEmpty = computed(() => i18n.global.t("codeRuleEmpty"))
export const userRuleLen = computed(() => i18n.global.t("userRuleLen"))
export const userRuleType = computed(() => i18n.global.t("userRuleType"))
export const pwdRuleLen = computed(() => i18n.global.t("pwdRuleLen"))
export const phoneRuleEmpty = computed(() => i18n.global.t("phoneRuleEmpty"))
export const phoneRuleType = computed(() => i18n.global.t("phoneRuleType"))
export const idCardRuleType = computed(() => i18n.global.t("idCardRuleType"))
export const suffixText = computed(() => i18n.global.t("suffixText"))
export const submitText = computed(() => i18n.global.t("submitText"))
