<template>
  <n-config-provider :theme-overrides="themeStore.themeOverrides">
    <n-spin :show="$loading.visible" class="min-h-screen">
      <n-message-provider>
        <RouterView />
      </n-message-provider>
      <template v-if="$loading.message" #description>
        {{ $loading.message }}
      </template>
    </n-spin>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from './stores/theme'

const { $loading } = useGlobalLoading()
const themeStore = useThemeStore()
themeStore.setColor('#6841ea')
loadGlobalMessage()
</script>
