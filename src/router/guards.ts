import type { NavigationGuardWithThis, Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  setupPermission(router)
}

function setupPermission(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from, next) => {
    await userStore.getUserInfo()
    if (userStore.id) {
      next()
    } else {
      next('/login')
    }
  })
}
