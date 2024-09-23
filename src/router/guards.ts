import type { NavigationGuardWithThis, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  loadPermission(router)
}

const commonRoutes: (string | symbol)[] = ['Login', '404']

function loadPermission(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from) => {
    const token = localStorage.getItem(APP_TOKEN_CACHE_KEY)! || 'admin-token'
    if (!token) {
      return toCommonRoute(to, from)
    }
    await getPermissionPage()
    if (userStore.id) {
      return true
    }
    return toCommonRoute(to, from)
  })

  async function getPermissionPage() {
    await userStore.getUserInfo()
    const routes = await userStore.getAsyncRoutes()
    router.addRoute(routes as any)
  }

  function toCommonRoute(to: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric) {
    if (to?.name && commonRoutes.includes(to.name)) {
      return true
    } else {
      return '/login'
    }
  }
}
