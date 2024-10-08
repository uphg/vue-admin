// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'style/brace-style': 'off', // 代码大括号风格
      'antfu/if-newline': 'off', // if 语句结束后强制换行
      'import/no-mutable-exports': 'off',
      'no-console': 'off',
      'no-restricted-syntax': 'off',
      // 'nonblock-statement-body-position': 'error', // 关闭 if 语句结束后强制换行
      'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
      'ts/no-use-before-define': 'off',
      // vue 文件各模块顺序
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
)
