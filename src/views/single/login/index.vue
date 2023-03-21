<template>
  <div class="login">
    <a-row
      type="flex"
      justify="center"
      align="middle"
      @keydown.enter="submitLogin"
      style="height: 100%"
    >
      <a-col class="layout">
        <div>
          <Header></Header>
          <div style="position: relative">
            <a-tabs v-model:activeKey="tabKey" :animated="true" size="large">
              <a-tab-pane key="1">
                <template #tab>
                  <span>
                    <user-outlined />
                    {{ $t("usernameLogin") }}
                  </span>
                </template>
                <a-form class="form">
                  <a-form-item
                    name="username"
                    hasFeedback
                    v-bind="validateInfosAcc.username"
                  >
                    <a-input
                      :placeholder="$t('userPlaceholder')"
                      v-model:value="accLoginModel.username"
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
                    v-bind="validateInfosAcc.password"
                  >
                    <a-input-password
                      :placeholder="$t('pwdPlaceholder')"
                      v-model:value="accLoginModel.password"
                      size="large"
                    >
                      <template #prefix>
                        <lock-outlined />
                      </template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item name="imgCode" v-bind="validateInfosAcc.code">
                    <a-row
                      type="flex"
                      justify="space-between"
                      style="align-items: center; overflow: hidden"
                    >
                      <a-input
                        v-model:value="accLoginModel.code"
                        size="large"
                        allowClear
                        autocomplete="off"
                        :placeholder="$t('codePlaceholder')"
                        :maxlength="10"
                        class="input-verify"
                      />
                      <div
                        class="code-image"
                        style="position: relative; font-size: 12px"
                      >
                        <a-spin v-if="loadingCaptcha"></a-spin>
                        <img
                          :src="captchaImg"
                          :alt="$t('codeInitError')"
                          @click="getCaptchaImg"
                          style="
                            width: 110px;
                            height: 32px;
                            line-height: 32px;
                            cursor: pointer;
                            display: block;
                          "
                        />
                      </div>
                    </a-row>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #tab>
                  <span>
                    <phone-outlined />
                    {{ $t("mobileLogin") }}
                  </span>
                </template>
                <a-form class="form">
                  <a-form-item name="mobile" v-bind="validateInfosMob.mobile">
                    <a-input
                      :placeholder="$t('phonePlaceholder')"
                      v-model:value="mobLoginModel.mobile"
                      size="large"
                      allowClear
                    >
                      <template #prefix>
                        <phone-outlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item name="code" v-bind="validateInfosMob.code">
                    <a-row type="flex" justify="space-between">
                      <a-input
                        v-model:value="mobLoginModel.code"
                        size="large"
                        allowClear
                        :placeholder="$t('smsPlaceholder')"
                        :maxlength="6"
                        class="input-verify"
                      >
                        <template #prefix>
                          <mail-outlined />
                        </template>
                      </a-input>
                      <CountDownButton
                        ref="countDown"
                        @on-click="sendSmsCode"
                        :autoCountDown="autoCountDown"
                        size="large"
                        :loading="sending"
                        :text="getSms"
                      />
                    </a-row>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>
            <a-tooltip @click="toQrCodeLogin" placement="rightTop">
              <template #title>
                <span>{{ $t("qrCodeTip") }}</span>
              </template>
              <qrcode-outlined />
            </a-tooltip>

            <a-row type="flex" justify="space-between" align="middle">
              <a-checkbox v-model:checked="saveLogin" size="large">{{
                $t("autoLogin")
              }}</a-checkbox>
              <a-dropdown :trigger="['click']" @on-click="handleDropDown">
                <a class="forget-pass">{{ $t("forgetPass") }}</a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item name="resetByMobile">{{
                      $t("phoneResetPwd")
                    }}</a-menu-item>
                    <a-menu-item name="resetByEmail">{{
                      $t("emailResetPwd")
                    }}</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-row>
            <a-row>
              <a-button
                class="login-btn"
                type="primary"
                size="large"
                :loading="loading"
                @click="submitLogin"
                long
              >
                <span v-if="!loading">{{ $t("login") }}</span>
                <span v-else>{{ $t("logining") }}</span>
              </a-button>
            </a-row>
            <a-row type="flex" justify="space-between" class="other-login">
              <div class="other-way icons">
                {{ $t("otherLogin") }}
                <div class="other-icon" @click="toGithubLogin">
                  <github-outlined />
                </div>
                <div class="other-icon" @click="toQQLogin">
                  <qq-outlined />
                </div>
                <div class="other-icon" @click="toWeixinLogin">
                  <wechat-outlined />
                </div>
                <down-outlined
                  v-show="!showMore"
                  class="other-icon"
                  @click="showMore = true"
                />
                <div class="other-icon" v-show="showMore" @click="toWeiboLogin">
                  <weibo-outlined />
                </div>
                <div
                  class="other-icon"
                  v-show="showMore"
                  @click="toDingdingLogin"
                >
                  <dingding-outlined />
                </div>
                <up-outlined
                  v-show="showMore"
                  class="other-icon"
                  @click="showMore = false"
                />
              </div>
              <router-link to="/register">
                <a class="forget-pass">{{ $t("register") }}</a>
              </router-link>
            </a-row>
          </div>
        </div>
        <Footer></Footer>
      </a-col>
      <LangSwitch />
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import { Modal } from "ant-design-vue"
import {
  UserOutlined,
  PhoneOutlined,
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  DownOutlined,
  WeiboOutlined,
  DingdingOutlined,
  UpOutlined,
  LockOutlined,
  MailOutlined,
  QrcodeOutlined
} from "@ant-design/icons-vue"
import { getSms } from "@/utils/langs"
import useNotice from "./useNotice"
import useCaptchaImg from "@/hooks/useCaptchaImg"
import useAccountLogin from "./useAccountLogin"
import usePhoneLogin from "./usePhoneLogin"
import useAfterLogin from "../hooks/useAfterLogin"

onMounted(() => {
  relatedLogin()
  getNoticeInfo()
  getCaptchaImg()
})
const $router = useRouter()
const instance = getCurrentInstance()

// UI
const showMore = ref(false)
const saveLogin = ref(true)
const tabKey = ref("1")
const loading = ref(false)

// 生成通知提醒框
const { getNoticeInfo } = useNotice()

// 生成验证码
const { loadingCaptcha, captchaImg, captchaId, getCaptchaImg } = useCaptchaImg()

// 账户密码登录
const { accLoginModel, validateInfosAcc, loginByAccount } =
  useAccountLogin(getCaptchaImg)

// 手机验证码登录
const {
  mobLoginModel,
  validateInfosMob,
  sending,
  autoCountDown,
  sendSmsCode,
  loginByPhone
} = usePhoneLogin()

// 登录
const submitLogin = async () => {
  loading.value = true
  let accessToken = null
  if (tabKey.value === "1") {
    // 账号密码登录
    accessToken = await loginByAccount(saveLogin.value, captchaId.value)
  } else {
    // 手机验证码登录
    accessToken = await loginByPhone(saveLogin.value)
  }
  if (accessToken) {
    const { afterLogin } = useAfterLogin(instance)
    await afterLogin(accessToken, saveLogin.value)
  }
  loading.value = false
}

// 二维码登录
const toQrCodeLogin = () => {
  $router.push("/login-qr")
}

// 未实现
const toGithubLogin = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const toQQLogin = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const toWeiboLogin = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const toWeixinLogin = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const toDingdingLogin = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const handleDropDown = () => {
  Modal.info({
    title: "抱歉，请获取完整版",
    content: "支付链接: http://xpay.exrick.cn/pay?xboot"
  })
}
const relatedLogin = () => {}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background: url("@/assets/background.svg");
  background-color: #f0f2f5;

  :deep(.ant-tabs-nav-wrap) {
    line-height: 2;
    font-size: 17px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    zoom: 1;
  }

  .form {
    padding-top: 1vh;

    .input-verify {
      width: 67%;
    }
  }

  .code-image {
    height: 32px;
    :deep(.ant-spin-spinning) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 8;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      .ant-spin-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        font-size: 17px;
      }
    }
  }

  .forget-pass,
  .other-way {
    font-size: 14px;
  }

  .login-btn,
  .other-login {
    margin-top: 3vh;
  }

  .icons {
    display: flex;
    align-items: center;
  }

  .other-icon {
    cursor: pointer;
    margin-left: 8px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.2);

    :hover {
      color: #2d8cf0;
    }
  }

  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 368px;
    height: 100%;

    :deep(.ant-tabs) {
      .ant-tabs-nav-wrap {
        display: block;
        .ant-tabs-nav-list {
          width: 90%;
          .ant-tabs-tab {
            flex: 1;
            font-size: 17px;
            .ant-tabs-tab-btn {
              margin: 0 auto;
            }
          }
        }
      }
      .ant-tabs-content {
        transition: margin 0.5s;
        .ant-input {
          padding-left: 15px;
        }
        #form_item_imgCode {
          padding-left: 0;
        }
      }
    }

    :deep(.anticon-qrcode) {
      position: absolute;
      top: 18px;
      right: 0;
      font-size: 34px;
      color: #1da57a;
      cursor: pointer;
      transition: all 0.3s ease 0.1s;

      &:hover {
        transform: scale(1.5);
        svg {
          clip-path: none;
          // clip-path: polygon(-85% 0%, 0% -100%, 200% 100%, 0% 100%);
        }
      }
      svg {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
      }
    }
  }
}
</style>
