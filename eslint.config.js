// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'style/brace-style': 'off', // if 语句结束后强制换行
      'import/no-mutable-exports': 'off',
      'no-console': 'off',
      'no-restricted-syntax': 'off',
      'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
      // vue 文件各模块顺序
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
)
