// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
    },
  },
)
