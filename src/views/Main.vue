<template>
  <a-layout class="container">
    <!-- 顶部导航条 -->
    <a-layout-header class="header">
      <!-- logo-->
      <div class="fix-logo">
        <img src="@/assets/logo-white.png" key="max-logo" />
      </div>

      <!-- 收缩图标 -->
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="() => (collapsed = !collapsed)"
      />

      <!-- 导航条 -->
      <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        class="nav"
        @click="changeNav"
      >
        <a-menu-item v-for="item in navList" :key="item.name">
          <template #icon v-if="!item.url">
            <appstore-outlined />
          </template>
          <span v-if="!item.url" v-text="item.title"></span>
          <a
            v-if="item.url"
            href="https://antdv.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.title }}
          </a>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout>
      <!-- 左侧菜单 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        width="200"
      >
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <a-sub-menu v-for="item in menuList" :key="item.name">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title>{{ item.title }}</template>
            <a-menu-item v-for="ele in item.children" :key="ele.name">{{
              ele.title
            }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <!-- Tags 标签 -->

      <!-- 页面部分 -->
      <a-layout-content style="overflow: auto"
        >...
        <br />
        Really
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        long
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        content

        <!-- 页面页脚 -->
        <div class="main-page-footer-content" v-if="showFooter">
          <Footer class="main-page-footer"></Footer>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined
} from "@ant-design/icons-vue"
import { ref, onMounted } from "vue"
import type { MenuClickEventHandler } from "ant-design-vue/es/menu/src/interface"
import useInitRouter from "@/hooks/useInitRouter"
import { setStore } from "@/libs/localStroage"

const collapsed = ref(false)
const selectedKeys = ref<string[]>(["1"])

// 是否展示页脚
const showFooter = ref(true)

// 获取菜单
const { currNavName, navList, menuList, getMenuData, handleMenuList } =
  useInitRouter()

// 导航条数据
const current = ref<string[]>([currNavName.value])

// 切换菜单
const changeNav: MenuClickEventHandler = ({ key }) => {
  // 缓存localStorage中
  setStore("currNavName", key)
  handleMenuList(key)
}

onMounted(async () => {
  // 获取菜单数据
  getMenuData()
  console.log("onMounted ---- navList", navList)
  console.log("onMounted ---- menuList", menuList)
  current.value[0] = currNavName.value
  // 获取之前选中导航条
})
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .header {
    display: flex;
    height: 60px;
    overflow: hidden;
    color: #fff;
    background: #2d8cf0;

    .fix-logo {
      width: 170px;
      img {
        height: 44px;
      }
    }
    .trigger {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 20px;

      &:hover {
        background-color: #4298f2;
      }
    }
    .nav {
      height: 60px;
      font-size: 14px;
      border-bottom: none;
      color: #fff;
      background: #2d8cf0;

      :deep(.ant-menu-item-selected) {
        color: #fff;
        border-bottom: 3px solid #fff;
      }
      :deep(.ant-menu-item a) {
        color: #fff;
      }
      :deep(.ant-menu-item-active) {
        color: #fff;
        background-color: #4298f2;
      }
    }
  }
  .ant-layout-sider {
    background: #fff;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main-page-footer-content {
    display: flex;
    justify-content: center;

    .main-page-footer {
      width: 400px;
    }
  }
}
</style>
