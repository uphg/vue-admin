<template>
  <header
    :class="[
      'header position-fixed top-0 left-[var(--sidebar-width)] right-0 px-6 box-border',
      { 'sidebar--collapsed': sidebar.collapsed }
    ]"
    flex="~ col justify-center"
  >
    <!-- Breadcrumbs nav -->
    <div class="h-14" flex="~ items-center">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
    </div>

    <!-- Tags nav -->
    <!-- <div class="h-14" flex="~ items-center">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
    </div> -->
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
.header {
  transition: left 0.3s var(--n-bezier);
  border-block-end: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  z-index: 1;
  &.sidebar--collapsed {
    left: var(--sidebar--collapsed-width);
  }
}
</style>
