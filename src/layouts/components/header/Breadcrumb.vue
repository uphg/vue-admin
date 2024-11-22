<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="(item, index) in breadItems" :key="item.key">
      <n-dropdown
        :options="index < breadItems.length - 1 ? getDropOptions(item) : []"
        @select="handleDropSelect"
      >
        <div class="m--1 flex items-center border-inherit p-1">
          {{ item.label }}
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const sidebar = useSidebarStore()
const breadItems = computed(
  () => sidebar.menuMap?.get(route.name as string)?.matchs.map(({ meta, path, name, children }: any) => ({ label: meta.title, key: path, name, children })) || [],
)

function getDropOptions(item: any) {
  return sidebar.menuMap?.get(item.name)?.children || []
}

function handleDropSelect(name: string) {
  router.push({ name })
}
</script>
