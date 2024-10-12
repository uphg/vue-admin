import { assign } from 'lodash-es'
import { defineStore } from 'pinia'

export type SidebarState = Partial<{
  collapsed: boolean
  menus: any[]
  menuMap: Map<string, any>
}>

export const useSidebarStore = defineStore('sidebar', () => {
  const state = reactive<SidebarState>({
    collapsed: false,
    menus: [],
    menuMap: new Map(),
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
