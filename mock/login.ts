import { createRequest } from './create'

export function apiLoagin(params: { username: string, password: string }) {
  const { username, password } = params
  return createRequest(
    username === 'admin' && password === '123456'
      ? { code: 200, data: { token: 'admin-token' } }
      : { code: 401, message: '账号或密码错误' },
  )
}
