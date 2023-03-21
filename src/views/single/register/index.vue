<template>
  <div class="register">
    <a-row
      type="flex"
      justify="center"
      align="middle"
      @keydown.enter="submitRegister"
      style="height: 100%"
    >
      <a-col class="layout">
        <div>
          <Header></Header>
          <div style="position: relative">
            <a-form class="form">
              <a-form-item
                name="username"
                hasFeedback
                v-bind="validateInfos.username"
              >
                <a-input
                  :placeholder="$t('userPlaceholder')"
                  v-model:value="modelRef.username"
                  size="large"
                  autocomplete="off"
                  allowClear
                >
                  <template #prefix>
                    <user-outlined type="user" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="password"
                hasFeedback
                v-bind="validateInfos.password"
              >
                <a-popover
                  placement="right"
                  trigger="focus"
                  :overlayStyle="{ width: '220px' }"
                >
                  <template #content>
                    <p :style="{ color: strokeColor }">
                      强度：{{ modelRef.passStrength }}
                    </p>
                    <p>
                      <a-progress
                        :percent="percent"
                        :show-info="false"
                        :status="progressStatus"
                      />
                    </p>
                    <p>请至少输入6个字符。请不要使用容易被猜到的密码。</p>
                  </template>
                  <a-input-password
                    :placeholder="$t('pwdPlaceholder')"
                    v-model:value="modelRef.password"
                    size="large"
                    @change="pwdChange"
                  >
                    <template #prefix>
                      <lock-outlined />
                    </template>
                  </a-input-password>
                </a-popover>
              </a-form-item>
              <a-form-item
                name="password2"
                hasFeedback
                v-bind="validateInfos.password2"
              >
                <a-input-password
                  placeholder="请再次输入密码"
                  v-model:value="modelRef.password2"
                  size="large"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item
                name="email"
                hasFeedback
                v-bind="validateInfos.email"
              >
                <a-input
                  :placeholder="$t('emailPlaceholder')"
                  v-model:value="modelRef.email"
                  size="large"
                >
                  <template #prefix>
                    <mail-outlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-input-group compact>
                <a-select v-model:value="areaCode">
                  <a-select-option value="1">+86</a-select-option>
                </a-select>
                <a-form-item
                  name="mobil"
                  hasFeedback
                  v-bind="validateInfos.mobile"
                >
                  <a-input
                    :placeholder="$t('phonePlaceholder')"
                    v-model:value="modelRef.mobile"
                    size="large"
                  >
                  </a-input>
                </a-form-item>
              </a-input-group>
              <a-form-item name="code" v-bind="validateInfos.code">
                <a-row type="flex" justify="space-between">
                  <a-input
                    v-model:value="modelRef.code"
                    size="large"
                    allowClear
                    :placeholder="$t('smsPlaceholder')"
                    :maxlength="6"
                    style="width: 67%; padding-left: 0"
                  >
                  </a-input>
                  <CountDownButton
                    ref="countDown"
                    @on-click="handleClick"
                    :autoCountDown="autoCountDown"
                    size="large"
                    :loading="sending"
                    :text="getSms"
                  />
                </a-row>
              </a-form-item>
            </a-form>
            <a-row type="flex" justify="space-between">
              <a-button
                type="primary"
                size="large"
                :loading="loading"
                @click="submitRegister"
                long
                style="width: 50%"
              >
                <span v-if="!loading">{{ $t("register") }}</span>
                <span v-else>{{ $t("registering") }}</span>
              </a-button>
              <router-link to="/login">
                <a class="forget-pass">{{ $t("loginNow") }}</a>
              </router-link>
            </a-row>
          </div>
        </div>
        <Footer></Footer>
      </a-col>
      <LangSwitch />
    </a-row>
    <a-modal
      v-model:visible="slideVisible"
      title="滑动验证"
      :footer="null"
      :width="400"
      :destroyOnClose="true"
    >
      <SlideVerify :on-success="handleSuccess"></SlideVerify>
    </a-modal>
    <a-modal
      v-model:visible="visible"
      title="验证"
      :destroyOnClose="true"
      @ok="handleOk"
    >
      <ImgCaptcha ref="captcha" @change="captchaChange"></ImgCaptcha>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { message as Message } from "ant-design-vue"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons-vue"
import type { ChangeEvent } from "ant-design-vue/es/_util/EventInterface"
import SlideVerify from "@/components/common/slideverify.vue"
import { getSms } from "@/utils/langs"
import useRegister from "./useRegister"

const instance = getCurrentInstance()
const areaCode = ref("1")
// UI
const loading = ref(false)

// 密码强度显示
const percent = ref(0)
const progressStatus = ref<
  "exception" | "success" | "normal" | "active" | undefined
>("exception")
const strokeColor = ref("#ed3f14")
const checkStrengthValue = (v: string) => {
  // 评级制判断密码强度 最高5
  let grade = 0
  if (/\d/.test(v)) {
    grade++ //数字
  }
  if (/[a-z]/.test(v)) {
    grade++ //小写
  }
  if (/[A-Z]/.test(v)) {
    grade++ //大写
  }
  if (/\W/.test(v)) {
    grade++ //特殊字符
  }
  if (v.length >= 10) {
    grade++
  }
  return grade
}
const pwdChange = (e: ChangeEvent) => {
  // 强度判断
  // console.log(e.target.value)
  const v = e.target.value
  if (!v) return
  const grade = checkStrengthValue(v)
  if (grade <= 1) {
    progressStatus.value = "exception"
    modelRef.passStrength = "弱"
    percent.value = 33
    strokeColor.value = "#ed3f14"
  } else if (grade >= 2 && grade <= 4) {
    progressStatus.value = "normal"
    modelRef.passStrength = "中"
    percent.value = 66
    strokeColor.value = "#2d8cf0"
  } else {
    progressStatus.value = "success"
    modelRef.passStrength = "强"
    percent.value = 100
    strokeColor.value = "#52c41a"
  }
}

// 滑块验证
const slideVisible = ref(false)
const handleSuccess = () => {
  setTimeout(async () => {
    slideVisible.value = false
    visible.value = true
  }, 1000)
}

// 验证码功能
const visible = ref(false)
let code = ""
let captchaId = ""
const captchaChange = (a: string, b: string) => {
  code = a
  captchaId = b
}

// 点击按钮
const handleClick = async () => {
  // 验证手机号
  const res = await onValMobile()
  if (!res) return
  slideVisible.value = true
}
const handleOk = async () => {
  if (!code) {
    Message.error("请填写验证码")
    return
  }
  // 验证验证码
  visible.value = false
  const res = await sendSmsCode(captchaId, code)
  console.log("验证验证码", res)
}

// 注册功能hook
const {
  sending,
  autoCountDown,
  modelRef,
  validateInfos,
  sendSmsCode,
  onValMobile,
  onRegister
} = useRegister()

// 点击注册
const submitRegister = async () => {
  const success = await onRegister()
  if (success) {
    // 跳转到注册成功页面
    console.log("跳转到注册成功页面")
    instance?.proxy?.$router.push({
      path: "/register-result",
      query: {
        username: modelRef.username
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.register {
  position: relative;
  height: 100%;
  background: url("@/assets/background.svg");
  background-color: #f0f2f5;

  :deep(.ant-input) {
    padding-left: 15px;
  }

  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 368px;
    height: 100%;
  }
}
</style>
