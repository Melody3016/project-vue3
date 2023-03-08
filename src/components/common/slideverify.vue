<template>
  <slide-verify
    :l="40"
    :r="6"
    :w="350"
    :h="170"
    :imgs="picArray"
    slider-text="向右滑动完成验证"
    ref="slideverify"
    @success="onSuccess"
  ></slide-verify>
</template>
<script setup lang="ts">
import { reactive, defineProps } from "vue"
import img1 from "@/assets/images/2054345.jpg"
import img2 from "@/assets/images/2053491.jpg"
import img3 from "@/assets/images/2055472.jpg"

const picArray = reactive([img1, img2, img3])
defineProps({
  onSuccess: {
    type: Function
  }
})
</script>
<style lang="scss" scoped></style>
