<template>
  <div class="tags h-[var(--tags-height)] w-full">
    <div ref="tagsWrapperRef" class="tags-wrapper h-[var(--tags-height)] w-full flex items-center overflow-auto" @wheel="onWheel">
      <div class="flex gap-2 px-6 py-1">
        <n-tag
          v-for="(item, index) in tagsStore.list"
          :key="item.name!"
          :closable="tagsStore.list.length > 1"
          :type="tagsStore.active === item.name ? 'primary' : 'default'"
          :bordered="false"
          class="cursor-pointer"
          @click="onItemClick(item, index)"
          @close="onItemClose(item, index)"
        >
          {{ item.title }}
        </n-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/stores/tags'

const tagsWrapperRef = ref<HTMLDivElement | null>(null)
const tagsStore = useTagsStore()
const route = useRoute()
const router = useRouter()

watch(
  () => route.name,
  () => {
    tagsStore.setActive(route.name as string)
    tagsStore.addTag({
      name: route.name as string,
      title: route.meta?.title as string,
      path: route.path,
    })
  },
  { immediate: true },
)

function onItemClick(item: Tag, _index: number) {
  tagsStore.setActive(item.name)
  router.push(item.path)
}

function onItemClose(item: Tag, index: number) {
  if (tagsStore.list.length === 1) return
  if (item.name === route.name) {
    if (index === tagsStore.list.length - 1) {
      router.push(tagsStore.list[index - 1].path)
    } else {
      router.push(tagsStore.list[index + 1].path)
    }
  }
  tagsStore.removeTag(item)
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const deltaY = e.deltaY
  tagsWrapperRef.value!.scrollTo({
    left: tagsWrapperRef.value!.scrollLeft + deltaY * 1.5,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss">
.tags {
  border-block-start: 1px solid var(--c-border);
}
.tags-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
