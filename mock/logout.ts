import { createRequest } from './create'

// logout mock:
export function logout() {
  console.log('logout')
  return createRequest({ code: 200, message: '退出成功！' })
}
