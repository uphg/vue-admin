<template>
  <div class="tags w-full h-[var(--tags-height)]">
    <div ref="tagsWrapperRef" class="tags-wrapper w-full h-[var(--tags-height)] overflow-auto flex items-center" @wheel="onWheel">
      <div class="flex px-6 py-1 gap-2">
        <n-tag
          v-for="(item, index) in tagsStore.list"
          :key="item.name!"
          :closable="tagsStore.list.length > 1"
          :type="tagsStore.active === item.name ? 'primary' : 'default'"
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
    console.log('tagsStore.list')
    console.log(tagsStore.list)
  },
  { immediate: true }
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
  e.preventDefault();
  const deltaY = e.deltaY;
  tagsWrapperRef.value!.scrollTo({
    left: tagsWrapperRef.value!.scrollLeft + deltaY * 1.5,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss">
.tags {
  border-block-start: 1px solid var(--border-color);
}
.tags-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
