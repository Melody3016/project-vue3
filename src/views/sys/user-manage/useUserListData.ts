import { ref } from "vue"
import { getUserListData } from "@/api"
import util from "@/utils/utils"

export default () => {
  // 表格数据
  const tableData = ref<IUserInfoRes[]>()
  // 分页数据
  const total = ref(50)
  // 加载效果
  const isLoading = ref(false)

  // 调用接口获取表格数据
  const getUserList = async (searchObj: IUserListParam) => {
    isLoading.value = true
    const [err, res] = await util.awaitWrap(getUserListData(searchObj))
    isLoading.value = false
    if (err || !res || !res.result) return
    tableData.value = res.result.content
    total.value = res.result.totalElements
  }

  return {
    tableData,
    total,
    isLoading,
    getUserList
  }
}
