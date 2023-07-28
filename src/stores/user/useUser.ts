import { ref } from "vue"
import { setStore } from "@/libs/localStroage"

export default () => {
  // 昵称头像
  const nickname = ref("")
  const avatar = ref("")
  // 部门用户类型
  const departmentTitle = ref("")
  const type = ref(0)
  // 设置用户信息
  const setUserInfo = (v: {
    nickname: string
    avatar: string
    departmentTitle: string
    type: number
  }) => {
    nickname.value = v.nickname
    avatar.value = v.avatar
    departmentTitle.value = v.departmentTitle
    type.value = v.type
    setStore("nickname", v.nickname)
    setStore("avatar", v.avatar)
    setStore("departmentTitle", v.departmentTitle)
    setStore("type", v.type)
  }

  return {
    nickname,
    avatar,
    departmentTitle,
    type,
    setUserInfo
  }
}

// state: {
//   nickname: "",
//   avatar: ""
// },
// mutations: {
//   setUserInfo(state, v) {
//       state.nickname = v.nickname;
//       state.avatar = v.avatar;
//       localStorage.nickname = v.nickname;
//       localStorage.avatar = v.avatar;
//   },
//   setNickname(state, v) {
//       state.nickname = v;
//       localStorage.nickname = v;
//   },
//   setAvatar(state, v) {
//       state.avatar = v;
//       localStorage.avatar = v;
//   },
//   logout() {
//       Cookies.remove('userInfo');
//       // 清空打开的页面等数据 保留语言、主题等配置数据
//       let lang = localStorage.lang, theme = localStorage.theme;
//       localStorage.clear();
//       localStorage.lang = lang;
//       localStorage.theme = theme;
//   }
// }
