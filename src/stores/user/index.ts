import { defineStore } from "pinia"
import useUser from "./useUser"

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const { avatar, nickname, departmentTitle, type, setUserInfo, logout } = useUser()
  return { avatar, nickname, departmentTitle, type, setUserInfo, logout }
})
