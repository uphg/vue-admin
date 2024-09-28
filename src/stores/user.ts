import { defineStore } from 'pinia'
import { assign } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
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

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    id: '',
    name: '',
    rules: [],
    email: '',
    token: '',
    menus: [],
  })

  async function setUserInfo() {
    const res = await getUserInfo('admin-token') as ResponseData<UserInfo>
    assign(state, res.data!)
  }

  async function buildDynamicRoutes() {
    const res = await getRouteData() as ResponseData<RouteRecordRaw[]>
    return createAsyncRoutes(res.data!)
  }

  return { ...toRefs(state), setUserInfo, buildDynamicRoutes }
})

export type UserStore = ReturnType<typeof useUserStore>
