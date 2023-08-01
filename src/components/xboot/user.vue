<template>
  <div style="display: inline-block">
    <a-dropdown :trigger="['hover']" placement="bottom">
      <div style="display: inline-block">
        <div class="header-right-icon header-user header-action">
          <a-avatar v-if="avatar" :src="avatar" size="small"></a-avatar>
          <a-avatar v-else size="small"
            ><template #icon><UserOutlined /></template
          ></a-avatar>
          <span class="header-username">{{ nickname }}</span>
        </div>
      </div>
      <template #overlay>
        <a-menu @click="handleClickUserDropdown">
          <a-menu-item key="ownSpace">
            <user-outlined style="margin: 0 10px 0 0" />{{
              $t("userCenter")
            }}</a-menu-item
          >
          <a-menu-item key="changePass">
            <unlock-filled style="margin: 0 10px 0 0" />{{ $t("changePass") }}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="loginout">
            <logout-outlined style="margin: 0 10px 0 0" />{{
              $t("logout")
            }}</a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 修改密码 -->
    <!-- <changePass v-model="showChangePass" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getOtherSet } from "@/api/index"
// import util from "@/libs/util.js"
// import changePass from "@/views/change-pass/change-pass"
import Cookies from "js-cookie"
import {
  UserOutlined,
  UnlockFilled,
  LogoutOutlined
} from "@ant-design/icons-vue"
import { useUserStore } from "@/stores"
import { storeToRefs } from "pinia"
import type { MenuProps } from "ant-design-vue/es/menu/src/Menu"
import utils from "@/utils/utils"
import { setStore } from "@/libs/localStroage"
const userStore = useUserStore()
const { logout } = userStore
const { nickname, avatar } = storeToRefs(userStore)

const showChangePass = ref(false)

const handleClickUserDropdown: MenuProps["onClick"] = async ({ key }) => {
  if (key === "ownSpace") {
    console.log("ownSpace")
    // util.openNewPage(this, "ownspace_index")
    // this.$router.push({
    //   name: "ownspace_index"
    // })
  } else if (key === "changePass") {
    showChangePass.value = true
  } else if (key === "loginout") {
    // 退出登录
    // this.$store.commit("setLoading", true)
    // 获取用户信息
    const [error, res] = await utils.awaitWrap(getOtherSet())
    if (error || !res) {
      // 错误处理
      return
    }
    if (res.result) {
      let domain = res.result.ssoDomain
      Cookies.set("accessToken", "", {
        domain: domain,
        expires: 7
      })
    }
    logout()
    setStore("accessToken", "")
    // 强制刷新页面 重新加载router
    location.reload()
    // getOtherSet().then((res) => {
    //   // this.$store.commit("setLoading", false)
    //   if (res.result) {
    //     let domain = res.result.ssoDomain
    //     Cookies.set("accessToken", "", {
    //       domain: domain,
    //       expires: 7
    //     })
    //   }
    //   this.$store.commit("logout", this)
    //   this.setStore("accessToken", "")
    //   // 强制刷新页面 重新加载router
    //   location.reload()
    // })
  }
}
</script>

<style lang="scss" scoped></style>
