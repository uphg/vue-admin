<template>
  <AppConfigProvider>
    <RouterView />
  </AppConfigProvider>
</template>

<script setup lang="ts">
import vars from './styles/_variables.module.scss'
import AppConfigProvider from '@/components/AppConfigProvider'

console.log('vars')
console.log(vars)
</script>
