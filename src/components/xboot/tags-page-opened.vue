<template>
  <div class="containers" ref="container">
    <!-- tagsList部分 -->
    <div
      class="tags"
      ref="tags"
      :style="{ left: tagBodyLeft + 'px' }"
      @DOMMouseScroll="scrollHandler"
      @mousewheel="scrollHandler"
    >
      <transition-group name="scroll">
        <a-tag
          key="HomeIndex"
          :style="'HomeIndex' === currentName ? 'color: #2d8cf0' : ''"
          @click="handleClick('HomeIndex')"
          >首页</a-tag
        >
        <a-tag
          v-for="item in tagsList"
          :key="item.name"
          @click="handleClick(item.name)"
          :style="item.name === currentName ? 'color: #2d8cf0' : ''"
          closable
          @close="handleClose($event, item.name)"
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
import { ref, watch, nextTick } from "vue"
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

// const list = [
//   { name: "user-manage", title: "用户管理" },
//   { name: "department-manage", title: "部门管理" },
//   { name: "message-manage", title: "消息管理[付费]" },
//   { name: "oss-manage", title: "文件对象存储[付费]" },
//   { name: "apply-manage", title: "我的申请[付费]" },
//   { name: "todo-manage", title: "我的待办[付费]" },
//   { name: "client", title: "接入网站管理" },
//   { name: "doc", title: "开放平台文档" },
//   { name: "quartz-job", title: "定时任务" },
//   { name: "log-manage", title: "日志管理" },
//   { name: "tree", title: "树形结构生成[付费]" }
// ]

// 获取tagsList
getTagsList()

// 当前选中tags名称
const currentName = ref("")
// 监听路由，根据路由信息设置tags选中状态
watch(
  () => route.name,
  async (newName) => {
    currentName.value = newName as string
  },
  { immediate: true }
)
watch(
  () => route.meta.oriTitle,
  async (newTitle) => {
    await nextTick()
    // 将当前的tag移动到最左侧
    if (!tags.value) return
    console.log(tags)
    const collection = tags.value.children
    Array.prototype.forEach.call(collection, (item) => {
      if (newTitle == item.innerText) {
        moveToView(item)
      }
    })
  },
  { immediate: true }
)

// 关闭全部
const closeAll = (e: Event) => {
  e.preventDefault()
  // 不传递参数代表删除全部
  removeTags()
  tagBodyLeft.value = 0
}

// 关闭其他
const closeOther = (e: Event) => {
  e.preventDefault()
  // 传递参数代表只保留当前的tags
  removeTags(currentName.value, true)
  tagBodyLeft.value = 0
}

// 关闭选中单个
const handleClose = (e: any, name: string) => {
  // console.log(e)
  // debugger
  e.preventDefault()
  // 传递参数代表删除当前的tags
  let lastPageObj = tagsList.value[0]
  if (currentName.value === name) {
    let len = tagsList.value.length
    for (let i = 1; i < len; i++) {
      if (tagsList.value[i].name == name) {
        if (i < len - 1) {
          lastPageObj = tagsList.value[i + 1]
        } else {
          lastPageObj = tagsList.value[i - 1]
        }
        break
      }
    }
  } else {
    let tagWidth = e.target?.parentNode.parentNode.offsetWidth
    tagBodyLeft.value = Math.min(tagBodyLeft.value + tagWidth, 0)
  }
  removeTags(name)
  if (currentName.value === name) {
    handleClick(lastPageObj.name)
  }
  // tagBodyLeft.value = 0
}

// 横向滚动
const container = ref<HTMLElement | null>()
const tags = ref<HTMLElement | null>()
const tagBodyLeft = ref(0)
const paddingRight = 40
// 处理鼠标滚动事件
const scrollHandler = (e: any) => {
  e.preventDefault()
  // 获取滚动方向
  let delta = 0
  if (e.type == "DOMMouseScroll" || e.type == "mousewheel") {
    delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
  }
  let left = 0
  // 定义滚动方向，其实也可以在赋值的时候写
  if (delta > 0) {
    left = Math.min(0, tagBodyLeft.value + delta)
  } else {
    if (!(container.value && tags.value)) return
    if (container.value.offsetWidth - 100 < tags.value.offsetWidth) {
      if (
        tagBodyLeft.value <
        -(tags.value.offsetWidth - container.value.offsetWidth + paddingRight)
      ) {
        left = tagBodyLeft.value
      } else {
        left = Math.max(
          tagBodyLeft.value + delta,
          container.value.offsetWidth - tags.value.offsetWidth - paddingRight
        )
      }
    } else {
      tagBodyLeft.value = 0
    }
  }
  tagBodyLeft.value = left
}
const moveToView = (tag: HTMLElement) => {
  if (!container.value) return
  if (tag.offsetLeft < -tagBodyLeft.value) {
    // 标签在可视区域左侧
    tagBodyLeft.value = -tag.offsetLeft + 10
  } else if (
    tag.offsetLeft + 10 > -tagBodyLeft.value &&
    tag.offsetLeft + tag.offsetWidth <
      -tagBodyLeft.value + container.value.offsetWidth - paddingRight
  ) {
    // 标签在可视区域
    tagBodyLeft.value = Math.min(
      0,
      container.value.offsetWidth -
        paddingRight -
        tag.offsetWidth -
        tag.offsetLeft -
        20
    )
  } else {
    // 标签在可视区域右侧
    tagBodyLeft.value = -(
      tag.offsetLeft -
      (container.value.offsetWidth - paddingRight - tag.offsetWidth) +
      20
    )
  }
}
</script>
<style lang="scss" scoped>
.containers {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  z-index: 0;
  background: #f0f2f5;
  padding-right: 40px;
  overflow: hidden;
  .tags {
    position: absolute;
    top: 0;
    height: 40px;
    overflow: visible;
    white-space: nowrap;
    padding: 2px 10px;
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
