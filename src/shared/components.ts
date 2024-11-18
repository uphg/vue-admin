import GBaseButton from '@/components/GBaseButton'
import type { App } from 'vue'

export const GlobalComponents = {
  GBaseButton
}


export function registerGlobalComponents(app: App) {
  Object.keys(GlobalComponents).forEach((key) => {
    app.component(key, GlobalComponents[key as keyof typeof GlobalComponents])
  })
}
