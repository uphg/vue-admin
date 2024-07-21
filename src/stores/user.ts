import { defineStore } from 'pinia'
import type { ResponseData } from '@/shared/http'
import { getRouteData } from '~mock/getRouteData'
import { getUserInfo } from '~mock/getUserInfo'
import { createAsyncRoutes } from '@/utils/async-route'

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
    async getUserInfo() {
      const res = await getUserInfo() as ResponseData<UserInfo>
      if (res.code === 200) {
        state.setUser(res.data!)
      }
    },
    async getAsyncRoutes() {
      const res = await getRouteData()
      if (res.code === 200) {
        return createAsyncRoutes(res.data!)
      }
    },
  })
  return state
})
