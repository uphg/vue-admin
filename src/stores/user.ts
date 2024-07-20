import { defineStore } from 'pinia'
import type { ResponseData } from '@/shared/http'
import { getRouteData } from '~mock/getRouteData'
import { getUserInfo } from '~mock/getUserInfo'

interface MenuItem {
  title: string
  path: string
}

interface UserInfo {
  menus: MenuItem[]
  id: string
  name: string
  rules: string[]
  email: string
  token: string
}

const localStorage = window.localStorage

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    id: '',
    name: '',
    rules: [],
    email: '',
    token: '',
    menus: [],
    setUser(newState: UserInfo) {
      merge(state, newState)
    },
    getUserInfo() {
      const token = localStorage.getItem(APP_TOKEN_CACHE_KEY)!
      return getUserInfo(token).then((res: ResponseData) => {
        if (res.code === 200) {
          state.setUser(res.data as UserInfo)
          return getRouteData()
        } else {
          retunr
        }
      }) as Promise<UserInfo>
    },
  })
  return state
})
