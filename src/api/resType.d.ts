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
  sex: string
  status: number
  street: string
  type: number
  updateBy: string
  updateTime: string
  username: string
  permissions?: permissionsStates[]
  roles?: rolesStates[]
}

// 菜单接口返回类型
interface IMenuListRes {
  buttonType: string
  component: string
  description: string
  i18n: string
  icon: string
  id: string
  isMenu: boolean
  level: number
  localize: boolean
  name: string
  parentId: string
  path: string
  permTypes: string[]
  showAlways: boolean
  title: string
  type: number
  url: string
  children: IMenuListRes[] | null
}

// 获取vaptcha配置返回类型
interface IOtherSetRes {
  blacklist: string // ip黑名单
  domain: string // 域名
  ssoDomain: string // 单点登录域名
}

interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: Sort
  unpaged: boolean
}
// 条件查询用户列表返回类型
interface IUserListRes {
  content: IUserInfoRes[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: Pageable
  size: number
  sort: Sort
  totalElements: number
  totalPages: number
}
