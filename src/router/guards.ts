import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import type { UserStore } from '@/stores/user'
import { getToken } from '@/utils/token'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function setupRouterGuard(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from) => {
    const token = getToken()
    console.log('1')
    if (!token) {
      console.log('2')
      return toCommonRoute(to, from)
    }
    console.log('3')
    await loadPermission(router, userStore)
    if (userStore.id) {
      console.log('4')
      return true
    }
    console.log('5')
    return toCommonRoute(to, from)
  })
}

async function loadPermission(router: Router, userStore: UserStore) {
  await userStore.setUserInfo()
  const routes = await userStore.buildDynamicRoutes()
  console.log('routes')
  console.log(routes)
  router.addRoute(routes as any)
}

function toCommonRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}
