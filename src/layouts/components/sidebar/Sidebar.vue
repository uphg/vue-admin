<template>
  <div class="sidebar" :class="[{ 'sidebar--collapsed': sidebar.collapsed }]">
    <div class="h-[var(--navbar-height)]">
      <Title :is-collapse="sidebar.collapsed" />
    </div>
    <div class="h-[calc(100vh-var(--navbar-height))] flex flex-col">
      <n-scrollbar class="h-full">
        <n-menu
          ref="menuRef"
          :key="menuKey"
          v-model:value="selectedKey"
          v-model:expanded-keys="expandedKeys"
          :collapsed="sidebar.collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="sidebar.menus"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { MenuInst, MenuOption } from 'naive-ui'
import type { RouteLocationNormalized, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { isNil } from 'lodash-es'
import { useSidebarStore } from '@/stores/sidebar'
import Title from './Title.vue'

const route = useRoute()
const sidebar = useSidebarStore()
const expandedKeys = ref<string[]>([])
const selectedKey = ref<string | undefined>()
const menuRef = ref<MenuInst>()
const menuKey = ref<number>(0)
watch(route, handleMenuExpand)

onMounted(() => {
  menuKey.value = 1
  handleMenuExpand(route)
})

function handleMenuExpand(route: RouteLocationNormalized) {
  const { matched, name } = route ?? {}
  expandedKeys.value = getExpandedKeys(matched)
  if (isNil(name)) return
  selectedKey.value = name as string
}

function getExpandedKeys(matched: RouteRecordRaw[]) {
  return matched.map(item => item.name as string)
}

function renderMenuLabel(option: MenuOption) {
  if ('href' in option) {
    return h('a', { href: option.href, target: '_blank' }, option.label as string)
  }
  return option.type === 'item'
    ? (
        <RouterLink to={option.path as RouteLocationRaw}>
          {option.label}
        </RouterLink>
      )
    : (
        <div>{option.label}</div>
      )
}

function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  return (
    <NIcon>
      <BookmarkOutline />
    </NIcon>
  )
}

function expandIcon() {
  return (
    <NIcon>
      <CaretDownOutline />
    </NIcon>
  )
}
</script>

<style lang="scss" scoped>
.sidebar {
  transition: width 0.3s var(--n-bezier);
  border-inline-end: 1px solid var(--c-border);
  writing-mode: horizontal-tb;
  @apply h-100vh w-[var(--sidebar-width)] box-border fixed top-0 left-0 bottom-0;
  &--collapsed {
    width: var(--sidebar--collapsed-width);
  }
}
</style>
