<template>
  <header
    class="header position-fixed left-[var(--sidebar-width)] right-0 top-0 box-border px-6" :class="[
      { 'sidebar--collapsed': sidebar.collapsed },
    ]"
    flex="~ col justify-center"
  >
    <!-- Breadcrumbs nav -->
    <div class="h-14" flex="~ items-center gap-3">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
      <Breadcrumb />
      <div class="ml-auto">
        <n-button type="primary" size="small" @click="logout">
          退出
        </n-button>
      </div>
    </div>

    <!-- Tags nav -->
    <!-- <div class="h-14" flex="~ items-center">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
    </div> -->
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { removeToken } from '@/utils/token'
import Breadcrumb from './Breadcrumb.vue'

const sidebar = useSidebarStore()
const router = useRouter()
const userStore = useUserStore()

function logout() {
  removeToken()
  console.log('logout')
  userStore.clear()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.header {
  transition: left 0.3s var(--n-bezier);
  border-block-end: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  z-index: 1;
  &.sidebar--collapsed {
    left: var(--sidebar--collapsed-width);
  }
}
</style>
