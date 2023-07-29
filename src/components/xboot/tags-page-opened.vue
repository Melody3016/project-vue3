<template>
  <div class="container">
    <!-- tagsList部分 -->
    <div class="tags">
      <a-tag
        :style="'HomeIndex' === currentName ? 'color: #2d8cf0' : ''"
        @click="handleClick('HomeIndex')"
        >首页</a-tag
      >
      <a-tag
        v-for="item in pageTagsList"
        :key="item.name"
        @click="handleClick(item.name)"
        :style="item.name === currentName ? 'color: #2d8cf0' : ''"
        closable
        >{{ item.title }}</a-tag
      >
    </div>
    <!-- 下拉部分 -->
    <div class="dropdown">
      <!-- <a-dropdown>
        123123123
        <DownOutlined />
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.alipay.com/"
              >
                1st menu item
              </a>
            </a-menu-item>
            <a-menu-item key="1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.taobao.com/"
              >
                2nd menu item
              </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" disabled
              >3rd menu item（disabled）</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { DownOutlined } from "@ant-design/icons-vue"
const $router = useRouter()
const route = useRoute()
defineProps<{
  pageTagsList: Array<{ name: string; title: string }>
}>()

const handleClick = (name: string) => {
  $router.push({ name })
}

const currentName = ref("")
// 监听路由，根据路由信息设置tags选中状态
watch(
  () => route.name,
  (newName) => {
    currentName.value = newName as string
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tags {
    padding-left: 20px;
    line-height: 40px;
    .ant-tag {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      padding: 0 12px;
      color: #74788d;
      cursor: pointer;

      &:hover {
        color: #2d8cf0;
      }
    }
  }
  .dropdown {
    background: white;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
