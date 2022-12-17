<template>
  <div class="login">
    <a-row type="flex" justify="center" align="middle" style="height: 100%">
      <a-col class="layout">
        <div>
          <Header></Header>
          <div style="position: relative">
            <a-tabs v-model:activeKey="tabKey" :animated="true" size="large">
              <a-tab-pane key="1">
                <template #tab>
                  <span>
                    <scan-outlined />
                    {{ $t("qrCodeLogin") }}
                  </span>
                </template>
                <div class="qr-content">
                  <div class="code-content">
                    <img :src="qrUrl" class="qr-img" />
                    <div
                      class="qr-status"
                      v-show="qrStatus != '0' && qrStatus != '2'"
                    >
                      <span v-show="qrStatus == '-2'">{{
                        $t("qrStatus-2")
                      }}</span>
                      <span v-show="qrStatus == '-1'">{{
                        $t("qrStatus-1")
                      }}</span>
                      <check-circle-filled
                        v-show="qrStatus == '1'"
                        style="color: #19be6b; font-size: 34px"
                      />
                      <span v-show="qrStatus == '1'" class="success">{{
                        $t("qrStatus1")
                      }}</span>
                      <span v-show="qrStatus == '1'">{{
                        $t("qrStatus3")
                      }}</span>
                      <a-button
                        size="small"
                        type="primary"
                        class="refresh"
                        @click="getQRCode"
                        v-show="qrStatus != '1'"
                        >{{ $t("clickRefresh") }}</a-button
                      >
                    </div>
                  </div>
                  <div class="qr-tip">{{ $t("qrTip") }}</div>
                </div>
              </a-tab-pane>
            </a-tabs>
            <a-tooltip @click="toAccountLogin" placement="rightTop">
              <template #title>
                <span>{{ $t("userLoginTip") }}</span>
              </template>
              <desktop-outlined />
            </a-tooltip>
            <a-row type="flex" justify="end" class="other-login">
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
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import {
  ScanOutlined,
  DesktopOutlined,
  CheckCircleFilled
} from "@ant-design/icons-vue"
import LangSwitch from "@/components/common/lang-switch.vue"
import Header from "@/components/common/header.vue"
import Footer from "@/components/common/footer.vue"
import useQrCode from "./useQrCode"

onMounted(() => {
  getQRCode()
})
onBeforeUnmount(() => {
  // 清除查询二维码状态定时器
  window.clearInterval(checkQRId.value)
})
const $router = useRouter()
// UI
const tabKey = ref("1")

// 二维码功能
const { qrUrl, qrStatus, checkQRId, getQRCode } = useQrCode()

// 账号登录
const toAccountLogin = () => {
  $router.push("/login")
}
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
  .other-login {
    margin-top: 3vh;
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
          width: 50%;
          .ant-tabs-tab {
            flex: 1;
            font-size: 17px;
            .ant-tabs-tab-btn {
              margin: 0 auto;
            }
          }
        }
      }
    }

    :deep(.anticon-desktop) {
      position: absolute;
      top: 18px;
      right: 0;
      font-size: 34px;
      color: #1da57a;
      cursor: pointer;
      transition: all 0.3s ease 0.1s;

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  .qr-content {
    height: 292px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .code-content {
      position: relative;
      box-sizing: border-box;
      width: 180px;
      height: 180px;
      padding: 7px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #e5e5e5;
      transition: transform 0.3s;
      .qr-img {
        width: 164px;
        height: 164px;
      }
      .qr-status {
        opacity: 1;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: hsla(0, 0%, 100%, 0.9);
        font-size: 14px;
        color: #323233;
        font-weight: 500;
        transition: opacity 0.3s;
        .success {
          color: #19be6b;
          font-size: 16px;
          margin: 5px 0;
        }
        .refresh {
          margin-top: 15px;
        }
      }
    }
    .qr-tip {
      margin-top: 30px;
    }
  }
}
</style>
