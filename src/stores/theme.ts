import type { GlobalThemeOverrides } from 'naive-ui'
import type { Ref } from 'vue'
import vars from '@/styles/_variables.module.scss'
import { generate } from '@arco-design/color'
import { assign, merge } from 'lodash-es'
import { defineStore } from 'pinia'

type UseThemeStore = ReturnType<typeof defineStore<'theme', {
  themeOverrides: Ref<GlobalThemeOverrides>
  setColor: (color: string) => void
  setOverrides: (overrides: GlobalThemeOverrides) => void
  loadTheme: (isDark: boolean) => void
}>>

const defaultCommon = {
  textColorBase: 'var(--c-text-1)',
  hoverColor: 'var(--c-hover)',
  primaryColor: 'var(--c-primary-2)',
  primaryColorHover: 'var(--c-primary-1)',
  primaryColorPressed: 'var(--c-primary-3)',
  textColor1: 'var(--c-text-1)',
  textColor2: 'var(--c-text-2)',
  textColor3: 'var(--c-text-3)',
}

export const lightCommon = {
  baseColor: vars['c-bg'],
  hoverColor: vars['c-hover'],
  popoverColor: vars['c-bg-soft'],
  tagColor: vars['c-bg-soft'],
  modalColor: vars['c-bg'],
}

export const darkCommon = {
  baseColor: vars['dark-c-bg'],
  hoverColor: vars['dark-c-hover'],
  popoverColor: vars['dark-c-bg-soft'],
  tagColor: vars['dark-c-bg-soft'],
  modalColor: vars['dark-c-bg'],
}

export const useThemeStore: UseThemeStore = defineStore('theme', () => {
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: defaultCommon,
    Menu: {
      itemColorHover: 'var(--c-hover)',
    },
    Dialog: {
      closeIconColor: 'var(--c-text-2)',
    },
    Card: {
      color: 'var(--c-bg)',
      borderColor: 'var(--c-border)',
    },
    Input: {
      color: 'var(--c-bg)',
      borderColor: 'var(--c-border)',
    },
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

  function loadTheme(isDark: boolean) {
    setOverrides({ common: isDark ? darkCommon : lightCommon })
  }
  return { themeOverrides, setOverrides, setColor, loadTheme }
})
