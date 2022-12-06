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
          <div>
            <a-tabs v-model:activeKey="tabKey">
              <a-tab-pane key="1">
                <template #tab>
                  <span>
                    <user-outlined />
                    {{ $t('usernameLogin') }}
                  </span>
                </template>
                <a-form
                  ref="usernameLoginForm"
                  :model="form"
                  :rules="rules"
                  class="form"
                >
                  <a-form-item name="username">
                    <a-input
                      v-model="form.username"
                      size="large"
                      clearable
                      placeholder="请输入用户名"
                      autocomplete="off"
                    >
                      <template #prefix>
                        <user-outlined type="user" />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item name="password">
                    <a-input-password
                      v-model="form.password"
                      size="large"
                      placeholder="请输入密码"
                      autocomplete="off"
                    >
                      <template #prefix>
                        <lock-outlined />
                      </template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item name="imgCode">
                    <a-row
                      type="flex"
                      justify="space-between"
                      style="align-items: center; overflow: hidden"
                    >
                      <a-input
                        v-model="form.imgCode"
                        size="large"
                        clearable
                        placeholder="请输入图片验证码"
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
                          @click="getCaptchaImg"
                          alt="加载验证码失败"
                          style="width: 110px; cursor: pointer; display: block"
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
                    {{ $t('mobileLogin') }}
                  </span>
                </template>
                <a-form
                  ref="mobileLoginForm"
                  :model="form"
                  :rules="rules"
                  class="form"
                >
                  <a-form-item name="mobile">
                    <a-input
                      v-model="form.mobile"
                      size="large"
                      clearable
                      placeholder="请输入手机号"
                    >
                      <template #prefix>
                        <phone-outlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item name="code" :error="errorCode">
                    <a-row type="flex" justify="space-between">
                      <a-input
                        v-model="form.code"
                        size="large"
                        clearable
                        placeholder="请输入短信验证码"
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
                        :autoCountDown="false"
                        size="large"
                        :loading="sending"
                        :text="getSms"
                      />
                    </a-row>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>

            <a-row type="flex" justify="space-between" align="middle">
              <a-checkbox v-model="saveLogin" size="large">{{
                $t("autoLogin")
              }}</a-checkbox>
              <a-dropdown :trigger="['click']" @on-click="handleDropDown">
                <a class="forget-pass">{{ $t("forgetPass") }}</a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item name="resetByMobile"
                      >使用手机号重置密码(付费)</a-menu-item
                    >
                    <a-menu-item name="resetByEmail"
                      >使用邮箱重置密码(付费)</a-menu-item
                    >
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
                  v-show="!showMore"
                  class="other-icon"
                  @click="showMore = true"
                />
              </div>
              <router-link to="/regist">
                <a class="forget-pass">{{ $t("regist") }}</a>
              </router-link>
            </a-row>
          </div>
        </div>
        <Footer></Footer>
      </a-col>
      <!-- <LangSwitch /> -->
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import type { FormInstance } from "ant-design-vue"
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
  MailOutlined
} from "@ant-design/icons-vue"
import CountDownButton from "@/components/xboot/count-down-button.vue"
import Header from "@/components/common/header.vue"
import Footer from "@/components/common/footer.vue"
import { validateMobile } from "@/libs/validate"
interface FormState {
  username: string
  password: string
  mobile: string
  code: string
  imgCode: string
}

const mobileLoginForm = ref<FormInstance>()
const { t } = useI18n() // use as global scope
const showMore = ref(false)
const captchaId = ref("")
const captchaImg = ref("")
const loadingCaptcha = ref(true)
const error = ref(false)
const tabKey = ref("1")
const saveLogin = ref(true)
const getSms = ref("获取验证码")
const loading = ref(false)
const sending = ref(false)
const errorCode = ref("")
const form = reactive<FormState>({
  username: "admin、test、test2（支持邮箱/手机登录）",
  password: "123456",
  mobile: "",
  code: "",
  imgCode: ""
})
const rules = reactive({
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "change"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "change"
    }
  ],
  imgCode: [
    {
      required: true,
      message: "验证码不能为空",
      trigger: "change"
    }
  ],
  mobile: [
    {
      required: true,
      message: "手机号不能为空",
      trigger: "change"
    },
    {
      validator: validateMobile,
      trigger: "change"
    }
  ]
})
const getCaptchaImg = () => {
  loadingCaptcha.value = true
  // 获取验证码
  // initCaptcha().then((res) => {
  //   this.loadingCaptcha = false;
  //   if (res.success) {
  //     this.captchaId = res.result;
  //     this.captchaImg = drawCodeImage + this.captchaId;
  //   }
  // });
}
const sendSmsCode = () => {
  // 发送短信验证码
}
const submitLogin = () => {
  // if (tabName.value === "username") {
  //   this.$refs.usernameLoginForm.validate((valid) => {
  //     if (valid) {
  //       this.loading = true;
  //       /* login({
  //         username: this.form.username,
  //         password: this.form.password,
  //         code: this.form.imgCode,
  //         captchaId: this.captchaId,
  //         saveLogin: this.saveLogin,
  //       }).then((res) => {
  //         if (res.success) {
  //           this.setStore("accessToken", res.result);
  //           // 获取用户信息
  //           userInfo().then((res) => {
  //             if (res.success) {
  //               // 避免超过大小限制
  //               delete res.result.permissions;
  //               let roles = [];
  //               res.result.roles.forEach((e) => {
  //                 roles.push(e.name);
  //               });
  //               delete res.result.roles;
  //               this.setStore("roles", roles);
  //               this.setStore("saveLogin", this.saveLogin);
  //               if (this.saveLogin) {
  //                 // 保存7天
  //                 Cookies.set("userInfo", JSON.stringify(res.result), {
  //                   expires: 7,
  //                 });
  //               } else {
  //                 Cookies.set("userInfo", JSON.stringify(res.result));
  //               }
  //               this.setStore("userInfo", res.result);
  //               this.$store.commit("setUserInfo", res.result);
  //               // 加载菜单
  //               util.initRouter(this);
  //               this.$router.push({
  //                 name: "home_index",
  //               });
  //             } else {
  //               this.loading = false;
  //             }
  //           });
  //         } else {
  //           this.loading = false;
  //           this.getCaptchaImg();
  //         }
  //       }); */
  //       // 模拟登录
  //       /* setTimeout(() => {
  //         // this.setStore("accessToken", res.result);
  //         this.setStore("accessToken", "67c4197ed94249438e4726abcdf609d8");
  //         setTimeout(() => {
  //           const resResult = {
  //             "id": "4363087427670016",
  //             "createBy": "",
  //             "createTime": "2018-05-03 15:09:42",
  //             "updateBy": "test",
  //             "updateTime": "2022-08-19 11:19:52",
  //             "delFlag": 0,
  //             "username": "test",
  //             "password": null,
  //             "nickname": "游客12",
  //             "mobile": "18782059033",
  //             "email": "test@exrick.cn",
  //             "address": "110000,110100,110105",
  //             "street": "1",
  //             "sex": "女",
  //             "passStrength": "弱",
  //             "avatar": "",
  //             "type": 0,
  //             "status": 0,
  //             "description": "233",
  //             "departmentId": "40343262766043136",
  //             "departmentTitle": "成都分部",
  //             "birth": "2021-03-13",
  //             "roles": [
  //               {
  //                 "id": "496138616573953",
  //                 "name": "ROLE_USER",
  //                 "description": null
  //               }
  //             ],
  //             "permissions": [
  //               {
  //                 "title": "编辑已发送消息",
  //                 "path": "/xboot/messageSend/update*"
  //               },
  //               {
  //                 "title": "添加按钮测试",
  //                 "path": "test-add"
  //               },
  //               {
  //                 "title": "编辑按钮测试",
  //                 "path": "test-edit"
  //               },
  //               {
  //                 "title": "删除按钮测试",
  //                 "path": "test-delete"
  //               }
  //             ],
  //             "defaultRole": null
  //           }
  //           // 避免超过大小限制
  //           // delete res.result.permissions;
  //           delete resResult.permissions;
  //           let roles = [];
  //           // res.result.roles.forEach((e) => {
  //           //   roles.push(e.name);
  //           // });
  //           const resRoles = [
  //             {
  //               "id": "496138616573953",
  //               "name": "ROLE_USER",
  //               "description": null
  //             }
  //           ]
  //           resRoles.forEach((e) => {
  //             roles.push(e.name);
  //           });
  //           // delete res.result.roles;
  //           delete resResult.roles;
  //           this.setStore("roles", roles);
  //           this.setStore("saveLogin", this.saveLogin);
  //           if (this.saveLogin) {
  //             // 保存7天
  //             Cookies.set("userInfo", JSON.stringify(resResult), {
  //               expires: 7,
  //             });
  //           } else {
  //             Cookies.set("userInfo", JSON.stringify(resResult));
  //           }
  //           this.setStore("userInfo", resResult);
  //           this.$store.commit("setUserInfo", resResult);
  //           // 加载菜单
  //           util.initRouter(this);
  //           this.$router.push({
  //             name: "home_index",
  //           });
  //         }, 500)
  //       }, 500) */
  //     }
  //   })
  // } else if (this.tabName == "mobile") {
  //   this.$refs.mobileLoginForm.validate((valid) => {
  //     if (valid) {
  //       if (this.form.code == "") {
  //         this.errorCode = "验证码不能为空";
  //         return;
  //       } else {
  //         this.errorCode = "";
  //       }
  //       this.form.saveLogin = this.saveLogin;
  //       this.$Modal.info({
  //         title: "抱歉，请获取完整版",
  //         content: "支付链接: http://xpay.exrick.cn/pay?xboot",
  //       });
  //     }
  //   });
  // }
}
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
const toWorkwechatLogin = () => {
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
onMounted(() => {
  relatedLogin()
  getCaptchaImg()
})
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background: url("@/assets/background.svg");
  background-color: #f0f2f5;

  .ivu-tabs-nav-container {
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
    .ivu-spin-fix .ivu-spin-main {
      height: 20px;
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
  }
}
</style>
