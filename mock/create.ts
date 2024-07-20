import { isFunction } from 'lodash-es'
import { $loading } from '@/hooks/loading'

export function createRequest(data: object | any[], status: 'success' | 'error' = 'success') {
  return new Promise((resolve, reject) => {
    $loading?.start()
    setTimeout(() => {
      const fn = status === 'success' ? resolve : reject
      $loading?.stop()
      fn(isFunction(data) ? data() : data)
    }, 3000)
  })
}
