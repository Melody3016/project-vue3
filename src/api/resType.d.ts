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

// 用户信息
interface permissionsStates {
  path: string
  title: string
}
interface rolesStates {
  description: string
  id: string
  name: string
}
interface IUserInfoRes {
  address: string
  avatar: string
  birth: string
  createBy: string
  createTime: string
  defaultRole: number
  delFlag: number
  departmentId: string
  departmentTitle: string
  description: string
  email: string
  id: string
  mobile: string
  nickname: string
  passStrength: string
  password: string
  permissions?: permissionsStates[]
  roles?: rolesStates[]
  sex: string
  status: number
  street: string
  type: number
  updateBy: string
  updateTime: string
  username: string
}
