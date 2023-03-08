<template>
  <div class="lang-icon">
    <a-dropdown overlayClassName="lang-menu">
      <a class="ant-dropdown-link" @click.prevent>
        <global-outlined />
      </a>
      <template #overlay>
        <a-menu @click="langChange">
          <a-menu-item name="zh-CN" :key="keyObj.zh"
            ><div class="lan-logo-content">
              <img
                src="@/assets/icon/chinese.png"
                class="country-logo"
              />简体中文
            </div></a-menu-item
          >
          <a-menu-item name="en-US" :key="keyObj.en"
            ><div class="lan-logo-content">
              <img
                src="@/assets/icon/english.png"
                class="country-logo"
              />English
            </div></a-menu-item
          >
          <a-menu-item name="ja-JP" :key="keyObj.ja"
            ><div class="lan-logo-content">
              <img
                src="@/assets/icon/japanese.png"
                class="country-logo"
              />日本語
            </div></a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from "vue"
import type { ComponentInternalInstance } from "vue"
import { GlobalOutlined } from "@ant-design/icons-vue"
import type { MenuProps } from "ant-design-vue/es"
import { useAppStore } from "@/stores"
import { Langs } from "@/utils/enums"

// 定义menu中的key
interface IkeyObj {
  zh: Langs.zhCN
  en: Langs.enUS
  ja: Langs.jaJP
}
const keyObj = reactive<IkeyObj>({
  zh: Langs.zhCN,
  en: Langs.enUS,
  ja: Langs.jaJP
})
const currLang = ref(Langs.zhCN)

// 读取变量
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const lang = proxy?.$getStore("lang") as Langs | null | undefined

// 使用store
const appStore = useAppStore()
const { switchLang } = appStore

const langChange: MenuProps["onClick"] = ({ key }) => {
  currLang.value = key as Langs
  if (proxy) {
    proxy.$i18n.locale = key as Langs
  }
  switchLang(key as Langs)
}
onMounted(() => {
  if (lang) {
    currLang.value = lang
  }
})
</script>

<style lang="scss">
.lang-icon {
  font-size: 26px;
  position: fixed;
  top: 2vh;
  right: 1.5vw;
  cursor: pointer;
}
.lan-logo-content {
  display: flex;
  align-items: center;
  .country-logo {
    width: 15px;
    margin-right: 8px;
  }
}
.lang-menu {
  .ant-dropdown-content {
    .ant-dropdown-menu {
      background-color: #eee;
    }
  }
}
</style>
