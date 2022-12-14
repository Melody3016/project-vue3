// 请求返回类型
interface IData<R = any> {
  code: number
  message: string
  success: boolean
  timestamp: bigint
  result?: R
}

// notice接口返回类型
interface INoticeRes {
  content: string
  duration: number
  open: boolean
  position: string
  title: string
}
