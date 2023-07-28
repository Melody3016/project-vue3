<template>
  <a-card-meta v-bind="$attrs">
    <template v-for="(_, scopeSlotName) in $slots" #[scopeSlotName]="scope">
      <slot :name="scopeSlotName" v-bind="scope"></slot>
    </template>
  </a-card-meta>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
