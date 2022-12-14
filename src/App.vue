<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import enUS from "ant-design-vue/es/locale/en_US"
import jaJP from "ant-design-vue/es/locale/ja_JP"
import { useAppStore } from "./stores"
import { Langs } from "./utils/enums"

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)
const locale = computed(() => {
  // 根据store中的lang，选择语言
  switch (lang.value) {
    case Langs.zhCN:
      return zhCN
    case Langs.enUS:
      return enUS
    case Langs.jaJP:
      return jaJP
    default:
      return zhCN
  }
})
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView></RouterView>
  </a-config-provider>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}

#app {
  width: 100%;
  height: 100%;
}
// 暗黑
.darkMode {
  filter: invert(1) hue-rotate(180deg);
  transition: all 300ms;
  img,
  video {
    filter: invert(1) hue-rotate(180deg);
  }
}

// 色弱
.weakMode {
  touch-action: none;
  filter: invert(80%);
}

// 顶部加载条
#nprogress {
  .bar {
    background: #1da57a !important;
    .peg {
      box-shadow: 0 0 10px #1da57a, 0 0 5px #1da57a;
    }
  }
  .spinner {
    .spinner-icon {
      border-top-color: #1da57a;
      border-left-color: #1da57a;
    }
  }
}
</style>
