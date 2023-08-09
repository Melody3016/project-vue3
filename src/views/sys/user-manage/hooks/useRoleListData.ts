import { ref } from "vue"
import { getAllRoleList } from "@/api"
import utils from "@/utils/utils"

export default () => {
  const roleList = ref()

  const getData = async () => {
    const [err, res] = await utils.awaitWrap<any, any>(getAllRoleList())
    if (err || !res.result) return
    roleList.value = res.result
  }
  getData()

  return {
    roleList
  }
}
