import type { GlobalThemeOverrides } from "naive-ui"
import type { Ref } from "vue"
import { assign, merge } from "lodash-es"
import { defineStore } from "pinia"
import { generate } from '@arco-design/color'

type UseThemeStore = ReturnType<typeof defineStore<'theme', {
  themeOverrides: Ref<GlobalThemeOverrides>
  setColor: (color: string) => void
  setOverrides: (overrides: GlobalThemeOverrides) => void
}>>

export const useThemeStore: UseThemeStore = defineStore('theme', () => {
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: {
      hoverColor: 'var(--c-hover)',
      primaryColor: 'var(--c-primary-2)',
      primaryColorHover: 'var(--c-primary-1)',
      primaryColorPressed: 'var(--c-primary-3)',
      textColor1: 'var(--c-text-1)',
      textColor2: 'var(--c-text-2)',
      textColor3: 'var(--c-text-3)',
    },
    Menu: {
      itemColorHover: 'var(--c-hover)'
    }
  })
  function setOverrides(overrides: GlobalThemeOverrides) {
    merge(themeOverrides.value, overrides)
  }

  function setColor(color: string) {
    const colors = generate(color, { list: true })
    assign(themeOverrides.value.common, {
      primaryColor: colors[5],
      primaryColorHover: colors[4],
      primaryColorSuppl: colors[4],
      primaryColorPressed: colors[6],
    })
  }
  return { themeOverrides, setOverrides, setColor }
})
