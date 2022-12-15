// 请求返回类型
interface IData<R = any> {
  code: number
  message: string
  success: boolean
  timestamp: bigint
  result?: R
}

// 通知提醒框接口返回类型
interface INoticeRes {
  content: string
  duration: number
  open: boolean
  position: string
  title: string
}

// 检查二维码状态接口返回类型
interface ICheckQRStatusRes {
  accessToken: string | null
  status: string
}
