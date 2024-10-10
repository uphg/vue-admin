<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadItems" :key="item.key">
      {{ item.label }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
const breadItems = computed(
  () => route.matched
    .filter((item) => Boolean(item.path))
    .map((item) => ({ label: item.meta.title, key: item.path }))
)
</script>
