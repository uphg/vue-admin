<template>
  <n-config-provider :theme-overrides="themeOverrides">
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
import type { GlobalThemeOverrides } from 'naive-ui'

const { $loading } = useGlobalLoading()
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#6841ea'
  },
  Button: {
    textColor: '#6841ea'
  },
  Menu: {
    itemColorHover: 'rgba(0, 0, 0, 0.06)'
  }
}

loadGlobalMessage()
</script>
