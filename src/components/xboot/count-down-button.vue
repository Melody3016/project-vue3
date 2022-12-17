<template>
  <div>
    <a-button
      :countTime="countTime"
      :loading="loading"
      :type="type"
      :size="size"
      :ghost="ghost"
      :disabled="disabled || clicked"
      :icon="icon"
      :shape="shape"
      :long="long"
      :block="block"
      @click="handleClick"
      >{{ buttonText }}</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import type { PropType } from "vue"
import type {
  ButtonType,
  ButtonSize,
  ButtonShape
} from "ant-design-vue/es/button"
import { submitText } from "@/utils/langs"

const props = defineProps({
  text: {
    type: String,
    default: submitText.value
  },
  autoCountDown: {
    type: Boolean,
    default: true
  },
  countTime: {
    type: [Number, String],
    default: 60
  },
  suffixText: {
    type: String,
    default: "s"
  },
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
  loading: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: String,
  shape: String as PropType<ButtonShape>,
  long: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (e: "on-click", value: boolean): void
  (e: "change", id: string): void
}>()
// data
const buttonText = ref(props.text)
const count = ref(Number(props.countTime))
const clicked = ref(false)

// methods
const init = () => {}
const handleClick = () => {
  emit("on-click", true)
}
const startCountDown = () => {
  clicked.value = true
  countDown()
}
const countDown = () => {
  if (count.value == 0) {
    clicked.value = false
    count.value = Number(props.countTime)
    buttonText.value = props.text
    return
  } else {
    buttonText.value = count.value + " " + props.suffixText
    count.value--
  }
  setTimeout(() => {
    countDown()
  }, 1000)
}
const setText = (value: string) => {
  if (value === buttonText.value) {
    return
  }
  buttonText.value = value
}

// watch
watch(
  () => props.text,
  (newX) => {
    setText(newX)
  }
)
watch(
  () => props.autoCountDown,
  (newX) => {
    if (newX) {
      startCountDown()
    }
  }
)

onMounted(() => {
  init()
})
</script>

<style lang="scss"></style>
