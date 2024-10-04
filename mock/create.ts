import { isFunction } from 'lodash-es'
import { $loading } from '@/hooks/loading'

export function createRequest(data: object | any[], status: 'success' | 'error' = 'success', { loading = false } = {}) {
  return new Promise((resolve, reject) => {
    loading && $loading?.start()
    setTimeout(() => {
      const fn = status === 'success' ? resolve : reject
      loading && $loading?.stop()
      fn(isFunction(data) ? data() : data)
    }, 300)
  })
}
