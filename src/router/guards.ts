import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw, Router } from 'vue-router'
import type { UserState, UserStore } from '@/stores/user'
import { getToken } from '@/utils/token'
import { apiGetUserInfo } from '~mock/getUserInfo'
import type { ResponseData } from '@/shared/http'
import { apiGetRouteData } from '~mock/getRouteData'
import { createAsyncRoutes, createSidebarMenus } from '@/utils/async-route'
import type { SidebarStore } from '@/stores/sidebar'

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
  const menus = createSidebarMenus(rawRoutes)

  sidebarStore.set({ menus })
  userStore.set(userInfo)
  routes.forEach(route => {
    console.log('route', route)
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
