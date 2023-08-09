import { ref } from "vue"
import { initDepartment, loadDepartment, searchDepartment } from "@/api"
import util from "@/utils/utils"
import type { CascaderProps, TreeProps } from "ant-design-vue"
export default () => {
  // 部门级联选择框
  const depOptions = ref<CascaderProps["options"]>([])
  const treeData = ref<TreeProps["treeData"]>([])
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
      treeData.value?.push({
        key: item.id,
        title: item.title,
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
  const loadTreeData: TreeProps["loadData"] = (treeNode) => {
    return new Promise((resolve) => {
      // debugger
      if (!treeNode.dataRef) {
        resolve()
        return
      }
      if (treeNode.dataRef.children) {
        resolve()
        return
      }
      treeNode.dataRef.children = []
      // 获取子集数据
      loadDepartment(treeNode.dataRef.key as string)
        .then((res) => {
          // debugger
          // 遍历赋值
          res.result?.forEach((item) => {
            const obj = {
              key: item.id,
              title: item.title,
              isLeaf: !item.isParent,
              disabled: item.status === -1
            }
            // 添加已禁用文字提示
            if (item.status === -1) {
              obj.title = `[已禁用] ${obj.title}`
            }
            treeNode.dataRef?.children?.push(obj)
          })
          if (treeData.value) {
            treeData.value = [...treeData.value]
          }
          resolve()
        })
        .catch(() => {
          resolve()
        })
    })
  }
  // 搜索部门数据
  const searchDep = async (searchKey: string) => {
    // 搜索部门
    if (searchKey) {
      const [err, res] = await util.awaitWrap(
        searchDepartment({ title: searchKey })
      )
      if (err || !res || !res.result) return
      if (res.success) {
        treeData.value = []
        res.result.forEach(function (item) {
          const obj = {
            key: item.id,
            title: item.title,
            isLeaf: !item.isParent,
            disabled: item.status === -1
          }
          // 添加已禁用文字提示
          if (item.status === -1) {
            obj.title = `[已禁用] ${obj.title}`
          }
          treeData.value?.push(obj)
        })
      }
    } else {
      // 不进行搜索
      treeData.value = []
      getFirstDepData()
    }
  }

  getFirstDepData()

  return {
    depOptions,
    treeData,
    loadTreeData,
    loadData,
    searchDep
  }
}
