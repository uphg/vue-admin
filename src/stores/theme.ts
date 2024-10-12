import type { GlobalThemeOverrides } from "naive-ui"
import type { Ref } from "vue"
import { assign } from "lodash-es"
import { defineStore } from "pinia"
import { generate } from '@arco-design/color'

type UseThemeStore = ReturnType<typeof defineStore<'theme', {
  themeOverrides: Ref<GlobalThemeOverrides>
  setColor: (color: string) => void
  setOverrides: (overrides: GlobalThemeOverrides) => void
}>>

export const useThemeStore: UseThemeStore = defineStore('theme', () => {
  const themeOverrides = ref<GlobalThemeOverrides>({
    Menu: {
      itemColorHover: 'rgba(0, 0, 0, 0.06)'
    }
  })
  function setOverrides(overrides: GlobalThemeOverrides) {
    assign(themeOverrides.value, overrides)
  }

  function setColor(color: string) {
    const colors = generate(color, { list: true })
    themeOverrides.value.common = assign(themeOverrides.value.common, {
      primaryColor: colors[5],
      primaryColorHover: colors[4],
      primaryColorSuppl: colors[4],
      primaryColorPressed: colors[6],
    })
  }
  return { themeOverrides, setOverrides, setColor }
})
