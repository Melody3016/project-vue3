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
    // 如果tagsList为空先获取
    if (tagsList.value.length === 0) {
      getTagsList()
    }
    // 判断tags是否已经存在
    const isExits = tagsList.value.find((item) => item.name === tags.name)
    if (isExits) return
    tagsList.value.push(tags)
    // 重新存储到本地
    setStore("tagsList", tagsList.value)
  }

  // 删除tags, 有参数isRemoveOther则代表删除其他，无参数代表全部删除，只有name参数代表删除该name
  const removeTags = (name?: string, isRemoveOther?: boolean) => {
    if (name && isRemoveOther) {
      tagsList.value = tagsList.value.filter((item) => item.name === name)
    } else if (name && !isRemoveOther) {
      tagsList.value = tagsList.value.filter((item) => item.name !== name)
    } else {
      tagsList.value = []
    }
    // 重新存储到本地
    setStore("tagsList", tagsList.value)
  }

  return {
    tagsList,
    getTagsList,
    addTags,
    removeTags
  }
}
