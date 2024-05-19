import { defineStore } from 'pinia'
import { store } from '@/store'

const storeName = 'user'

/**
 * @name 用户信息
 */
export const useUserStore = defineStore({
  id: storeName,
  state: () => ({
    userInfo: {},
  }),
  getters: {
    getUserInfo() {
      return this.userInfo
    },
    isLogin() {
      return !!this.userInfo?.token
    },
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    logout() {
      this.$reset()
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: storeName }],
  },
})

export function useUserStoreWidthOut() {
  return useUserStore(store)
}
