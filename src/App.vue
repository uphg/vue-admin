<template>
  <AppConfigProvider>
    <RouterView />
  </AppConfigProvider>
</template>

<script setup lang="ts">
import AppConfigProvider from '@/components/AppConfigProvider'
import vars from './styles/_variables.module.scss'

console.log('vars')
console.log(vars)
</script>
