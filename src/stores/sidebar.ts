import { assign } from 'lodash-es'
import { defineStore } from 'pinia'
import type { MenuOption } from 'naive-ui'

export type SidebarState = Partial<{
  collapsed: boolean
  menus: any[]
}>

export const useSidebarStore = defineStore('sidebar', () => {
  const state = reactive<SidebarState>({
    collapsed: false,
    menus: [],
  })

  function set(value: SidebarState) {
    assign(state, value)
  }

  function toggleCollapsed() {
    state.collapsed = !state.collapsed
  }

  return { ...toRefs(state), toggleCollapsed, set }
})

export type SidebarStore = ReturnType<typeof useSidebarStore>
