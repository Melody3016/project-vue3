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
      @click="handleClick"
      >{{ buttonText }}</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"

const props = defineProps({
  text: {
    type: String,
    default: "提交"
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
    default: "秒后重试"
  },
  type: String,
  size: String,
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
  shape: String,
  long: {
    type: Boolean,
    default: false
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
  if (props.autoCountDown) {
    startCountDown()
  }
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

onMounted(() => {
  init()
})
</script>

<style lang="scss"></style>
