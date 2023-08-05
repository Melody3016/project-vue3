import { ref } from "vue"
import { initDepartment, loadDepartment } from "@/api"
import util from "@/utils/utils"
import type { CascaderProps } from "ant-design-vue"
export default () => {
  // 部门级联选择框
  const depOptions = ref<CascaderProps["options"]>([])
  // 获取一级部门数据
  const getFirstDepData = async () => {
    const [err, res] = await util.awaitWrap(initDepartment())
    if (err || !res || !res.result) return
    // 遍历赋值
    res.result.forEach((item) => {
      depOptions.value?.push({
        value: item.id,
        label: item.title,
        isLeaf: !item.isParent
      })
    })
  }
  // 获取部门子集数据
  const loadData: CascaderProps["loadData"] = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // 判断是否已经存在子集数据children
    if (targetOption.children) return
    targetOption.children = []
    targetOption.loading = true
    // 获取子集数据
    const [err, res] = await util.awaitWrap(
      loadDepartment(targetOption.value as string)
    )
    if (err || !res || !res.result) return
    targetOption.loading = false
    // 遍历赋值
    res.result.forEach((item) => {
      const obj = {
        value: item.id,
        label: item.title,
        isLeaf: !item.isParent,
        disabled: item.status === -1
      }
      // 添加已禁用文字提示
      if (item.status === -1) {
        obj.label = `[已禁用] ${obj.label}`
      }
      targetOption.children?.push(obj)
    })
    if (depOptions.value) {
      depOptions.value = [...depOptions.value]
    }
  }

  return {
    depOptions,
    getFirstDepData,
    loadData
  }
}
