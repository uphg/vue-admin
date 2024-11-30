
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

  function setFullScreen(value: boolean) {
    state.fullScreen = value
  }

  return { ...toRefs(state), toggleFullScreen, setFullScreen }
})
