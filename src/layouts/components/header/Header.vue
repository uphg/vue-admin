<template>
  <header
    class="header position-fixed left-[var(--sidebar-width)] right-0 top-0 box-border"
    :class="[
      { 'sidebar--collapsed': sidebar.collapsed },
    ]"
    flex="~ col justify-center"
  >
    <!-- Breadcrumbs nav -->
    <div class="h-14 px-6" flex="~ items-center gap-3">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
      <Breadcrumb />
      <div class="ml-auto flex items-center gap-2">
        <GBaseButton class="flex" @click="toggleFullscreen">
          <n-icon size="18" :component="isFullscreen ? FullScreenMinimize24Regular : FullScreenMaximize24Regular" />
        </GBaseButton>
        <GBaseButton class="flex" @click="toggleDark">
          <n-icon size="18" :component="isDark ? WeatherSunny24Regular   : WeatherMoon24Regular" />
        </GBaseButton>
        <n-button type="primary" size="small" @click="logout">
          退出
        </n-button>
      </div>
    </div>

    <!-- Tags nav -->
    <Tags />
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { removeToken } from '@/utils/token'
import Breadcrumb from './Breadcrumb.vue'
import Tags from './Tags.vue'
import { useFullscreen, useDark, useToggle } from '@vueuse/core'
import { FullScreenMaximize24Regular, FullScreenMinimize24Regular, WeatherMoon24Regular, WeatherSunny24Regular } from '@vicons/fluent'
import vars from '@/styles/_variables.module.scss'

const sidebar = useSidebarStore()
const router = useRouter()
const userStore = useUserStore()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const isDark = useDark()

onMounted(() => {
  loadTheme()
})

function loadTheme() {
  const themeStore = useThemeStore()
  themeStore.setOverrides(isDark.value ? {
    common: {
      baseColor: vars['dark-c-bg'],
      popoverColor: vars['dark-c-bg-soft'],
    }
  } : {
    common: {
      baseColor: vars['c-bg'],
      popoverColor: vars['c-bg-soft'],
    }
  })
}

function toggleDark() {
  isDark.value = !isDark.value
  loadTheme()
}

function logout() {
  removeToken()
  userStore.clear()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.header {
  transition: left 0.3s var(--transition-bezier);
  border-block-end: 1px solid var(--c-border);
  background-color: var(--c-bg);
  backdrop-filter: blur(8px);
  z-index: 1;
  &.sidebar--collapsed {
    left: var(--sidebar--collapsed-width);
  }
}
</style>
