<template>
  <div flex="~ col">
    <div
      class="layout-container has-sidebar"
      :class="{
        'has-sidebar--collapsed': sidebar.collapsed,
      }"
    >
      <Header />
      <Content />
      <Footer />
      <Sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
.has-sidebar {
  transition: margin 0.3s var(--n-bezier);
  margin-left: var(--sidebar-width);
  &--collapsed {
    margin-left: var(--sidebar--collapsed-width);
  }
}
</style>
