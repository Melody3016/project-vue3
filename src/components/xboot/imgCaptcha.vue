<template>
  <a-row
    type="flex"
    justify="space-between"
    style="align-items: center; overflow: hidden"
  >
    <a-input
      v-model:value="code"
      size="large"
      allowClear
      autocomplete="off"
      :placeholder="$t('codePlaceholder')"
      :maxlength="10"
      class="input-verify"
      @change="emit('change', code, captchaId)"
    />
    <div class="code-image" style="position: relative; font-size: 12px">
      <a-spin v-if="loadingCaptcha"></a-spin>
      <img
        :src="captchaImg"
        :alt="$t('codeInitError')"
        @click="getCaptchaImg"
        style="
          width: 110px;
          height: 32px;
          line-height: 32px;
          cursor: pointer;
          display: block;
        "
      />
    </div>
  </a-row>
</template>
<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue"
import useCaptchaImg from "@/hooks/useCaptchaImg"

const code = ref("")

const { loadingCaptcha, captchaImg, captchaId, getCaptchaImg } = useCaptchaImg()

const emit = defineEmits<{
  (e: "change", code: string, captchaId: string): void
}>()

onMounted(() => {
  getCaptchaImg()
})
defineExpose({
  getCaptchaImg
})
</script>
<style lang="scss" scoped></style>
