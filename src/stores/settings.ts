
import { defineStore } from 'pinia'

export type SettingsState = Partial<{
  fullScreen: boolean
}>

export const useSettingsStore = defineStore('settings', () => {
  const state = reactive<SettingsState>({
    fullScreen: false,
  })

  function toggleFullScreen() {
    state.fullScreen = !state.fullScreen
  }

  return { ...toRefs(state), toggleFullScreen }
})
