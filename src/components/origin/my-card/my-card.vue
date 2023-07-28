<template>
  <a-card v-bind="$attrs">
    <template v-for="(_, scopeSlotName) in $slots" #[scopeSlotName]="scope">
      <slot :name="scopeSlotName" v-bind="scope"></slot>
    </template>
  </a-card>
</template>
<script setup lang="ts">
defineProps({
  id: String,
  // 卡片高度
  cardHeight: {
    type: String,
    default: "102px"
  },
  // backgroundColor: String,
  // backgroundImage: String,
  // icon: String,
  // iconSize: {
  //   type: [Number, String],
  //   default: 26
  // },
  // iconColor: {
  //   type: String,
  //   default: "#478ef9"
  // },
  image: {
    type: String,
    default: "@/assets/dashboard/empty.png"
  },
  // 图片宽高
  width: {
    type: String,
    default: "26px"
  },
  height: {
    type: String,
    default: "26px"
  },
  // 进度条相关
  prefix: String,
  suffix: String,
  endVal: Number,
  decimalPlaces: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 2
  },
  delay: {
    type: Number,
    default: 0
  },
  options: {
    type: Object,
    default: () => {
      return {
        startVal: 0,
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: "."
      }
    }
  },
  countColor: {
    type: String,
    default: "#3f4255"
  },
  countSize: {
    type: String,
    default: "24px"
  },
  countWeight: {
    type: Number,
    default: 600
  },
  // 标题相关
  titleColor: {
    type: String,
    default: "#b5b5c5"
  },
  titleSize: {
    type: String,
    default: "12px"
  },
  titleWeight: {
    type: Number,
    default: 500
  }
})
</script>
<style lang="scss" scoped></style>
