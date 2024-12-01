import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw, Router } from 'vue-router'
import { constantRoutes } from './router'
import type { ResponseData } from '@/shared/http'
import type { SidebarStore } from '@/stores/sidebar'
import type { UserState, UserStore } from '@/stores/user'
import { createAsyncRoutes, createSidebarMenuMap, createSidebarMenus } from '@/utils/async-route'
import { getToken } from '@/utils/token'
import { apiGetRouteData } from '~mock/getRouteData'
import { apiGetUserInfo } from '~mock/getUserInfo'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function setupRouterGuard(router: Router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  router.beforeEach(async (to, from) => {
    if (userStore.id) {
      return toPermissionRoute(to, from)
    }
    const token = getToken()
    if (!token) {
      return toCommonRoute(to, from)
    }
    await loadPermissionInfo(router, { userStore, sidebarStore })
    return { ...to, replace: true }
  })
}

async function loadPermissionInfo(router: Router, { userStore, sidebarStore }: { userStore: UserStore, sidebarStore: SidebarStore }) {
  const rawRoutes = await getRouteData()
  const userInfo = await getUserInfo()
  const routes = createAsyncRoutes(rawRoutes)
  const menuData = (constantRoutes as any[]).concat(rawRoutes)
  const menus = createSidebarMenus(menuData)
  const menuMap = createSidebarMenuMap(menuData)

  sidebarStore.set({ menus, menuMap })
  userStore.set(userInfo)

  routes.forEach((route) => {
    router.addRoute(route)
  })
}

function toCommonRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}

function toPermissionRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return '/home'
  } else {
    return true
  }
}

// request data
async function getRouteData() {
  const res = await apiGetRouteData() as ResponseData<RouteRecordRaw[]>
  return res.data || []
}

async function getUserInfo() {
  const res = await apiGetUserInfo('admin-token') as ResponseData<UserState>
  return res.data || {}
}
