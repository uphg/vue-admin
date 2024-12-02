<template>
  <AppConfigProvider>
    <RouterView />
  </AppConfigProvider>
</template>

<script setup lang="ts">
import AppConfigProvider from '@/components/AppConfigProvider'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const themeStore = useThemeStore()
themeStore.loadTheme(isDark.value)
</script>
