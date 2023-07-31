import { getStore, setStore } from "@/libs/localStroage"
import { ref } from "vue"

interface ITags {
  name: string
  title: string
}

export default () => {
  // tagsList
  const tagsList = ref<ITags[]>([])

  // 从本地缓存获取tagsList
  const getTagsList = () => {
    const str = getStore("tagsList")
    if (str) tagsList.value = JSON.parse(str)
  }

  // 新增tags
  const addTags = (tags: ITags) => {
    // 判断tags是否已经存在
    const isExits = tagsList.value.find((item) => item.name === tags.name)
    if (isExits) return
    tagsList.value.push(tags)
    // 重新存储到本地
    setStore("tagsList", tagsList.value)
  }

  // 删除tags, 有参数则代表删除其他，无参数代表全部删除
  const removeTags = (name?: string) => {
    if (name) {
      tagsList.value = tagsList.value.filter((item) => item.name === name)
    } else {
      tagsList.value = []
    }
  }

  return {
    tagsList,
    getTagsList,
    addTags,
    removeTags
  }
}
