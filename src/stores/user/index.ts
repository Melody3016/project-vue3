import { defineStore } from "pinia"
import useUser from "./useUser"

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const { avatar, nickname, setUserInfo } = useUser()
  return { avatar, nickname, setUserInfo }
})
