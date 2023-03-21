<template>
  <div class="register-result">
    <a-row type="flex" justify="center" align="middle" style="height: 100%">
      <a-col class="content">
        <Header></Header>
        <div class="success">
          <check-circle-filled
            :style="{ color: '#52c41a', fontSize: '64px' }"
          />
          <p class="success-words">恭喜您，您的账户：{{ username }} 注册成功</p>
          <div class="buttons">
            <router-link to="/login">
              <a-button type="primary" size="large" style="margin-right: 10px"
                >立即登录</a-button
              >
            </router-link>
            <router-link to="/register">
              <a-button size="large">返回注册</a-button>
            </router-link>
          </div>
        </div>
        <Footer></Footer>
      </a-col>
      <LangSwitch />
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from "vue"
import { CheckCircleFilled } from "@ant-design/icons-vue"
const instance = getCurrentInstance()
const username = instance?.proxy?.$route.query.username
onMounted(() => {
  if (!username) {
    // 非正常进入，返回注册
    instance?.proxy?.$router.replace("/register")
  }
})
</script>

<style lang="scss" scoped>
.register-result {
  height: 100%;
  background: url("@/assets/background.svg");
  background-color: #f0f2f5;

  .success {
    text-align: center;
    margin-top: 10vh;
    .success-words {
      margin-top: 32px;
      font-size: 20px;
      line-height: 28px;
    }

    .buttons {
      margin-top: 40px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 368px;
    height: 100%;
  }
}
</style>
