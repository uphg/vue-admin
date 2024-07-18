import { isFunction } from 'lodash-es'

export function createRequest(data: object | any[] | Function, status: 'success' | 'error' = 'success') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fn = status === 'success' ? resolve : reject
      fn(isFunction(data) ? data() : data)
    }, 300)
  })
}