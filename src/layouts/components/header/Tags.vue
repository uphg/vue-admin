<template>
  <div class="tags h-[var(--tags-height)] w-full">
    <div ref="tagsWrapperRef" class="tags-wrapper h-[var(--tags-height)] w-full flex items-center overflow-auto" @wheel="onTagsWheel">
      <div class="flex gap-2 px-6 py-1">
        <NavTag
          v-for="(item, index) in tagsStore.list"
          :key="item.name!"
          :closable="tagsStore.list.length > 1"
          :active="tagsStore.active === item.name"
          :on-click="() => onItemClick(item, index)"
          :on-close="() => onItemClose(item, index)"
        >
          {{ item.title }}
        </NavTag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagsItem } from '@/stores/tags'
import NavTag from './Tag.vue'

const tagsWrapperRef = shallowRef<HTMLDivElement | null>(null)
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

function onItemClick(item: TagsItem, _index: number) {
  tagsStore.setActive(item.name)
  router.push(item.path)
}

function onItemClose(item: TagsItem, index: number) {
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

function onTagsWheel(e: WheelEvent) {
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
