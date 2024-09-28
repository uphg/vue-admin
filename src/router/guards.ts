import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import type { UserStore } from '@/stores/user'
import { getToken } from '@/utils/token'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function setupRouterGuard(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from) => {
    const token = getToken()
    if (!token) {
      return toCommonRoute(to, from)
    }
    await loadPermission(router, userStore)
    if (userStore.id) {
      return true
    }
    return toCommonRoute(to, from)
  })
}

async function loadPermission(router: Router, userStore: UserStore) {
  await userStore.setUserInfo()
  const routes = await userStore.buildDynamicRoutes()
  router.addRoute(routes as any)
}

function toCommonRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}
