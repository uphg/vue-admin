import { defineStore } from 'pinia'
import { assign } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'

interface MenuItem {
  title: string
  path: string
}

export type UserState = Partial<{
  menus: MenuItem[]
  id: string
  name: string
  rules: string[]
  email: string
  token: string
  rawRoutes: RouteRecordRaw[]
}>

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    id: '',
    name: '',
    rules: [],
    email: '',
    token: '',
    menus: [],
    rawRoutes: [],
  })

  function set(data: UserState) {
    assign(state, data)
  }

  function clear() {
    assign(state, {
      id: '',
      name: '',
      rules: [],
      email: '',
      token: '',
      menus: [],
      rawRoutes: [],
    })
  }

  // async function updateUserInfo() {
  //   const res = await getUserInfo('admin-token') as ResponseData<UserInfo>
  //   assign(state, res.data!)
  // }

  // async function buildDynamicRoutes() {
  //   const res = await getRouteData() as ResponseData<RouteRecordRaw[]>
  //   return createAsyncRoutes(res.data!)
  // }

  return { ...toRefs(state), set, clear }
})

export type UserStore = ReturnType<typeof useUserStore>
