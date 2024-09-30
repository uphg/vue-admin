import { assign } from 'lodash-es'
import { defineStore } from 'pinia'

export type SidebarState = Partial<{
  collapsed: boolean
  menus: MenuItem[]
}>

export interface MenuItem {
  title: string
  path: string
  icon: string
  children?: MenuItem[]
}

export const useSidebarStore = defineStore('sidebar', () => {
  const state = reactive<SidebarState>({
    collapsed: false,
    menus: [],
  })

  function set(state: SidebarState) {
    assign(state, state)
  }

  function toggleCollapsed() {
    state.collapsed = !state.collapsed
  }

  return { ...toRefs(state), toggleCollapsed, set }
})

export type SidebarStore = ReturnType<typeof useSidebarStore>
