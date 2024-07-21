import { isFunction } from 'lodash-es'
import { $loading } from '@/hooks/loading'

export function createRequest(data: object | any[], status: 'success' | 'error' = 'success') {
  console.log('createRequest', data, status)
  return new Promise((resolve, reject) => {
    $loading?.start()
    setTimeout(() => {
      const fn = status === 'success' ? resolve : reject
      $loading?.stop()
      fn(isFunction(data) ? data() : data)
    }, 300)
  })
}
