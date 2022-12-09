<script setup lang="ts"></script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  /* overflow: hidden; */
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
</style>
