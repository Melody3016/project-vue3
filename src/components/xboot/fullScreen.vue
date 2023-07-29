<template>
  <div
    @click="handleChange"
    v-if="showFullScreenBtn"
    style="display: inline-block"
  >
    <a-tooltip
      :title="modelValue ? $t('exitFullscreen') : $t('fullscreen')"
      placement="bottom"
    >
      <div class="header-right-icon header-action">
        <!-- <Icon :type="modelValue ? 'md-contract' : 'md-expand'" :size="20"></Icon> -->
        <fullscreen-outlined v-if="!modelValue" style="font-size: 20px" />
        <fullscreen-exit-outlined v-else style="font-size: 20px" />
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons-vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void
  (e: "on-change", modelValue: boolean): void
}>()

// 是否展示全屏按钮
const showFullScreenBtn = computed(() => {
  return window.navigator.userAgent.indexOf("MSIE") < 0
})

const handleFullscreen = () => {
  let main = document.body
  if (props.modelValue) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (main.requestFullscreen) {
      main.requestFullscreen()
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen()
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen()
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen()
    }
  }
}
const handleChange = () => {
  handleFullscreen()
}

document.addEventListener("fullscreenchange", () => {
  console.log("fullscreenchange")
  emit("update:modelValue", !props.modelValue)
  emit("on-change", !props.modelValue)
})
document.addEventListener("mozfullscreenchange", () => {
  emit("update:modelValue", !props.modelValue)
  emit("on-change", !props.modelValue)
})
document.addEventListener("webkitfullscreenchange", () => {
  emit("update:modelValue", !props.modelValue)
  emit("on-change", !props.modelValue)
})
document.addEventListener("msfullscreenchange", () => {
  emit("update:modelValue", !props.modelValue)
  emit("on-change", !props.modelValue)
})
document.addEventListener("keydown", function (event) {
  let e = event || window.event || arguments.callee.caller.arguments[0]
  if (e && e.keyCode === 122) {
    //捕捉F11键盘动作
    e.preventDefault() //阻止F11默认动作,自行定义全屏事件，否则f11全屏后，h5的全屏api失效
    handleChange()
  }
})
</script>

<style scoped lang="scss">
.header-right-icon {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
}
</style>
