import type { NavigationGuardWithThis, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  setupPermission(router)
}

const commonRoutes: (string | symbol)[] = ['Login', '404']

function setupPermission(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from) => {
    const token = localStorage.getItem(APP_TOKEN_CACHE_KEY)! || 'admin-token'
    if (!token) {
      return handleCommonRoute(to, from, next)
    }
    await getPermissionPage()
    if (userStore.id) {
      return true
    }
    return handleCommonRoute(to, from, next)
  })

  async function getPermissionPage() {
    await userStore.getUserInfo()
    const routes = await userStore.getAsyncRoutes()
    router.addRoute(routes as any)
  }

  function handleCommonRoute(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric) {
    if (to?.name && commonRoutes.includes(to.name)) {
      console.log(5)
      return true
    } else {
      console.log(6)
      return '/login'
    }
  }
}
