import { h } from "vue"
import { notification } from "ant-design-vue"
import { noticeReq } from "@/api/index"

export default () => {
  // const noticeInfo = ref<INoticeRes>({
  //   title: "",
  //   content: "",
  //   duration: 10,
  //   open: true,
  //   position: ""
  // })
  const getNoticeInfo = async () => {
    try {
      // 获取通知提醒框数据
      const res = await noticeReq()
      if (!res || !res.result) return
      // 处理数据
      const content = res.result.content.replace(/\\n/g, "")
      notification.info({
        message: res.result.title,
        description: () => h("div", { innerHTML: content }),
        duration: res.result.duration
      })
    } catch (e) {
      console.log(e, "error")
    }
  }

  return {
    getNoticeInfo
  }
}
