<template>
  <a-layout class="container">
    <!-- 顶部导航条 -->
    <a-layout-header class="header">
      <!-- logo-->
      <div class="fix-logo" @click="toHome">
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
      <!-- 顶部右侧按钮 -->
      <div class="header-right-content">
        <!-- <search :theme="navTheme" :type="searchType" v-if="showSearch" />
        <navApp
          :currNav="currNav"
          :navList="navList"
          :type="navShowType"
          @on-click="selectNav"
          v-if="navType == 3"
        />-->
        <full-screen
          v-model="isFullScreen"
          @on-change="fullscreenChange"
        ></full-screen>
        <lang-switch></lang-switch>
        <!--<language />
        <message-tip />-->
        <user />
        <!-- <theme /> -->
      </div>
    </a-layout-header>

    <a-layout>
      <!-- 左侧菜单 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        width="200"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :open-keys="openKeys"
          @openChange="onOpenChange"
          @click="itemClick"
        >
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
      <a-layout-content
        style="height: 100%; display: flex; flex-direction: column"
      >
        <div class="nav-tags">
          <tags-page-opened />
        </div>
        <div style="padding: 0px 20px 20px 20px; overflow: auto">
          <RouterView></RouterView>
          <!-- 页面页脚 -->
          <div class="main-page-footer-content" v-if="showFooter">
            <Footer class="main-page-footer"></Footer>
          </div>
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
import { onMounted, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import type {
  MenuClickEventHandler,
  MenuInfo
} from "ant-design-vue/es/menu/src/interface"
import { setStore, getStore } from "@/libs/localStroage"
import { useAppStore, useUserStore } from "@/stores"
import utils from "@/utils/utils"
import { userInfo } from "@/api"
import type { Key } from "ant-design-vue/es/_util/type"

const $router = useRouter()
const route = useRoute()
const collapsed = ref(false)

// 是否为全屏状态
const isFullScreen = ref(false)
const fullscreenChange = (value: boolean) => {
  // isFullScreen.value = value
  console.log("全屏状态：", value)
}

// 是否展示页脚
const showFooter = ref(true)

// 获取菜单
const appStore = useAppStore()
const userStore = useUserStore()
const { currNavName, navList, menuList, menuData } = storeToRefs(appStore)
const { handleMenuList, handleNavList, getCurrNavName } = appStore

// 切换菜单
const changeNav: MenuClickEventHandler = ({ key }) => {
  // 缓存localStorage中
  setStore("currNavName", key)
  handleMenuList(key, menuData.value)
}

// 点击菜单项进行路由跳转
const itemClick = ({ keyPath }: MenuInfo) => {
  const path = "/" + keyPath?.join("/")
  $router.push(path)
}

// 菜单数据
const selectedKeys = ref<string[]>([])
const rootSubmenuKeys = ref<string[]>([])
const openKeys = ref<Key[]>([])

rootSubmenuKeys.value = menuList.value.map((item) => item.name)

// 监听路由，根据路由信息设置菜单选中状态
watch(
  () => route.name,
  (newName) => {
    if (!newName) return
    selectedKeys.value = [newName as string]
    // 对home特殊处理
    if (selectedKeys.value[0] === "HomeIndex") {
      // 清除菜单选中信息
      openKeys.value = []
      selectedKeys.value = []
    }
  }
)
watch(
  () => route.meta.sub,
  (newSub) => {
    if (!newSub) return
    onOpenChange([newSub as Key])
  }
)

// 根据路由信息设置菜单选中状态
const setMenuSelected = () => {
  const key = route.name as string
  selectedKeys.value = [key]
  const sub = route.meta.sub as string
  openKeys.value = [sub]
}
// 收起其他展开的所有菜单
const onOpenChange = (keys: Key[]) => {
  // 找到后面点击的subItem
  const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1)
  // if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
  //   openKeys.value = keys
  // } else {
  //   openKeys.value = latestOpenKey ? [latestOpenKey] : []
  // }
  openKeys.value = latestOpenKey ? [latestOpenKey] : []
}

// 导航条数据
const current = ref<string[]>([currNavName.value])
watch(currNavName, (newVal) => {
  current.value[0] = newVal
})

const toHome = () => {
  // 清除菜单选中信息
  openKeys.value = []
  selectedKeys.value = []
  $router.push("/home")
}

// 初始化用户信息
const initUserInfo = async () => {
  let nickname = getStore("nickname") || ""
  let avatar = getStore("avatar") || ""
  let departmentTitle = getStore("departmentTitle") || ""
  let type = Number(getStore("type")) || 0
  // 任意一项为空，则重新调接口获取
  if (!(nickname && avatar && departmentTitle && type)) {
    // 获取用户信息
    const [error, res] = await utils.awaitWrap(userInfo())
    if (error || !res) {
      // 错误处理
      return
    }
    if (res.result) {
      nickname = res.result.nickname
      avatar = res.result.avatar
      departmentTitle = res.result.departmentTitle
      type = res.result.type
      setStore("userInfo", res.result)
    }
  }
  // 设置用户信息
  const { setUserInfo } = userStore
  setUserInfo({
    nickname,
    avatar,
    departmentTitle,
    type
  })
}

onMounted(async () => {
  // 获取菜单数据
  // await getMenuData()
  // 获取当前选中导航
  getCurrNavName()
  // 获取navList
  handleNavList(menuData.value)
  // 获取menuList
  handleMenuList(currNavName.value, menuData.value)
  // 设置用户信息
  initUserInfo()
  // 设置菜单选中状态
  setMenuSelected()
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
    position: relative;

    .fix-logo {
      cursor: pointer;
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
    .header-right-content {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      height: 60px;
      // background-color: black;

      .lang-icon {
        top: -2px;
        right: 0;
        position: relative;

        & > :deep(a) {
          color: #fff;
        }
      }
    }
  }
  .nav-tags {
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    transition: padding 0.3s;
    height: 40px;
    width: 100%;
    background-color: #f0f2f5;
    margin-bottom: 10px;
  }
  .ant-layout-sider {
    z-index: 10;
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
