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

  function toggleCollapsed() {
    state.collapsed = !state.collapsed
  }

  function set(value: SidebarState) {
    assign(state, value)
  }

  return { ...toRefs(state), set, toggleCollapsed }
})

export type SidebarStore = ReturnType<typeof useSidebarStore>
