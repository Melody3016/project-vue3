<template>
  <div class="container">
    <!-- tagsList部分 -->
    <div class="tags" ref="tags">
      <transition-group name="scroll">
        <a-tag
          key="HomeIndex"
          :style="'HomeIndex' === currentName ? 'color: #2d8cf0' : ''"
          @click="handleClick('HomeIndex')"
          >首页</a-tag
        >
        <a-tag
          v-for="item in list"
          :key="item.name"
          @click="handleClick(item.name)"
          :style="item.name === currentName ? 'color: #2d8cf0' : ''"
          closable
          >{{ item.title }}</a-tag
        ></transition-group
      >
    </div>
    <!-- 下拉部分 -->
    <div class="dropdown">
      <div>
        <a-dropdown placement="bottomRight">
          <DownOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a target="_blank" rel="noopener noreferrer" @click="closeAll">
                  关闭全部
                </a>
              </a-menu-item>
              <a-menu-item key="1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="closeOther"
                >
                  关闭其他
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { DownOutlined } from "@ant-design/icons-vue"
import { useAppStore } from "@/stores"
const $router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const { tagsList } = storeToRefs(appStore)
const { getTagsList, removeTags } = appStore

const handleClick = (name: string) => {
  $router.push({ name })
}

const list = [
  { name: "user-manage", title: "用户管理" },
  { name: "department-manage", title: "部门管理" },
  { name: "message-manage", title: "消息管理[付费]" },
  { name: "oss-manage", title: "文件对象存储[付费]" },
  { name: "apply-manage", title: "我的申请[付费]" },
  { name: "todo-manage", title: "我的待办[付费]" },
  { name: "client", title: "接入网站管理" },
  { name: "doc", title: "开放平台文档" },
  { name: "quartz-job", title: "定时任务" },
  { name: "log-manage", title: "日志管理" },
  { name: "tree", title: "树形结构生成[付费]" }
]

// 获取tagsList
getTagsList()

// 当前选中tags名称
const currentName = ref("")
// 监听路由，根据路由信息设置tags选中状态
watch(
  () => route.name,
  (newName) => {
    currentName.value = newName as string
  },
  { immediate: true }
)

// 关闭全部
const closeAll = (e: Event) => {
  e.preventDefault()
  // 不传递参数代表删除全部
  removeTags()
}

// 关闭其他
const closeOther = (e: Event) => {
  e.preventDefault()
  // 传递参数代表只保留当前的tags
  removeTags(currentName.value)
}

// 横向滚动
const tags = ref<HTMLElement | null>()
setTimeout(() => {
  console.log(tags)
  if (tags.value) {
    tags.value.style.left = "-200px"
  }
}, 1000)
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  overflow: hidden;
  // width: 100%;
  // display: flex;
  // justify-content: space-between;
  .tags {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    overflow: visible;
    white-space: nowrap;
    width: 100%;
    padding-left: 20px;
    line-height: 40px;
    transition: left 0.3s ease;
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
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .ant-dropdown-trigger {
      padding: 13px;
    }
  }
}
</style>
